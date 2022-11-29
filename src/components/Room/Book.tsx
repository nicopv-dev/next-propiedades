import { useState } from 'react';
import { formatNumber } from '../../utils/methods';
import { DatePicker } from 'antd';
import Schedule from '../../interfaces/Schedule';
import type { RangePickerProps } from 'antd/es/date-picker';
import { toast } from 'react-toastify';

import Moment from 'moment';
import { useSession } from 'next-auth/react';

interface ISelectedDate {
  date: string;
  isSelected: boolean;
}

interface IBookProps {
  roomId: number;
  price: number;
  maxGuests: number;
  schedules?: Schedule[];
  addSchedule: (newSchedule: Schedule) => void;
}

export default function Book({
  roomId,
  price,
  schedules,
  addSchedule,
}: IBookProps) {
  const [selectedDate, setSelectedDate] = useState<ISelectedDate>({
    date: '',
    isSelected: false,
  });
  const { data: session } = useSession();

  // disabled dates
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    const isToday = current < Moment().endOf('day');
    const isSunday = current.day() === 0;

    // Can not select dates from schedules room
    if (schedules) {
      const isSame = schedules?.find(
        (item) =>
          Moment(item.date).format('YYYY-MM-DD') ===
          Moment(current).format('YYYY-MM-DD')
      );

      return isToday || isSunday || isSame;
    }

    return isToday || isSunday;
  };

  // set selected date from datepicker
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setSelectedDate({ date: `${dateString}T19:14:23.586Z`, isSelected: true });

    //2022-12-01T19:14:23.586Z
  };

  const solicitar = async () => {
    if (selectedDate.isSelected) {
      try {
        const data = {
          date: selectedDate.date,
          roomId: roomId,
          userId: session?.user?.id,
        };
        const response = await fetch(
          'http://localhost:3000/api/propiedad/schedule',
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
          addSchedule(data?.schedule as Schedule);
          toast.success('Hora Agendada', { autoClose: 7000 });
        }
      } catch (err) {
        console.log(err);
        toast.errorr('Error al agendar hora', { autoClose: 7000 });
      }
    }
  };

  return (
    <div className="relative my-4 xl:my-0 xl:sticky xl:top-28 xl:right-0 max-w-sm w-full shadow-lg rounded-lg flex flex-col gap-4 p-6 border border-slate-200">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">
          ${formatNumber(price)}{' '}
          <span className="font-light text-black opacity-30">/ mes</span>
        </h1>
      </div>

      <div className="flex flex-col border border-slate-200 rounded-lg divide-y relative">
        {/* datepicker */}
        <div className="px-4 py-2 flex flex-col gap-2">
          <span className="text-xs">Fecha Solicitada</span>
          <DatePicker
            onChange={onChange}
            disabledDate={disabledDate}
            placeholder="Agenda tu hora de visita"
          />
        </div>
      </div>

      {/* send form */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          className="bg-primary_dark py-2 text-white rounded-lg"
          onClick={solicitar}
        >
          SOLICITAR
        </button>
        <p className="text-xs font-light text-center">
          No se hará ningún cargo por el momento
        </p>
      </div>
    </div>
  );
}
