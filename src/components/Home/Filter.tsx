import { FiSliders } from 'react-icons/fi';

interface IFilterProps {
  onChangeShowModal: (isOpen: boolean) => void;
}

export default function Filter({ onChangeShowModal }: IFilterProps) {
  return (
    <button
      className="text-sm font-medium flex items-center gap-2 border border-slate-300 py-3 px-3 md:px-6 rounded-lg shadow"
      onClick={() => onChangeShowModal(true)}
    >
      <FiSliders />
      <span className="hidden lg:block">Filtros</span>
    </button>
  );
}
