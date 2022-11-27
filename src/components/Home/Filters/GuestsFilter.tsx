import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../app/store';
import { selectGuests, setGuests } from '../../../features/filterSlice';

interface INumGuests {
  title: string;
  value: number;
}

interface IGuestItemProps {
  numGuests: INumGuests;
  isSelected: number;
  onChangeGuests: (value: number) => void;
}

const NUM_GUESTS: INumGuests[] = [
  { title: '1', value: 1 },
  { title: '2', value: 2 },
  { title: '3', value: 3 },
  { title: '4', value: 4 },
  { title: '5', value: 5 },
  { title: '6', value: 6 },
  { title: '7', value: 7 },
  { title: '+8', value: 8 },
];

export default function GuestsFilter() {
  const guests = useAppSelector(selectGuests);
  const dispatch = useDispatch();

  const onChangeGuests = (value: number): void => {
    dispatch(setGuests({ guests: value }));
  };

  return (
    <div className="py-8 space-y-2">
      <h2>Numero de Huespedes</h2>
      <div className="flex flex-row gap-2">
        <GuestItem
          numGuests={{ title: 'Cualquiera', value: 0 }}
          isSelected={guests}
          onChangeGuests={onChangeGuests}
        />
        {NUM_GUESTS.map((numGuests, index) => (
          <GuestItem
            key={index}
            numGuests={numGuests}
            isSelected={guests}
            onChangeGuests={onChangeGuests}
          />
        ))}
      </div>
    </div>
  );
}

function GuestItem({ numGuests, isSelected, onChangeGuests }: IGuestItemProps) {
  const onClickSelect = () => {
    onChangeGuests(numGuests.value);
  };

  return (
    <button
      type="button"
      className={`py-2 px-6 border border-slate-200 rounded-3xl ${
        isSelected === numGuests.value
          ? 'bg-black text-white'
          : 'bg-white text-black'
      }`}
      onClick={onClickSelect}
    >
      {numGuests.title}
    </button>
  );
}
