import MainLayout from '../layouts/MainLayout';
import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import prisma from '../lib/prisma';
import Schedule from '../interfaces/Schedule';
import HorasRoom from '../components/Horas/HorasRoom';

interface IHorasProps {
  horas: Schedule[];
}

function Horas({ horas }: IHorasProps) {
  return (
    <MainLayout title="Mis horas agendadas">
      <div className="pt-4 pb-20 px-24">
        <h1 className="font-semibold text-xl">Mis Horas</h1>
        <div className="flex flex-col divide-y">
          {horas.map((hora, index) => (
            <HorasRoom key={index} hora={hora} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default Horas;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getSession(ctx);

  const user = await prisma.user.findUnique({
    where: {
      email: session ? (session?.user?.email as string) : '',
    },
  });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const horas = await prisma.schedule.findMany({
    where: {
      userId: user ? (user?.id as number) : 0,
    },
    include: {
      room: {
        select: {
          id: true,
          title: true,
          address: true,
          images: {
            include: {
              image: true,
            },
          },
        },
      },
      approved: {
        select: {
          file: true,
          status: true,
          isRejected: true,
        },
      },
    },
    orderBy: {
      date: 'asc',
    },
  });

  const results = horas.map((item) => {
    const { approved, ...others } = item;

    return { ...others, approved: approved[0] };
  });

  return {
    props: {
      horas: JSON.parse(JSON.stringify(results)),
    },
  };
};
