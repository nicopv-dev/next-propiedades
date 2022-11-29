import { useState } from 'react';
import Image from 'next/image';
import Room from '../../interfaces/Room';
import { FiHeart } from 'react-icons/fi';
import { IoStar, IoHeartSharp } from 'react-icons/io5';
import { formatNumber, getDistance } from '../../utils/methods';
import useGeoLocation from '../../hooks/useGeoLocation';
import { useSession } from 'next-auth/react';
import { likeRoom, unlikeRoom } from '../../requests/api';
import { motion } from 'framer-motion';

interface IRoomItemProps {
  room: Room;
}

export default function RoomItem({ room }: IRoomItemProps) {
  const [like, setLike] = useState<boolean>(room.isLike);
  const [likeId, setLikeId] = useState<number>(room.likeId || 0);
  const myLocation = useGeoLocation();
  const { data: session } = useSession();

  const goTo = (): void => {
    window.open(`/rooms/${room.id}`, '_blank');
    // router.push(`/rooms/${room.id}`);
  };

  const likeSubmit = async (): Promise<void> => {
    try {
      const response = await likeRoom(room.id, session?.user?.email);

      const data = await response.json();
      if (response.status === 201) {
        setLike(true);
        setLikeId(data.id);
      }
    } catch (e) {
      alert(e.response);
    }
  };

  const unlike = async (): Promise<void> => {
    try {
      const response = await unlikeRoom(likeId);
      if (response.status === 202) {
        setLike(false);
      }
    } catch (e) {
      alert(e.response);
    }
  };

  return (
    <div className="hover:cursor-pointer">
      {/* image */}
      <div className="relative overflow-hidden rounded-2xl w-full">
        <Image
          alt={room.title}
          src={room.images[0].image.path}
          width={400}
          height={380}
          objectFit="cover"
          layout="responsive"
          className="rounded-2xl transition-all duration-300 ease-out scale-100 hover:scale-105"
          quality={100}
          onClick={goTo}
        />
        {session ? (
          like ? (
            <motion.button
              type="button"
              className="absolute top-4 right-4"
              onClick={unlike}
              whileHover={{ scale: 1.2 }}
            >
              <IoHeartSharp className="text-red-500 h-5 w-5" />
            </motion.button>
          ) : (
            <motion.button
              type="button"
              className="absolute top-4 right-4"
              onClick={likeSubmit}
              whileHover={{ scale: 1.2 }}
            >
              <FiHeart className="text-white h-5 w-5" />
            </motion.button>
          )
        ) : null}
      </div>

      {/* info */}
      <div className="mt-2" onClick={goTo}>
        <div className="flex items-center justify-between gap-2">
          <h1 className="font-semibold text-base line-clamp-1">
            {room.address}
          </h1>
          <span className="flex items-center gap-1">
            <IoStar className="w-3 h-3" />
            4.99
          </span>
        </div>
        {room.lat && room.long && myLocation && (
          <p className="font-light text-gray-500">
            {getDistance(myLocation, {
              latitude: parseInt(room?.lat) || -34.603684,
              longitude: parseInt(room?.long) || 3.3253252,
            })}{' '}
            Kilometros
          </p>
        )}
        {/* <p className="text-base font-light text-gray-500">1 - 7 oct</p> */}
        <p className="font-semibold">
          ${formatNumber(room?.price)} CLP{' '}
          <span className="font-normal text-gray-500">/ mes</span>
        </p>
      </div>
    </div>
  );
}
