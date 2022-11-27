import { RiHeart3Fill } from 'react-icons/ri';
import { FiHeart } from 'react-icons/fi';

interface IButtonProps {
  isLiked: boolean;
}

export default function Like({ isLiked }: IButtonProps) {
  return (
    <button type="button">
      {isLiked ? (
        <RiHeart3Fill className="w-6 h-6 text-red-500" />
      ) : (
        <FiHeart className="w-6 h-6 text-black" />
      )}
    </button>
  );
}
