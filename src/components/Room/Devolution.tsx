import Image from 'next/image';
import Link from 'next/link';

export default function Devolution() {
  return (
    <div className="pt-8 space-y-2">
      <Image
        alt="devolution"
        src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"
        width={100}
        height={40}
        objectFit="contain"
      />
      <p>
        Todas las reservaciones incluyen protección gratuita en caso de que el
        anfitrión cancele, de que haya imprecisiones en el anuncio o de que
        surjan otros inconvenientes, como problemas al momento de hacer el
        check-in.
      </p>
      <Link href={'#'}>
        <a className="underline font-semibold">Mas Informacion</a>
      </Link>
    </div>
  );
}
