import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { IoPersonCircleOutline, IoBuild, IoAlbums } from 'react-icons/io5';

export default function ProfileSidebar() {
  const { data: session } = useSession();

  return (
    <nav className="flex-[0.3_1_0%] border border-au_gray">
      <div className="flex flex-col divide-y divide-au_gray">
        <LinkItem
          title="MI PERFIL"
          link="/profile"
          icon={<IoPersonCircleOutline />}
        />
        {session?.user.role === 'ADMIN' && (
          <>
            <LinkItem
              title="MIS PROPIEDADES"
              link="/profile/propiedades"
              icon={<IoAlbums />}
            />
            <LinkItem
              title="AGENDA"
              link="/profile/agenda"
              icon={<IoAlbums />}
            />
          </>
        )}
        <LinkItem
          title="CONFIGURACIÓN"
          link="/profile/configuracion"
          icon={<IoBuild />}
        />
      </div>
    </nav>
  );
}

interface ILinkItemProps {
  title: string;
  link: string;
  icon: JSX.Element;
}

function LinkItem({ title, link, icon }: ILinkItemProps) {
  return (
    <Link href={link}>
      <a className="text-au_white flex items-center gap-2 p-5 transition-all duration-300 ease-out translate-x-0 hover:translate-x-1 hover:text-au_primary">
        {icon}
        <span className="text-xs font-medium">{title}</span>
      </a>
    </Link>
  );
}
