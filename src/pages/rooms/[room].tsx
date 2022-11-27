import prisma from '../../lib/prisma';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Error from '../../components/Error';
import Room from '../../interfaces/Room';
import MainLayout from '../../layouts/MainLayout';
import Feature from '../../components/Member/Feature';
import Book from '../../components/Room/Book';
import Services from '../../components/Room/Services';
import Gallery from '../../components/Room/Gallery';
import HomeHeader from '../../components/Home/HomeHeader';
import Guests from '../../components/Room/Guests';
import Host from '../../components/Room/Host';
import Map from '../../components/Room/Map';
import Rules from '../../components/Room/Rules';
import RoomReviews from '../../components/Room/RoomReviews';
import UserInfo from '../../components/Room/UserInfo';

interface IRoomProps {
  room?: Room;
  error?: boolean;
  isLike: boolean;
}

const Room: NextPage = ({ error, room, isLike }: IRoomProps) => {
  return (
    <MainLayout
      title={`${
        error ? 'Error' : `${room?.title} en alquiler en ${room?.address}`
      } - Airbnb`}
    >
      {error ? (
        <Error title="Room no encontrada" />
      ) : (
        <div className="min-h-screen py-14 sm:py-20 px-4 sm:px-10 md:px-20 lg:px-24">
          {/* header */}
          <HomeHeader room={room} isLike={isLike || false} />

          {/* gallery */}
          <Gallery images={room?.images} />

          {/* info */}
          <div className="my-8 divide-y">
            {/* main info */}
            <div className="block lg:flex gap-10">
              {/* left */}
              <div className="flex-1 lg:flex-[0.6_1_0%] xl:flex-[0.7_1_0%] mr-0 md:mr-10 space-y-10 divide-y">
                {/* user description */}
                <UserInfo room={room} />

                {/* description */}
                <div className="pt-8">
                  <p>{room?.description}</p>
                </div>

                {/* host */}
                <div className="space-y-6 pt-8">
                  <Feature
                    title="Alina tiene la categoría de Superanfitrión"
                    description="Los Superanfitriones tienen mucha experiencia, cuentan con
                      valoraciones excelentes y se esfuerzan al máximo para
                      ofrecerles a los huéspedes estadías maravillosas."
                  />
                  <Feature
                    title="Alina tiene la categoría de Superanfitrión"
                    description="Los Superanfitriones tienen mucha experiencia, cuentan con
                      valoraciones excelentes y se esfuerzan al máximo para
                      ofrecerles a los huéspedes estadías maravillosas."
                  />
                  <Feature
                    title="Alina tiene la categoría de Superanfitrión"
                    description="Los Superanfitriones tienen mucha experiencia, cuentan con
                      valoraciones excelentes y se esfuerzan al máximo para
                      ofrecerles a los huéspedes estadías maravillosas."
                  />
                </div>

                <Services />
              </div>

              {/* right */}
              <div className="flex-1 lg:flex-[0.4_1_0%] xl:flex-[0.3_1_0%] flex justify-center md:block">
                <Book
                  price={room?.price || 0}
                  maxGuests={room?.guests ? room.guests : 0}
                  schedules={room?.schedules}
                />
              </div>
            </div>

            <Guests />

            <Map
              latitude={parseFloat(room?.lat || '9.565220523826226')}
              longitude={parseFloat(room?.long || '-77.5063874607533')}
            />

            {room && room?.reviews.length > 0 && (
              <RoomReviews reviews={room?.reviews} />
            )}

            <Host host={room?.author} />

            <Rules />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { room: id } = ctx.query;

  const session = await getSession(ctx);

  const user = await prisma.user.findUnique({
    where: {
      email: session ? (session?.user?.email as string) : '',
    },
  });

  const room = await prisma.room.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      images: {
        select: {
          image: true,
        },
      },
      services: {
        select: {
          service: true,
        },
      },
      author: true,
      pais: true,
      schedules: true,
      reviews: {
        select: {
          id: true,
          description: true,
          createdAt: true,
          user: true,
        },
      },
    },
  });

  if (!room) {
    ctx.res.statusCode = 404;
    return {
      props: {
        error: true,
      },
    };
  }

  if (user) {
    const likes = await prisma.like.findMany({
      where: {
        userId: user.id,
      },
      include: {
        user: true,
      },
    });
    const isLike = likes.some((like) => like.roomId === room?.id);

    return {
      props: {
        room: JSON.parse(JSON.stringify(room)),
        isLike,
        error: false,
      },
    };
  } else {
    return {
      props: {
        room: JSON.parse(JSON.stringify(room)),
        error: false,
      },
    };
  }
};

export default Room;
