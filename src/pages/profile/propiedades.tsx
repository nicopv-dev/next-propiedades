import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import MainLayout from '../../layouts/MainLayout';
import ProfileLayout from '../../layouts/ProfileLayout';
import prisma from '../../lib/prisma';
import { getSession } from 'next-auth/react';
import Room from '../../interfaces/Room';
import PropiedadItem from '../../components/Profile/Propiedades/PropiedadItem';
import Modal from '../../components/Modal';
import CreatePropiedadForm from '../../components/Profile/Propiedades/CreatePropiedadForm';
import EditPropiedadForm from '../../components/Profile/Propiedades/EditPropiedadForm';
import { IoAddOutline } from 'react-icons/io5';

interface IPropiedadesProps {
  propiedades: Room[];
  error: boolean;
}

function Propiedades({ propiedades, error }: IPropiedadesProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [propiedadesState, setPropiedadesState] = useState<Room[]>(propiedades);
  const [selectedModal, setSelectedModal] = useState<number>(0);
  const [selectedPropiedad, setSelectedPropiedad] = useState<Room>({});

  // close or open modal
  const onChangeShowModal = (isOpen: boolean): void => {
    setShowModal(isOpen);
  };

  const openModal = (modal: number) => {
    setSelectedModal(modal);
    setShowModal(true);
  };

  const addPropiedad = (propiedad: Room) => {
    setPropiedadesState((current) => [propiedad, ...current]);
  };

  const deletePropiedad = (id: number) => {
    setPropiedadesState((current) => current.filter((item) => item.id != id));
  };

  const onChangeSelectedPropiedad = (selectedPropiedad: Room) => {
    setSelectedPropiedad(selectedPropiedad);
  };

  return (
    <MainLayout title="Mis Propiedades">
      <ProfileLayout>
        <div className="p-10 flex flex-col gap-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold">Mis Propiedades</h2>
            <div className="flex items-center justify-between">
              <p>Maneja tus propiedades agregedas</p>
              <button
                type="button"
                onClick={() => openModal(0)}
                className="bg-primary text-black px-4 py-1 rounded-md flex items-center"
              >
                <IoAddOutline />
                Agregar propiedad
              </button>
            </div>
          </div>

          {!error && (
            <div className="grid grid-cols-3 gap-4">
              {propiedadesState.map((propiedad) => (
                <PropiedadItem
                  key={propiedad.id}
                  room={propiedad}
                  openModal={openModal}
                  onChangeSelectedPropiedad={onChangeSelectedPropiedad}
                />
              ))}
            </div>
          )}

          <Modal
            isOpen={showModal}
            onChangeShowModal={onChangeShowModal}
            title={selectedModal === 0 ? 'Nueva Propiedad' : 'Editar Propiedad'}
            size={selectedModal === 0 ? 'max-w-4xl' : 'max-w-6xl'}
          >
            {selectedModal === 0 ? (
              <CreatePropiedadForm
                onChangeShowModal={onChangeShowModal}
                addPropiedad={addPropiedad}
              />
            ) : (
              <EditPropiedadForm
                onChangeShowModal={onChangeShowModal}
                deletePropiedad={deletePropiedad}
                propiedad={selectedPropiedad}
              />
            )}
          </Modal>
        </div>
      </ProfileLayout>
    </MainLayout>
  );
}

export default Propiedades;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);

  if (!session)
    return {
      redirect: {
        destination: '/',
      },
    };

  const user = await prisma.user.findUnique({
    where: {
      email: session ? (session?.user?.email as string) : '',
    },
  });

  const propiedades = await prisma.room.findMany({
    where: {
      authorId: user?.id,
    },
    include: {
      images: {
        select: {
          image: true,
        },
      },
      pais: true,
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    props: {
      error: false,
      propiedades: JSON.parse(JSON.stringify(propiedades)),
    },
  };
};
