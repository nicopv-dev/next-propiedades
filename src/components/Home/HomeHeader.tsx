import { useState } from 'react';
import { FiHeart, FiShare, FiPlus } from 'react-icons/fi';
import { IoStar, IoHeart } from 'react-icons/io5';
import Room from '../../interfaces/Room';
import Modal from '../Modal';
import RoomShare from './RoomShare';

interface IHomeHeaderProps {
  room?: Room;
  isLike: boolean;
}

export default function HomeHeader({ room, isLike }: IHomeHeaderProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<JSX.Element>(<div />);

  const openModal = () => {
    setShowModal(true);
    setModalContent(<RoomShare room={room} />);
  };

  const onChangeShowModal = (value: boolean): void => {
    setShowModal(value);
  };

  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold">{room?.title}</h1>
      <div className="flex justify-between flex-col items-start md:flex-row md:items-center space-y-2 md:space-y-0">
        <div className="flex gap-x-4 gap-y-1 sm:gap-y-0 flex-wrap">
          <div className="flex gap-1">
            <IoStar />
            <p className="text-sm">4.87</p>
          </div>
          <span className="text-sm">389 reseñas</span>
          <p className="text-sm underline">
            {room?.address}, {room?.pais.title}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-1 text-sm"
            onClick={openModal}
          >
            <FiShare className="h-4 w-4" />
            Compartir
          </button>
          <button className="flex items-center gap-1 text-sm">
            {isLike ? (
              <IoHeart className="h-4 w-4 text-red-500" />
            ) : (
              <FiHeart className="h-4 w-4" />
            )}
            Me Gusta
          </button>
          <button className="flex items-center gap-1 text-sm">
            <FiPlus className="h-4 w-4" />
            Agregar
          </button>
        </div>

        <Modal
          isOpen={showModal}
          onChangeShowModal={onChangeShowModal}
          title="Comparte este alojamiento con amigos y familiares"
          size="max-w-xl"
        >
          {modalContent}
        </Modal>
      </div>
    </div>
  );
}
