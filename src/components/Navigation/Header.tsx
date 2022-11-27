import Image from 'next/image';
import { useRouter } from 'next/router';
import SearchBar from './SearchBar';
import { motion } from 'framer-motion';
import { FiUser } from 'react-icons/fi';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Languaje from '../Languaje';
import AuthBar from './AuthBar';
import Hamburger from './Hamburger';

interface INoAuthBarProps {
  onChangeDropdown: (value: boolean) => void;
  isDropdownActive: boolean;
}

export default function Header() {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const onChangeDropdown = (active: boolean): void => {
    setIsDropdownActive(active);
  };

  const goTo = (path: string): void => {
    router.push(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 z-20 bg-white w-full h-20 flex items-center justify-between px-4 sm:px-10 md:px-20 lg:px-24 border-b border-b-slate-200`}
    >
      {/* left */}
      <div className="w-full h-full flex items-center">
        <div
          className="h-20 w-20 sm:w-24 sm:h-24 hover:cursor-pointer"
          onClick={() => goTo('/')}
        >
          <Image
            src={'/images/logo.png'}
            alt="Airbnb logo"
            width={100}
            height={100}
            objectFit="contain"
            className="w-full object-cover"
          />
        </div>
      </div>
      {/* center */}
      <div className="w-full hidden lg:flex justify-center">
        <SearchBar />
      </div>
      {/* right */}
      <div className="w-full hidden lg:flex justify-end">
        {!session ? (
          <NoAuthBar
            onChangeDropdown={onChangeDropdown}
            isDropdownActive={isDropdownActive}
          />
        ) : (
          <AuthBar
            onChangeDropdown={onChangeDropdown}
            isDropdownActive={isDropdownActive}
          />
        )}
      </div>
      {/* mobile */}
      <Hamburger />
    </header>
  );
}

function NoAuthBar({ onChangeDropdown, isDropdownActive }: INoAuthBarProps) {
  const router = useRouter();

  const goTo = (link: string): void => {
    router.push(link);
    onChangeDropdown(false);
  };

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
    <div className="flex items-center gap-4">
      <button
        type="button"
        className="bg-primary_dark text-white py-2 px-4 rounded-lg transition duration-300"
        onClick={() => goTo('/member')}
      >
        Hazte Miembro
      </button>
      <Languaje />
      <motion.div
        onClick={() => onChangeDropdown(!isDropdownActive)}
        className="relative flex items-center"
      >
        <button type="button">
          <FiUser className="h-6 w-6 text-primary" />
        </button>
        <motion.div
          className="absolute top-8 right-0 w-60 mt-2 bg-white rounded-md shadow-lg z-20 py-4"
          initial="exit"
          animate={isDropdownActive ? 'enter' : 'exit'}
          variants={subMenuAnimate}
        >
          <div className="flex flex-col">
            <button
              className="py-2 px-4 hover:cursor-pointer flex justify-start bg-white transtion duration-200 hover:bg-gray-100"
              type="button"
              onClick={() => goTo('/login')}
            >
              Iniciar Sesion
            </button>
            <button
              className="py-2 px-4 hover:cursor-pointer flex justify-start bg-white transtion duration-200 hover:bg-gray-100"
              type="button"
              onClick={() => goTo('/register')}
            >
              Registrarse
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
