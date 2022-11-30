import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion } from 'framer-motion';

const LINKS: { id: number; link: string; text: string }[] = [
  { id: 1, link: '/profile/propiedades', text: 'Mis propiedades' },
  // { id: 3, link: '/trips', text: 'Horas' },
  // { id: 4, link: '/wishlists', text: 'Lista de Favoritos' },
  { id: 5, link: '/likes', text: 'Me Gusta' },
];

interface IAuthBarProps {
  onChangeDropdown: (value: boolean) => void;
  isDropdownActive: boolean;
}

export default function AuthBar({
  onChangeDropdown,
  isDropdownActive,
}: IAuthBarProps) {
  const { data: session } = useSession();

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      y: 0,
      display: 'block',
    },
    exit: {
      y: -5,
      opacity: 0,
      transition: {
        duration: 0.1,
      },
      transitionEnd: {
        display: 'none',
      },
    },
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <button
          type="button"
          onClick={() => onChangeDropdown(!isDropdownActive)}
        >
          <Image
            alt={session?.user?.name || 'logo'}
            src={
              session?.user?.image ||
              'https://a0.muscache.com/im/pictures/user/09737fcc-2da2-4f66-876d-7d5b07d2317c.jpg'
            }
            width={40}
            height={40}
            objectFit="cover"
            className="rounded-full"
          />
        </button>
        <motion.div
          className="absolute top-8 right-0 w-60 mt-2 bg-white rounded-md shadow-lg z-40 py-4"
          initial="exit"
          animate={isDropdownActive ? 'enter' : 'exit'}
          variants={subMenuAnimate}
          onMouseLeave={() => onChangeDropdown(false)}
        >
          <div className="flex flex-col gap-2 divide-y">
            {/* items */}
            <div className="flex flex-col">
              {LINKS.map((item) => (
                <ButtonItem
                  key={item.id}
                  link={item.link}
                  text={item.text}
                  textBold={true}
                />
              ))}
            </div>
            {/* items */}

            {/* help */}
            <div className="flex flex-col pt-2">
              <button
                className="py-2 px-4 text-[14px] hover:cursor-pointer flex justify-start bg-white transtion duration-200 hover:bg-gray-100"
                type="button"
                onClick={() => signOut()}
              >
                Cerrar Sesion
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

interface IButtonItemProps {
  link: string;
  text: string;
  textBold?: boolean;
}

function ButtonItem({ link, text, textBold = false }: IButtonItemProps) {
  const router = useRouter();

  const goTo = (link: string): void => {
    router.push(link);
  };

  return (
    <button
      className={`py-2 px-4 text-[14px] ${
        textBold ? 'font-semibold' : 'font-medium'
      } hover:cursor-pointer flex justify-start bg-white transtion duration-200 hover:bg-gray-100`}
      type="button"
      onClick={() => goTo(link)}
    >
      {text}
    </button>
  );
}
