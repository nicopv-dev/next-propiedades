import { useSession } from 'next-auth/react';
import { useState, useCallback } from 'react';
import Room from '../../../interfaces/Room';
import Loading from '../../Loading';
import { useDropzone } from 'react-dropzone';
import { IoCloudUploadSharp } from 'react-icons/io5';
import axios from 'axios';
import { Switch } from 'antd';

interface IEditPropiedadFormProps {
  onChangeShowModal: (isOpen: boolean) => void;
  deletePropiedad: (propiedad: Room) => void;
  propiedad: Room;
}

export default function EditPropiedadForm({
  onChangeShowModal,
  propiedad,
}: IEditPropiedadFormProps) {
  const { data: session } = useSession();
  const [title, setTitle] = useState<string>(propiedad.title);
  const [address, setAddress] = useState<string>(propiedad.address);
  const [description, setDescription] = useState<string>(propiedad.description);
  const [price, setPrice] = useState<number>(propiedad.price);
  const [tipo, setTipo] = useState<number>(propiedad.category.id);
  const [guests, setGuests] = useState<number>(propiedad.guests);
  const [city, setCity] = useState<string>(propiedad.pais.id);
  const [lat, setLat] = useState<string>(propiedad.lat);
  const [long, setLong] = useState<string>(propiedad.long);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filesUpload, setFilesUpload] = useState(null);
  const [published, setPublished] = useState(propiedad.published);

  const onDrop = useCallback((acceptedFiles) => {
    const files = acceptedFiles;
    const fileData = files.map((file) => {
      const item = {
        type: 'image',
        file,
        preview: URL.createObjectURL(file),
      };
      return item;
    });
    setFilesUpload(fileData);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    noKeyboard: true,
    multiple: true,
    onDrop,
  });

  const onSubmit = async () => {
    setIsLoading(true);
    const data = {
      title,
      address,
      description,
      price: Number(price),
      categoryId: Number(tipo),
      guests: Number(guests),
      paisId: Number(city),
      lat: lat,
      long: long,
      published,
      authorId: session?.user?.id,
    };

    try {
      if (filesUpload) {
        const formData = new FormData();
        filesUpload.map((item) => {
          formData.append('file', item.file);
        });
        formData.append('folder', 'propiedades');
        const uploadResponse = await axios.post(
          `http://localhost:3000/api/upload`,
          formData
        );

        if (uploadResponse.status === 200) {
          console.log(uploadResponse.data);

          const addImagesResponse = await fetch(
            'http://localhost:3000/api/propiedad/add/images',
            {
              method: 'POST',
              body: JSON.stringify({
                roomId: propiedad.id,
                images: uploadResponse.data?.images,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          if (addImagesResponse.status === 200) {
            setIsLoading(false);
            onChangeShowModal(false);
          }
        }
      } else {
        const editPropiedadResponse = await fetch(
          `http://localhost:3000/api/propiedad/${propiedad.id}/edit`,
          {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (editPropiedadResponse.status === 200) {
          setIsLoading(false);
          onChangeShowModal(false);
        } else {
          setIsLoading(false);
        }
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const onChange = (checked: boolean) => {
    setPublished(checked);
  };

  return (
    <form className="grid grid-cols-2 gap-4">
      <div>
        <div className="grid grid-cols-2 gap-4 p-4">
          {/* name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-xs">
              Nombre
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Nombre de la propiedad"
              className="bg-gray-100 focus:outline-none py-2 px-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* direccion */}
          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="text-xs">
              Direccion
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Direccion de la propiedad (Ej. Balmaceda, 124)"
              className="bg-gray-100 focus:outline-none py-2 px-4"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {/* description */}
          <div className="col-span-2 flex flex-col gap-2">
            <label htmlFor="description" className="text-sm">
              Descripción
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              id="description"
              placeholder="Agrega una descripción para tu equipo"
              className="bg-gray-100 focus:outline-none py-2 px-4"
            />
          </div>

          <div className="col-span-2 grid grid-cols-3 gap-4">
            {/* tipo */}
            <div className="flex flex-col gap-2">
              <label htmlFor="tipo" className="text-xs">
                Tipo de propiedad
              </label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                name="tipo"
                id="tipo"
                className="bg-gray-100 focus:outline-none py-[0.4rem] text-base px-4 "
              >
                <option value={1} className="p-2">
                  Casa
                </option>
                <option value={2} className="p-2">
                  Departamento
                </option>
              </select>
            </div>
            {/* precio */}
            <div className="flex flex-col gap-2">
              <label htmlFor="price" className="text-xs">
                Precio
              </label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                name="price"
                id="price"
                placeholder="$190.000"
                className="bg-gray-100 focus:outline-none py-2 px-4 "
              />
            </div>
            {/* personas */}
            <div className="flex flex-col gap-2">
              <label htmlFor="guests" className="text-xs">
                Habitaciones
              </label>
              <input
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                min={1}
                type="number"
                name="guests"
                id="guests"
                placeholder="Numero de habitaciones"
                className="bg-gray-100 focus:outline-none py-2 px-4 "
              />
            </div>
          </div>

          <div className="col-span-2 grid grid-cols-3 gap-4">
            {/* tipo */}
            <div className="flex flex-col gap-2">
              <label htmlFor="city" className="text-xs">
                Ciudad
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                name="city"
                id="city"
                className="bg-gray-100 focus:outline-none py-[0.4rem] text-base px-4 "
              >
                <option value={1} className="p-2">
                  Temuco
                </option>
                <option value={2} className="p-2">
                  Santiago
                </option>
                <option value={3} className="p-2">
                  Rancagua
                </option>
              </select>
            </div>
            {/* precio */}
            <div className="flex flex-col gap-2">
              <label htmlFor="lat" className="text-xs">
                Latitud
              </label>
              <input
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                type="text"
                name="lat"
                id="lat"
                placeholder="Ingrese la latitud"
                className="bg-gray-100 focus:outline-none py-2 px-4 "
              />
            </div>
            {/* longitud */}
            <div className="flex flex-col gap-2">
              <label htmlFor="long" className="text-xs">
                Longitud
              </label>
              <input
                value={long}
                onChange={(e) => setLong(e.target.value)}
                type="text"
                name="long"
                id="titlongle"
                placeholder="Ingrese la longitud"
                className="bg-gray-100 focus:outline-none py-2 px-4 "
              />
            </div>
          </div>
        </div>

        <div className="col-span-2 p-4 space-y-2">
          <p className="text-xs">
            Publicar propiedad cambiando el estado &quot;Published&quot;
          </p>
          <Switch
            defaultChecked={published ? true : false}
            onChange={onChange}
          />
        </div>

        <div className="flex items-center justify-evenly h-14">
          <button
            className="h-full w-full"
            type="button"
            onClick={() => onChangeShowModal(false)}
          >
            Cancelar
          </button>
          <button className="h-full w-full" type="button" onClick={onSubmit}>
            {isLoading ? <Loading /> : 'Guardar Cambios'}
          </button>
        </div>
      </div>
      <div
        className="h-full bg-slate-100 bg-opacity-100 transition-all duration-300 ease-out hover:bg-opacity-60 overflow-hidden hover:cursor-pointer flex items-center justify-center "
        {...getRootProps()}
      >
        <input {...getInputProps()} />

        {filesUpload ? (
          <div className="h-full w-full flex flex-col gap-4">
            {filesUpload?.map((item, index) => (
              <img
                key={index}
                src={item?.preview}
                alt="imagen"
                className="w-full h-40 object-cover"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center transition-all duration-300 ease-out translate-y-0 hover:-translate-y-2">
            <IoCloudUploadSharp className="w-10 h-10" />
            <p>Seleccionar imagenes</p>
          </div>
        )}
      </div>
    </form>
  );
}
