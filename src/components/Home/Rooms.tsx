import Room from '../../interfaces/Room';
import RoomItem from './RoomItem';

interface IRoomsProps {
  rooms?: Room[];
}

export default function Rooms({ rooms }: IRoomsProps) {
  return (
    <section className="mt-4 mb-8 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
      {rooms?.map((room) => (
        <RoomItem key={room.id} room={room} />
      ))}
    </section>
  );
}
