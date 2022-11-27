import { useState } from 'react';
import { useRouter } from 'next/router';
import { FiArrowLeft, FiMoreHorizontal, FiShare } from 'react-icons/fi';
import Modal from '../Modal';
import WishlistTitleForm from './WishlistTitleForm';

interface IWishlistButtonsProps {
  title: string;
  onChangeTitle: (value: string) => void;
}

export default function WishlistButtons({
  title,
  onChangeTitle,
}: IWishlistButtonsProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);

  const goTo = (link: string): void => {
    router.push(link);
  };

  const onChangeShowModal = (value: boolean): void => {
    setShowModal(value);
  };

  return (
    <div className="flex justify-between items-center my-4">
      <div>
        <button
          type="button"
          className="p-2"
          onClick={() => goTo('/wishlists')}
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
      </div>
      <div className="space-x-2">
        <button type="button" className="p-2">
          <FiShare className="w-5 h-5" />
        </button>
        <button
          type="button"
          className="p-2 bg-white transition-all duration-300 ease-out hover:bg-slate-100 rounded-full"
          onClick={() => onChangeShowModal(true)}
        >
          <FiMoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      <Modal
        isOpen={showModal}
        onChangeShowModal={onChangeShowModal}
        title="Configuracion"
        size="max-w-lg"
      >
        <WishlistTitleForm
          title={title}
          onChangeShowModal={onChangeShowModal}
          onChangeTitle={onChangeTitle}
        />
      </Modal>
    </div>
  );
}
