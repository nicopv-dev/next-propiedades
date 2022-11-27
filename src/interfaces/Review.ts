import User from './User';

export default interface Review {
  id: number;
  description: string;
  createdAt: string;
  user: User;
}
