import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import Wishlist from '../../interfaces/Wishlist';

interface IWishlistItemProps {
  wishlist: Wishlist;
}

export default function WishlistItem({ wishlist }: IWishlistItemProps) {
  const router = useRouter();

  const goTo = (): void => {
    router.push(`/whislists/${wishlist?.id || ''}`);
  };

  return (
    <div
      onClick={goTo}
      className="hover:cursor-pointer overflow-hidden space-y-2"
    >
      {/* image */}
      <div className="grid sm:grid-rows-2 sm:grid-cols-1 md:grid-rows-1 md:grid-cols-3 gap-[2px]">
        {wishlist?.rooms?.map((room, index) => (
          <div
            key={room?.id}
            className={`${
              index === 0
                ? 'col-span-1 row-span-1 sm:col-span-2 sm:row-span-2'
                : 'row-span-auto'
            }`}
          >
            <Image
              alt={room?.title}
              src={room?.images[0].image.path}
              width={300}
              height={200}
              objectFit="cover"
              layout="responsive"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {/* title */}
      <div>
        <h2 className="text-xl font-semibold">{wishlist?.title}</h2>
      </div>
    </div>
  );
}
