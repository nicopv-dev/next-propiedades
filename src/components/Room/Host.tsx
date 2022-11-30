import Image from 'next/image';
import User from '../../interfaces/User';
import { createdAtDate } from '../../utils/moment';

interface IHostProps {
  host?: User;
}

export default function Host({ host }: IHostProps) {
  return (
    <div className="py-6">
      <div className="max-w-xl space-y-6">
        {/* host info */}
        <div className="flex items-center gap-2">
          <Image
            alt="host"
            src={host?.image || '/images/user.jpg'}
            width={70}
            height={70}
            className="object-cover rounded-full"
          />
          <div>
            <h1 className="text-2xl font-medium">Anfitrion: {host?.name}</h1>
            <p className="text-black opacity-60">
              Se registro en{' '}
              {createdAtDate(host?.createdAt || new Date().toString())}
            </p>
          </div>
        </div>

        {/* host description */}
        <div className="flex flex-col gap-2">
          <h2>Durante tu estadia</h2>
          <p>
            Nuestra prioridad, son nuestros clientes. Estamos disponibles por
            teléfono previo a la estadía y en forma presencial en el complejo,
            para asegurarnos que la experiencia sea óptima.
          </p>
        </div>

        {/* host list */}

        {/* host comunication */}
        <div className="space-y-2">
          <p className="text-xs max-w-sm">
            Para proteger tus pagos, nunca transfieras dinero ni te comuniques
            fuera de la página o la aplicación.
          </p>
        </div>
      </div>
    </div>
  );
}
