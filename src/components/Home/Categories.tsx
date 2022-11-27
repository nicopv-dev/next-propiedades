import Category from '../../interfaces/Category';
import { useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface ICategoriesProps {
  categories?: Category[];
  categoryActive: number;
  onChangeCategoryActive: (id: number) => void;
}

interface ICategoryItemProps {
  category: Category;
  isActive: boolean;
  onChangeCategoryActive: (id: number) => void;
}

export default function Categories({
  categories,
  categoryActive,
  onChangeCategoryActive,
}: ICategoriesProps) {
  const categoriesRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="grow flex items-center overflow-x-auto scrollbar-hide"
      ref={categoriesRef}
    >
      <div className="grow">
        <div className="flex items-center gap-11 overflow-x-scroll scrollbar-hide">
          {categories?.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              isActive={categoryActive === category.id ? true : false}
              onChangeCategoryActive={onChangeCategoryActive}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CategoryItem({
  category,
  isActive,
  onChangeCategoryActive,
}: ICategoryItemProps) {
  const router = useRouter();

  const selectCategory = (): void => {
    onChangeCategoryActive(category.id);
    router.push(`/?category=${category.id}`);
  };

  return (
    <button
      type="button"
      className={`flex flex-col items-center gap-2 py-[10px] outline-none font-bold transition-all duration-300 ease-in-out ${
        isActive
          ? 'border-b-[3px] border-b-black text-black'
          : 'border-none text-grey_light hover:border-b-[3px] hover:border-b-grey_light'
      }`}
      onClick={selectCategory}
    >
      <Image
        alt={category.title}
        src={category.icon}
        width={24}
        height={24}
        objectFit="cover"
        className={`transition-all duration-300 ease-linear ${
          isActive ? 'opacity-100' : 'opacity-50'
        }`}
      />
      <p className="text-xs whitespace-nowrap">{category.title}</p>
    </button>
  );
}
