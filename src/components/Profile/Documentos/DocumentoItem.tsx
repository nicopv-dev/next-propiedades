import Documento from '../../../interfaces/Documento';
import { AiFillFilePdf } from 'react-icons/ai';
import { IoSave, IoCheckmarkCircle } from 'react-icons/io5';
import { formatDate } from '../../../utils/moment';

// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface IDocumentoItemProps {
  doc: Documento;
  onChangeShowModal: (value: boolean) => void;
  onChangeDocumento: (value: string) => void;
  status: boolean;
  rejected: boolean;
}

export default function DocumentoItem({
  doc,
  onChangeShowModal,
  onChangeDocumento,
}: IDocumentoItemProps) {
  const downloadFile = () => {
    window.open(doc.file, '_blank');
  };

  const selectDoc = () => {
    onChangeDocumento(doc);
    onChangeShowModal(true);
  };

  return (
    <>
      <div className="flex gap-2 py-8">
        <div>
          <AiFillFilePdf className="w-20 h-20" />
        </div>
        <div className="grow flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase">
              {!doc?.status && !doc.isRejected
                ? 'En espera'
                : doc.status && !doc.isRejected
                ? 'Aprobado'
                : 'Rechazado'}
            </span>
            <h4>Enviado el {formatDate(doc.createdAt)}</h4>
            <p className="text-xs underline text-gray-600">
              Por {doc.schedule?.user.name}
            </p>
          </div>
          <div>
            <p>
              Propiedad:{' '}
              <a
                className="underline hover:cursor-pointer"
                href={`/rooms/${doc.schedule.room.id}`}
              >
                {doc.schedule.room.title}
              </a>
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <button
            className="flex justify-center items-center gap-2 text-xs px-6 py-2 bg-white border border-slate-200 text-black"
            type="button"
            onClick={selectDoc}
          >
            <IoCheckmarkCircle />
            Ver archivo
          </button>
          <button
            className="px-6 py-2 text-xs border border-slate-200 flex items-center gap-2"
            type="button"
            onClick={downloadFile}
          >
            <IoSave />
            Descargar PDF
          </button>
        </div>
      </div>
    </>
  );
}
