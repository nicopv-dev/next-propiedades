import React from 'react';
import Whislist from '../../interfaces/Wishlist';
import WishlistItem from './WishlistItem';

interface IMyWishlistsProps {
  wishlists: Whislist[];
}

export default function MyWishlists({ wishlists }: IMyWishlistsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {wishlists &&
        wishlists.map((wishlist) => (
          <WishlistItem key={wishlist.id} wishlist={wishlist} />
        ))}
    </div>
  );
}
