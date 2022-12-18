import { useCallback, useState } from 'react';
import {
  IoFileTrayFullSharp,
  IoSave,
  IoCloudDownloadOutline,
} from 'react-icons/io5';
import Schedule from '../../interfaces/Schedule';
import { useDropzone } from 'react-dropzone';
import Loading from '../Loading';
import { toast } from 'react-toastify';
import { formatDate } from '../../utils/moment';
import { GrStatusGoodSmall } from 'react-icons/gr';

interface IHorasRoomProps {
  hora: Schedule;
}

export default function HorasRoom({ hora }: IHorasRoomProps) {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFileApproved, setIsFileApproved] = useState<boolean>(
    hora.approved?.file ? true : false
  );
  const [fileUploded, setFileUploaded] = useState<string>(
    hora.approved ? hora.approved.file : ''
  );

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    setFile(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.pdf'],
    },
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const onSubmit = async () => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(
        `http://localhost:3000/api/schedule/${hora.id}/document`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (res.status === 200) {
        const data = await res.json();
        toast.success('Archivo enviado', { autoClose: 3000 });
        setIsFileApproved(true);
        setFileUploaded(data.document.file as string);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const dowloadFile = () => {
    window.open(fileUploded, '_blank');
  };

  return (
    <div className="py-8 flex flex-row justify-between h-60 gap-4">
      <div className="w-80 h-full">
        <img
          src={hora.room.images[0].image.path}
          alt={hora.room.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="grow flex flex-col justify-between">
        <div>
          <a className="text-lg font-semibold" href={`/rooms/${hora.room.id}`}>
            {hora.room.title}
          </a>
          <p className="underline">{hora.room.address}</p>
        </div>
        <div>
          <p>Fecha de visita: {formatDate(hora.date)}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        {isFileApproved ? (
          <>
            <button
              className="px-6 py-2 text-xs border border-slate-200 rounded-md flex items-center gap-2"
              type="button"
              onClick={dowloadFile}
            >
              <IoCloudDownloadOutline />
              Descargar archivo
            </button>
            <p className="flex items-center justify-end gap-1">
              <GrStatusGoodSmall
                className={`${
                  !hora?.approved?.status && !hora.approved?.isRejected
                    ? 'text-orange-400'
                    : hora.approved.status && !hora.approved?.isRejected
                    ? 'text-green-500'
                    : 'text-red-400'
                }`}
              />
              Estado:{' '}
              {!hora?.approved?.status && !hora.approved?.isRejected
                ? 'Procesando'
                : hora.approved?.status && !hora.approved?.isRejected
                ? 'Aprobado'
                : 'Rechazado'}
            </p>
          </>
        ) : file ? (
          isLoading ? (
            <button className="px-6 py-2 text-xs bg-primary text-white flex items-center gap-2 rounded-md opacity-100 transition-all duration-300 ease-out hover:opacity-80">
              <Loading />
            </button>
          ) : (
            <button
              className="px-6 py-2 text-xs bg-primary text-white flex items-center gap-2 rounded-md opacity-100 transition-all duration-300 ease-out hover:opacity-80"
              type="button"
              onClick={onSubmit}
            >
              <IoSave />
              Enviar archivo
            </button>
          )
        ) : (
          <button
            className="px-6 py-2 text-xs bg-green-400 text-white flex items-center gap-2 rounded-md opacity-100 transition-all duration-300 ease-out hover:opacity-80"
            {...getRootProps()}
          >
            <IoFileTrayFullSharp />
            Subir Documento
            <input {...getInputProps()} />
          </button>
        )}
      </div>
    </div>
  );
}
