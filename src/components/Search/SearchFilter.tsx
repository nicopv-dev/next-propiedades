import { FiSliders } from 'react-icons/fi';

interface ISearchFilterProps {
  resultsCount: number;
}

export default function SearchFilter({ resultsCount }: ISearchFilterProps) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="font-semibold">Más de {resultsCount} alojamientos</h3>
      <button
        type="button"
        className="py-2 px-5 border text-sm border-gray-300 rounded-lg shadow-sm flex items-center gap-2"
      >
        <FiSliders />
        Filtros
      </button>
    </div>
  );
}
