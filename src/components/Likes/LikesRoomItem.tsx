import Image from 'next/image';
import { useState } from 'react';
import Room from '../../interfaces/Room';
import { IoChevronForward } from 'react-icons/io5';
import { motion } from 'framer-motion';

interface ILikesRoomItemProps {
  room: Room;
}

export default function LikesRoomItem({ room }: ILikesRoomItemProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const goTo = (): void => {
    window.open(`/rooms/${room.id}`, '_blank');
  };

  return (
    <div className="w-full relative">
      <Image
        src={room?.images[0]?.image.path}
        alt={room.title}
        width={'100%'}
        height={100}
        objectFit="cover"
        layout="responsive"
        className="transition-all duration-500 ease-out hover:cursor-pointer hover:opacity-80"
        onClick={goTo}
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
