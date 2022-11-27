import { useRouter } from 'next/router';
import { useRef } from 'react';
import { IoSearch } from 'react-icons/io5';

export default function SearchBar() {
  const searchInput = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const search = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const term = searchInput.current?.value;

    if (!term) return;

    router.push(`/search?q=${term}`);
  };

  return (
    <form
      className={`py-2 px-4 w-full flex items-center border border-slate-200 rounded-full transition-all duration-200 ease-out ${
        router.query?.q ? 'shadow-md' : 'shadow-sm'
      } hover:shadow-md hover:cursor-pointer`}
      onSubmit={search}
    >
      <input
        ref={searchInput}
        type="text"
        placeholder="Buscar por ciudad (ej: Temuco, Santiago, etc)"
        className="focus:outline-none grow px-2 hover:cursor-pointer"
      />
      <button type="submit" className="bg-emerald-400 p-2 rounded-full">
        <IoSearch className="text-white" />
      </button>
    </form>
  );
}
