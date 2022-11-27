import prisma from '../lib/prisma';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import Error from '../components/Error';
import MyWishlists from '../components/Wishlists/MyWishlists';
import NoWishlist from '../components/Wishlists/NoWishlist';
import Whislist from '../interfaces/Wishlist';
import MainLayout from '../layouts/MainLayout';

interface IWhislistsProps {
  wishlists: Whislist[];
  error: boolean;
}

function Wishlists({ wishlists, error }: IWhislistsProps) {
  return (
    <MainLayout title="Mis Favoritos - Airbnb">
      <div className="py-20 px-4 sm:px-10 md:px-20 lg:px-24">
        {error ? (
          <Error title="Error al cargar la lista" />
        ) : (
          <div className="mt-10 space-y-10">
            {/* title */}
            <div>
              <h1 className="text-3xl font-bold">Favoritos</h1>
            </div>
            {/* list */}
            {wishlists.length > 0 ? (
              <MyWishlists wishlists={wishlists} />
            ) : (
              <NoWishlist />
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session ? (session?.user?.email as string) : '',
    },
  });

  if (!user) {
    return {
      props: {
        error: true,
        wishlist: [],
      },
    };
  } else {
    const wishlists = await prisma.wishlist.findMany({
      where: {
        userId: user ? (user?.id as number) : 0,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        roomOnWishlist: {
          select: {
            room: {
              include: {
                images: {
                  select: {
                    image: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const results = wishlists.map((whishlist) => {
      const { roomOnWishlist, ...others } = whishlist;
      const rooms = roomOnWishlist?.map((item) => item.room);
      // rooms = rooms?.map((room) => {
      //   const images = room.images.map((img) => img.image);
      //   return {
      //     ...room,
      //     images,
      //   };
      // });
      return { ...others, rooms };
    });

    return {
      props: {
        error: false,
        wishlists: JSON.parse(JSON.stringify(results)),
      },
    };
  }
};

export default Wishlists;
