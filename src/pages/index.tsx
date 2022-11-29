import { useEffect, useState } from 'react';
import prisma from '../lib/prisma';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import Error from '../components/Error';
import Categories from '../components/Home/Categories';
import Filter from '../components/Home/Filter';
import Rooms from '../components/Home/Rooms';
import Modal from '../components/Modal';
import Category from '../interfaces/Category';
import Room from '../interfaces/Room';
import MainLayout from '../layouts/MainLayout';
import RoomsFilterForm from '../components/Home/RoomsFilterForm';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory, setCategory } from '../features/categorySlice';
import useScroll from '../hooks/useScroll';

interface IHomeProps {
  error: boolean;
  categories?: Category[];
  rooms?: Room[];
}

const Home = ({ error, categories, rooms }: IHomeProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter();
  const { value: category } = useSelector(selectCategory);
  const dispatch = useDispatch();
  const { goingUp } = useScroll();

  useEffect(() => {
    if (router.query && router.query?.category) {
      dispatch(
        setCategory({ value: parseInt(router.query?.category as string) })
      );
    } else {
      dispatch(setCategory({ value: 1 }));
    }
  }, [router.pathname]);

  // change category active
  const onChangeCategoryActive = (categoryId: number): void => {
    dispatch(setCategory({ value: categoryId }));
  };

  // close or open modal
  const onChangeShowModal = (isOpen: boolean): void => {
    setShowModal(isOpen);
  };

  return (
    <MainLayout title="Arrendar una propiedad - PROPIEDADES">
      {error ? (
        <Error title="Error en el servidor" />
      ) : (
        <div className="pb-10">
          {/* categories / filter */}
          <div
            className={`px-4 sm:px-10 md:px-12 lg:px-24 w-full bg-white sticky top-20 lef-0 z-10 transition-all duration-300 border-b ${
              goingUp
                ? 'shadow-md border-b-slate-200'
                : 'shadow-none border-b-white'
            }`}
          >
            <div
              className={`relative flex items-center justify-between gap-4 ${
                goingUp ? 'h-min' : 'h-24'
              }`}
            >
              <Categories
                categories={categories}
                categoryActive={category}
                onChangeCategoryActive={onChangeCategoryActive}
              />
              <Filter onChangeShowModal={onChangeShowModal} />
            </div>
          </div>

          {/* rooms */}
          <div className="px-4 sm:px-10 md:px-12 lg:px-24">
            <Rooms rooms={rooms} />
          </div>
          <Modal
            isOpen={showModal}
            onChangeShowModal={onChangeShowModal}
            title="Filtros"
            size="max-w-4xl"
          >
            <RoomsFilterForm
              onChangeShowModal={onChangeShowModal}
              categoryActive={category}
            />
          </Modal>
        </div>
      )}
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { query } = ctx;
  // filters
  const categoryId: string = query?.category
    ? (query?.category as string)
    : '1';
  const minPrice: string = query?.min ? (query?.min as string) : '0';
  const maxPrice: string = query?.max ? (query?.max as string) : '10000000';
  const guests: number = query?.guests ? parseInt(query?.guests as string) : 0;

  const session = await getSession(ctx);

  const user = await prisma.user.findUnique({
    where: {
      email: session ? (session?.user?.email as string) : '',
    },
  });

  const rooms = await prisma.room.findMany({
    where: {
      published: true,
      categoryId: Number(categoryId),
      price: {
        gte: parseInt(minPrice),
        lte: parseInt(maxPrice),
      },
      guests: {
        gte: guests,
      },
    },
    orderBy: {
      createdAt: 'desc',
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
  });

  const likes = await prisma.like.findMany({
    where: {
      userId: user ? (user?.id as number) : 0,
    },
    include: {
      user: true,
    },
  });

  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  });

  if (!rooms || !categories) {
    return {
      error: true,
    };
  }

  const roomsWithLikes = rooms.map((room) => {
    const isLikeRoom = likes.some((like) => like.roomId === room.id);
    return {
      ...room,
      isLike: isLikeRoom,
      likeId: likes.find((like) => like.roomId === room.id)?.id,
    };
  });

  return {
    props: {
      error: false,
      categories: JSON.parse(JSON.stringify(categories)),
      rooms: JSON.parse(JSON.stringify(roomsWithLikes)),
    },
  };
};

export default Home;
