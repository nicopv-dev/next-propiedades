import { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import ProfileLayout from '../../layouts/ProfileLayout';
import { GetServerSidePropsContext } from 'next';
import prisma from '../../lib/prisma';
import { getSession } from 'next-auth/react';
import Documento from '../../interfaces/Documento';
import DocumentoItem from '../../components/Profile/Documentos/DocumentoItem';
import Modal from '../../components/Modal';
import { Worker } from '@react-pdf-viewer/core';
// Import the main component
import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';

interface IDocumentosProps {
  documentos: Documento[];
}

function Documentos({ documentos }: IDocumentosProps) {
  const [documentosState, setDocumentosState] =
    useState<Documento[]>(documentos);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [documento, setDocumento] = useState<Documento>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChangeShowModal = (value: boolean): void => {
    setShowModal(value);
  };

  const onChangeDocumento = (value: Documento) => {
    setDocumento(value);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/document/${documento.id}/approved`,
        {
          method: 'PUT',
        }
      );

      if (res.status === 200) {
        toast.success('Documento aprobado', { autoClose: 3000 });
        const updateDocs = documentosState.map((item) => {
          if (item.id === documento.id) {
            return { ...item, status: true };
          }
          return item;
        });
        setDocumentosState(updateDocs);
        setIsLoading(false);
        setShowModal(false);
      }
    } catch (err) {
      console.log(err);
      etIsLoading(false);
      toast.error('Error al aprobar documento', { autoClose: 3000 });
    }
  };

  const onRejected = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/document/${documento.id}/rejected`,
        {
          method: 'PUT',
        }
      );

      if (res.status === 200) {
        toast.success('Documento Rechazado', { autoClose: 3000 });
        const updateDocs = documentosState.map((item) => {
          if (item.id === documento.id) {
            return { ...item, isRejected: true };
          }
          return item;
        });
        setDocumentosState(updateDocs);
        setIsLoading(false);
        setShowModal(false);
      }
    } catch (err) {
      console.log(err);
      etIsLoading(false);
      toast.error('Error al rechazar documento', { autoClose: 3000 });
    }
  };

  return (
    <MainLayout title="Documentos">
      <ProfileLayout>
        <div className="p-10 space-y-6">
          <div>
            <h3 className="text-3xl font-bold">Documentos</h3>
            <p>
              Gestiona los documentos enviados por las personas a tus
              propiedades
            </p>
          </div>

          <div className="space-y-4 divide-y divide-slate-200">
            {documentosState.map((doc, index) => (
              <DocumentoItem
                key={index}
                doc={doc}
                status={doc.status}
                rejected={doc.isRejected}
                onChangeShowModal={onChangeShowModal}
                onChangeDocumento={onChangeDocumento}
              />
            ))}
          </div>
        </div>
      </ProfileLayout>
      <Modal
        isOpen={showModal}
        onChangeShowModal={onChangeShowModal}
        title="Documento"
        size="max-w-4xl"
      >
        <div className="pt-4 h-full">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
            <Viewer
              fileUrl={documento.file}
              plugins={[defaultLayoutPluginInstance]}
            />
          </Worker>
          <div className="sticky bottom-0 left-0 pt-4 flex">
            {isLoading ? (
              <button className="py-4 w-full text-center bg-primary opacity-100 transition-all duration-300 ease-out hover:bg-green-200">
                <Loading />
              </button>
            ) : (
              !documento.isRejected &&
              !documento.status && (
                <>
                  <button
                    className="py-4 w-full text-center bg-primary opacity-100 transition-all duration-300 ease-out hover:bg-green-200"
                    type="button"
                    onClick={onSubmit}
                  >
                    Aprobar
                  </button>
                  <button
                    className="py-4 w-full text-center bg-white"
                    type="button"
                    onClick={onRejected}
                  >
                    Rechazar
                  </button>
                </>
              )
            )}
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
}

export default Documentos;

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

  const documentos = await prisma.documentSchedule.findMany({
    where: {
      schedule: {
        room: {
          authorId: user?.id,
        },
      },
    },
    include: {
      schedule: {
        include: {
          user: true,
          room: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    props: {
      error: false,
      documentos: JSON.parse(JSON.stringify(documentos)),
    },
  };
};
