import { FiGlobe } from 'react-icons/fi';

export default function Languaje() {
  return (
    <button
      type="button"
      className="p-2 rounded-full bg-transparent transition-all duration-300 ease-in hover:bg-gray-100"
    >
      <FiGlobe className="w-5 h-5 text-gray-600" />
    </button>
  );
}
