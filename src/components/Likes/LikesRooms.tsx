import React from 'react';
import Room from '../../interfaces/Room';
import LikesRoomItem from './LikesRoomItem';

interface ILikesRoomsProps {
  rooms: Room[];
}

export default function LikesRooms({ rooms }: ILikesRoomsProps) {
  return (
    <div className="py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {rooms.map((room, index) => (
          <LikesRoomItem key={index} room={room} />
        ))}
      </div>
    </div>
  );
}
