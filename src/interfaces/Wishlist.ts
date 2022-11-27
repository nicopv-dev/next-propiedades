import Room from './Room';

export default interface Whislist {
  id: string;
  createdAt: string;
  title: string;
  rooms: Room[];
}
