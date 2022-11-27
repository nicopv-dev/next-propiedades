import Image from 'next/image';
import Room from '../../interfaces/Room';
import RoomQr from './RoomQr';
import { FaWhatsapp, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

interface IRoomQrProps {
  room?: Room;
}

interface IButton {
  id: number;
  name: string;
  icon: JSX.Element;
}

interface IButtonShareProps {
  item: IButton;
}

const BUTTONS: IButton[] = [
  { id: 1, name: 'Whatsapp', icon: <FaWhatsapp className="w-6 h-6" /> },
  { id: 2, name: 'Facebook', icon: <FaFacebook className="w-6 h-6" /> },
  { id: 3, name: 'Twitter', icon: <FaTwitter className="w-6 h-6" /> },
  { id: 4, name: 'Instagram', icon: <FaInstagram className="w-6 h-6" /> },
];

export default function RoomShare({ room }: IRoomQrProps) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Image
          alt="room"
          src={room?.images[0]?.image?.path || ''}
          width={80}
          height={80}
          objectFit="cover"
          className="rounded-lg"
        />
        <h1 className="text-sm font-medium">{room?.title}</h1>
      </div>
      <div className="flex">
        <div className="flex-[0.5_1_0%] flex flex-col gap-2">
          {BUTTONS.map((item) => (
            <ButtonShare key={item.id} item={item} />
          ))}
        </div>
        <div className="flex-[0.5_1_0%]">
          <RoomQr link={`http://44.204.193.22/rooms/${room?.id}`} />
        </div>
      </div>
    </div>
  );
}

function ButtonShare({ item }: IButtonShareProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-4 p-4 border border-slate-300 rounded-xl bg-white transition-all duration-300 ease-in hover:bg-gray-100"
    >
      {item.icon}
      <p className="text-md">{item.name}</p>
    </button>
  );
}
