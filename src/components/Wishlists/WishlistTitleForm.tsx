import { useState } from 'react';
import { useRouter } from 'next/router';

interface IWishlistTitleFormProps {
  title: string;
  onChangeShowModal: (value: boolean) => void;
  onChangeTitle: (value: string) => void;
}

export default function WishlistTitleForm({
  title,
  onChangeShowModal,
  onChangeTitle,
}: IWishlistTitleFormProps) {
  const [wishlistTitle, setWishlistTitle] = useState<string>(title);
  const router = useRouter();

  const onChangeWishlistTitle = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setWishlistTitle(e.target.value);
  };

  const onSubmit = async (
    e: React.ChangeEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/wishlists/${router.query.wishlistId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: wishlistTitle,
          }),
        }
      );

      if (response.status === 200) {
        onChangeShowModal(false);
        onChangeTitle(wishlistTitle);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="px-4 py-1">
        <input
          type="text"
          placeholder="Ingresa titulo de la lista"
          value={wishlistTitle}
          onChange={onChangeWishlistTitle}
          className="py-3 px-4 focus:outline-none w-full"
        />
      </div>
      <div className="border-t border-t-gray-200 py-4 px-6 flex items-center justify-between">
        <button
          type="button"
          className="underline"
          onClick={() => onChangeShowModal(false)}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-black rounded-lg text-white py-3 px-6"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
