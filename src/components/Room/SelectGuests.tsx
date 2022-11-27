import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';

interface ISelectGuestsProps {
  guests: number;
  onChangeGuests: (quantity: number) => void;
  maxGuests: number;
}

export default function SelectGuests({
  guests,
  onChangeGuests,
  maxGuests,
}: ISelectGuestsProps) {
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);

  const onChangeAdults = (quantity: number, direction: string): void => {
    if (direction === 'add') {
      if (quantity > 0 && guests + 1 <= maxGuests) {
        setAdults(quantity);
        onChangeGuests(quantity + children + infants);
      }
    } else {
      if (quantity > 0) {
        setAdults(quantity);
        onChangeGuests(quantity + children + infants);
      }
    }
  };

  const onChangeChildren = (quantity: number, direction: string): void => {
    if (direction === 'add') {
      if (quantity > 0 && guests + 1 <= maxGuests) {
        setChildren(quantity);
        onChangeGuests(adults + quantity + infants);
      }
    } else {
      if (quantity >= 0) {
        setChildren(quantity);
        onChangeGuests(quantity + adults + infants);
      }
    }
  };

  const onChangeInfants = (quantity: number, direction: string): void => {
    if (direction === 'add') {
      if (quantity > 0 && guests + 1 <= maxGuests) {
        setInfants(quantity);
        onChangeGuests(adults + children + quantity);
      }
    } else {
      if (quantity >= 0) {
        setInfants(quantity);
        onChangeGuests(quantity + adults + children);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <OptionGuest
        title="Adultos"
        description="Edad: 13 o mas"
        quantity={adults}
        onChangeQuantity={onChangeAdults}
      />
      <OptionGuest
        title="Niños"
        description="De 2 a 12 años"
        quantity={children}
        onChangeQuantity={onChangeChildren}
      />
      <OptionGuest
        title="Bebes"
        description="Menores de 2 años"
        quantity={infants}
        onChangeQuantity={onChangeInfants}
      />
      <p className="text-xs p-4 text-center">
        La capacidad de huespedes maximo que tiene es de {maxGuests} personas
      </p>
    </div>
  );
}

interface IOptionGuestProps {
  title: string;
  description: string;
  quantity: number;
  onChangeQuantity: (quantity: number, direction: string) => void;
}

function OptionGuest({
  title,
  description,
  quantity,
  onChangeQuantity,
}: IOptionGuestProps) {
  return (
    <div className="flex justify-between items-center py-2 px-4 bg-white">
      <div className="flex flex-col items-start">
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="p-2 bg-slate-100 rounded-full"
          type="button"
          disabled={quantity === 0}
          onClick={() => onChangeQuantity(quantity - 1, 'remove')}
        >
          <FiMinus />
        </button>
        <p>{quantity}</p>
        <button
          className="p-2 bg-slate-100 rounded-full"
          onClick={() => onChangeQuantity(quantity + 1, 'add')}
          type="button"
        >
          <FiPlus />
        </button>
      </div>
    </div>
  );
}
