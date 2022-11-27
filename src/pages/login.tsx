import HeadComponent from '../components/HeadComponent';
import { signIn, getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';

function Login() {
  return (
    <>
      <HeadComponent title="Iniciar sesion - Airbnb" />
      <div className="flex h-screen">
        {/* Image */}
        <div className="h-full flex-[0.7_1_0%]">
          <Image
            alt="image"
            src={
              'https://a0.muscache.com/im/pictures/miso/Hosting-46324472/original/673d4d45-e7bb-45dc-8e00-c60cf1bdb666.jpeg'
            }
            width={'100%'}
            height={'70%'}
            layout="responsive"
            objectFit="cover"
            className="h-full w-full"
          />
        </div>
        {/* Form */}
        <div className="h-full flex-[0.3_1_0%] flex flex-col justify-center items-center gap-4">
          <h3 className="text-3xl">Iniciar Sesion</h3>
          <span>Inicia session de forma mas rápida con Google</span>
          <button
            onClick={() => signIn('google')}
            className="py-2 px-6 bg-primary_dark text-white rounded-lg flex items-center gap-2"
          >
            <span>Iniciar sesion con</span>
            <Image
              alt="google icon"
              src={'https://cdn-icons-png.flaticon.com/512/2991/2991148.png'}
              width={20}
              height={20}
              objectFit="cover"
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }

  return {
    props: { session },
  };
};
