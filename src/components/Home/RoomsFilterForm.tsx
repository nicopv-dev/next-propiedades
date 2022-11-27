import { useRouter } from 'next/router';
import GuestsFilter from './Filters/GuestsFilter';
import PriceFilter from './Filters/PriceFilter';
// import ServicesFilter from './Filters/ServicesFilter';
// import TypePropertyFilter from './Filters/TypePropertyFilter';
import { useSelector } from 'react-redux';
import { selectGuests, selectPrice } from '../../features/filterSlice';

interface IRoomsFilterFormProps {
  onChangeShowModal: (value: boolean) => void;
  categoryActive: number;
}

export default function RoomsFilterForm({
  onChangeShowModal,
  categoryActive,
}: IRoomsFilterFormProps) {
  const router = useRouter();
  const price = useSelector(selectPrice);
  const guests = useSelector(selectGuests);

  const applyFilter = () => {
    if (price[0] === 0 && price[1] === 100) {
      router.push({
        pathname: '/',
        query: {
          category: categoryActive,
          guests,
        },
      });
      onChangeShowModal(false);
    } else {
      router.push({
        pathname: '/',
        query: {
          category: categoryActive,
          min: price[0] * 100000,
          max: price[1] * 100000,
          guests,
        },
      });
    }
    onChangeShowModal(false);
  };

  return (
    <div className="py-4 px-8 divide-y">
      <PriceFilter />

      <GuestsFilter />

      {/* <TypePropertyFilter />

      <ServicesFilter /> */}

      <div className="flex items-center justify-between pt-6">
        <button
          type="button"
          className="bg-wite text-black font-medium py-2 px-8 rounded-lg border border-slate-200"
          onClick={() => onChangeShowModal(false)}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="bg-black text-white font-medium py-2 px-8 rounded-lg"
          onClick={applyFilter}
        >
          Aplicar
        </button>
      </div>
    </div>
  );
}
