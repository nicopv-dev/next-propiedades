import Schedule from './Schedule';

export default interface Documento {
  id: number;
  createdAt: string;
  status: false;
  file: string;
  isRejected: boolean;
  schedule: Schedule;
}
