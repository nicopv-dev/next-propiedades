import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

interface IModalProps {
  isOpen: boolean;
  onChangeShowModal: (isOpen: boolean) => void;
  size?:
    | 'max-w-sm'
    | 'max-w-md'
    | 'max-w-lg'
    | 'max-w-xl'
    | 'max-w-2xl'
    | 'max-w-3xl'
    | 'max-w-4xl';
  title: string;
  children?: JSX.Element;
}

export default function Modal({
  isOpen,
  onChangeShowModal,
  size = 'max-w-md',
  title,
  children,
}: IModalProps) {
  const backDrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modal = {
    hidden: {
      y: '0',
      opacity: 0,
      transition: {
        delay: 0.5,
        ease: 'easeOut',
        duration: 0.5,
      },
    },
    visible: {
      x: { duration: 1 },
      opacity: 1,
      transition: {
        delay: 0.5,
        ease: 'easeOut',
        x: { duration: 1 },
        default: { ease: 'linear' },
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          variants={backDrop}
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
          className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-20 z-30 grid place-items-center"
        >
          <motion.div
            variants={modal}
            className={`bg-white shadow-lg rounded-lg mx-auto w-full ${size} max-h-[80vh] overflow-y-auto`}
          >
            {/* title */}
            <div className="flex items-center justify-between p-4 gap-4 border-b border-b-gray-200">
              <p className="w-6"></p>
              <h2 className="text-2xl font-semibold">{title}</h2>
              <button type="button" onClick={() => onChangeShowModal(false)}>
                <FiX className="w-6 h-6 text-black" />
              </button>
            </div>
            {/* content */}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
