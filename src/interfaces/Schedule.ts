import Room from './Room';
import User from './User';

export default interface Schedule {
  id: number;
  date: string;
  room: Room;
  user: User;
}
