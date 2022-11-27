import Image from 'next/image';
import React from 'react';
import useWidth from '../../hooks/useWidth';
import Room from '../../interfaces/Room';
import Zone from '../../interfaces/Zone';
import { formatNumber } from '../../utils/methods';
import Like from '../Like';
import { IoRemoveCircleOutline } from 'react-icons/io5';

interface IWishlistRoomItemProps {
  room: Room;
  onChangeRoomZone: (newZone: Zone) => void;
}

export default function WishlistRoomItem({
  room,
  onChangeRoomZone,
}: IWishlistRoomItemProps) {
  const width = useWidth();
  const goTo = (): void => {
    if (room) {
      window.open(`/rooms/${room.id}`, '_blank');
    }
  };

  return (
    <div
      className="py-6 flex flex-col md:flex-row gap-6 hover:cursor-pointer"
      onMouseEnter={() =>
        onChangeRoomZone({
          latitude: parseInt(room.lat),
          longitude: parseInt(room.long),
        })
      }
    >
      {/* image */}
      <div onClick={goTo}>
        <Image
          alt={room.title}
          src={room.images[0].image.path}
          width={width > 768 ? 280 : 500}
          height={200}
          objectFit="cover"
          layout={width > 768 ? 'fixed' : 'responsive'}
          className="w-full object-cover rounded-xl"
        />
      </div>
      {/* info */}
      <div className="relative flex-grow flex flex-col justify-between">
        <section>
          <div className="flex justify-between">
            <h3 className="text-black text-xs opacity-75">{room.title}</h3>
            <div className="flex items-center flex-col">
              <button type="button">
                <IoRemoveCircleOutline className="h-5 w-5" />
              </button>
              {/* <Like isLiked={true} /> */}
            </div>
          </div>
          <h2 className="text-lg font-semibold">{room.address}</h2>
          <p className="text-black text-sm opacity-75 mt-2">
            {room.guests} huespedes
          </p>
        </section>
        <section className="flex items-center justify-between">
          <p>4.99</p>
          <p className="font-semibold">
            ${formatNumber(room?.price)}{' '}
            <span className="font-normal text-gray-500">/ noche</span>
          </p>
        </section>
      </div>
    </div>
  );
}
