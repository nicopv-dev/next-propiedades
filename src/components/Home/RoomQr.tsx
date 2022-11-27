import { QRCodeCanvas } from 'qrcode.react';

interface IRoomQrProps {
  link: string;
}

export default function RoomQr({ link }: IRoomQrProps) {
  return (
    <div className="flex items-center justify-center w-full">
      <QRCodeCanvas value={link} size={240} />
    </div>
  );
}
