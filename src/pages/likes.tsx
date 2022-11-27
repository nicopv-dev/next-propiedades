import MainLayout from '../layouts/MainLayout';
import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import prisma from '../lib/prisma';
import Room from '../interfaces/Room';
import LikesRooms from '../components/Likes/LikesRooms';

interface ILikesProps {
  rooms: Room[];
}

export default function Likes({ rooms }: ILikesProps) {
  return (
    <MainLayout title="Habitaciones que me gustan en Airbnb">
      <LikesRooms rooms={rooms} />
    </MainLayout>
  );
}

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

  const likes = await prisma.like.findMany({
    where: {
      userId: user ? (user?.id as number) : 0,
    },
    select: {
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
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const rooms = likes.map((like) => like.room);

  return {
    props: {
      rooms: JSON.parse(JSON.stringify(rooms)),
    },
  };
};
