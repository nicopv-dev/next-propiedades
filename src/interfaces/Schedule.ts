import Documento from './Documento';
import Room from './Room';
import User from './User';

export default interface Schedule {
  id: number;
  title: string;
  date: string;
  start: string;
  end: string;
  allDay: boolean;
  room: Room;
  user: User;
  approved: Documento;
}
