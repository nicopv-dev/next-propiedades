import HeadComponent from '../components/HeadComponent';
import Card from '../components/Member/Card';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Banner from '../components/Member/Banner';
import Reviews from '../components/Member/Reviews';
import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';

function Member() {
  const router = useRouter();

  const goTo = (path: string): void => {
    router.push(path);
  };

  return (
    <>
      <HeadComponent title="Hazte anfitrion - Airbnb" />
      <div className="mb-8 flex flex-col">
        {/* Main */}
        <div className="relative w-full h-screen flex">
          <div
            className="absolute top-0 left-10 sm:left-20 hover:cursor-pointer"
            onClick={() => goTo('/')}
          >
            <Image
              alt="logo"
              src={'/images/logo-removebg.png'}
              width={100}
              height={100}
              objectFit="contain"
              className="w-full object-cover"
            />
          </div>
          <div className="flex-1 md:flex-[0.5_1_0%] w-full h-full flex flex-col justify-center items-center bg-black">
            <div className="max-w-lg grid place-items-center gap-10">
              <h1 className="text-white text-6xl font-bold text-center">
                Abre tus puertas como anfitrión
              </h1>
              <button className="text-white bg-primary_dark px-6 py-2 rounded-md">
                Animate a ser anfitrion
              </button>
            </div>
          </div>
          <div className="hidden md:block md:flex-[0.5_1_0%] w-full h-full">
            <video
              className="w-full h-full object-cover"
              loop={true}
              autoPlay
              muted
              preload={'auto'}
            >
              <source src="/videos/member.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Content*/}
        <div className="w-full bg-white">
          {/* info */}
          <div className="h-screen md:h-[70vh] flex flex-col justify-center items-center gap-4 px-4 sm:px-0">
            <h1 className="max-w-2xl text-3xl sm:text-5xl font-semibold text-center">
              Descubre cuánto podrías ganar como anfitrión
            </h1>
            {/* cards */}
            <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <Card
                title="Los anfitriones de tu zona ganan un promedio de"
                description="$1,000,000 CLP"
                textColor="text-primary_dark"
              />
              <Card title="Ganan" description="$1,000,000 CLP" />
              <Card title="Tienen reservaciones de" description="24" />
            </section>
          </div>

          {/* map */}

          {/* reviews */}
          <Reviews />

          {/* services */}
          <div className="flex flex-col gap-12 px-4 sm:px-10 md:px-16">
            <Banner
              title="Ayuda a albergar a 100 000 refugiados que huyen de Ucrania"
              bgColor="bg-primary"
              btnTextColor="text-white"
            />
            <Banner
              title="Ayuda a albergar a 100 000 refugiados que huyen de Ucrania"
              height="h-[80vh]"
              bgColor="bg-primary"
              btnTextColor="text-white"
              hero={true}
            />
            <Banner
              title="Ayuda a albergar a 100 000 refugiados que huyen de Ucrania"
              bgColor="bg-primary"
              btnTextColor="text-white"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Member;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);

  if (session)
    return {
      redirect: {
        destination: '/',
      },
    };

  return {
    props: { session },
  };
};
