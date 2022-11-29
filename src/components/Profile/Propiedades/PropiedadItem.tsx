import { useState } from 'react';
import Room from '../../../interfaces/Room';
import { IoChevronForward } from 'react-icons/io5';
import { motion } from 'framer-motion';

interface IPropiedadItemProps {
  room: Room;
  openModal: (modal: number) => void;
  onChangeSelectedPropiedad: (selectedPropiedad: Room) => void;
}

export default function PropiedadItem({
  room,
  openModal,
  onChangeSelectedPropiedad,
}: IPropiedadItemProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const open = (selectedPropiedad: Room) => {
    openModal(1);
    onChangeSelectedPropiedad(selectedPropiedad);
  };

  return (
    <div className="w-full relative">
      <img
        src={
          room?.images?.length > 0
            ? room?.images[0]?.image.path
            : '/images/no-image.jpg'
        }
        alt={room.title}
        className="w-full h-60 object-cover transition-all duration-500 ease-out hover:cursor-pointer hover:opacity-80"
        onClick={() => open(room)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      <div className="absolute bottom-0 left-0 p-4 w-full flex items-center justify-between gap-2">
        <div>
          <p className="text-xs text-white font-light">{room.address}</p>
          <h3 className="text-white font-semibold text-base line-clamp-1">
            {room.title}
          </h3>
        </div>
        <motion.div
          initial={false}
          animate={{
            scale: [1, 1],
            rotate: isHovered ? [0, 180] : [180, 0],
            borderRadius: ['0%', '50%'],
          }}
          transition={{
            duration: 1.8,
            ease: 'easeInOut',
            times: [0, 0.2],
            repeatDelay: 1,
          }}
        >
          <IoChevronForward className="text-white" />
        </motion.div>
      </div>
    </div>
  );
}
