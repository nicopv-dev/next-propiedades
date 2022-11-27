import Image from 'next/image';
import ImageOnRoom from '../../interfaces/ImageOnRoom';

interface IGalleryProps {
  images?: ImageOnRoom[];
}

export default function Gallery({ images }: IGalleryProps) {
  return (
    <div className="grid sm:grid-rows-3 sm:grid-cols-2 md:grid-rows-2 md:grid-cols-4 gap-2 rounded-md">
      {images?.map((item, index) => (
        <div
          key={item.image.id}
          className={`${
            index === 0
              ? 'col-span-1 row-span-1 sm:col-span-2 sm:row-span-2'
              : 'row-span-auto'
          }`}
        >
          <Image
            alt="room"
            src={item.image.path}
            layout="responsive"
            width={'100%'}
            height={70}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
}
