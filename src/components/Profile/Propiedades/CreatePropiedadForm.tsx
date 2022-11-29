import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';
import Room from '../../../interfaces/Room';
import Loading from '../../Loading';

interface ICreatePropiedadFormProps {
  onChangeShowModal: (isOpen: boolean) => void;
  addPropiedad: (propiedad: Room) => void;
}

export default function CreatePropiedadForm({
  onChangeShowModal,
  addPropiedad,
}: ICreatePropiedadFormProps) {
  const { data: session } = useSession();
  const title = useRef<string>('');
  const address = useRef<string>('');
  const description = useRef<string>('');
  const price = useRef<number>('');
  const tipo = useRef<string>('');
  const guests = useRef<string>('');
  const city = useRef<string>('');
  const lat = useRef<string>('');
  const long = useRef<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    setIsLoading(true);
    const data = {
      title: title.current.value,
      address: address.current.value,
      description: description.current.value,
      price: Number(price.current.value),
      categoryId: Number(tipo.current.value),
      guests: Number(guests.current.value),
      paisId: Number(city.current.value),
      lat: lat.current.value,
      long: long.current.value,
      published: false,
      authorId: session?.user?.id,
    };
    try {
      const response = await fetch(
        `http://localhost:3000/api/propiedad/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        addPropiedad(data.propiedad as Room);
        setIsLoading(false);
        onChangeShowModal(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form>
      <div className="grid grid-cols-2 gap-4 p-4">
        {/* name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-xs">
            Nombre
          </label>
          <input
            ref={title}
            type="text"
            name="title"
            id="title"
            placeholder="Nombre de la propiedad"
            className="bg-gray-100 focus:outline-none py-2 px-4 "
          />
        </div>
        {/* direccion */}
        <div className="flex flex-col gap-2">
          <label htmlFor="address" className="text-xs">
            Direccion
          </label>
          <input
            ref={address}
            type="text"
            name="address"
            id="address"
            placeholder="Direccion de la propiedad (Ej. Balmaceda, 124)"
            className="bg-gray-100 focus:outline-none py-2 px-4 "
          />
        </div>
        {/* description */}
        <div className="col-span-2 flex flex-col gap-2">
          <label htmlFor="description" className="text-sm">
            Descripción
          </label>
          <textarea
            ref={description}
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
              ref={tipo}
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
              ref={price}
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
              ref={guests}
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
              ref={city}
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
              ref={lat}
              type="text"
              name="lat"
              id="lat"
              placeholder="Ingrese la latitud"
              className="bg-gray-100 focus:outline-none py-2 px-4 "
            />
          </div>
          {/* personas */}
          <div className="flex flex-col gap-2">
            <label htmlFor="long" className="text-xs">
              Longitud
            </label>
            <input
              ref={long}
              type="text"
              name="long"
              id="titlongle"
              placeholder="Ingrese la longitud"
              className="bg-gray-100 focus:outline-none py-2 px-4 "
            />
          </div>
        </div>
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
          {isLoading ? <Loading /> : 'Crear Propiedad'}
        </button>
      </div>
    </form>
  );
}
