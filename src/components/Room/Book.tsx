import { useState } from 'react';
import { formatNumber } from '../../utils/methods';
import { DatePicker } from 'antd';
import Schedule from '../../interfaces/Schedule';
import type { RangePickerProps } from 'antd/es/date-picker';

import Moment from 'moment';

interface ISelectedDate {
  date: Date;
  isSelected: boolean;
}

interface IBookProps {
  price: number;
  maxGuests: number;
  schedules?: Schedule[];
}

export default function Book({ price, schedules }: IBookProps) {
  const [selectedDate, setSelectedDate] = useState<ISelectedDate>({
    date: new Date(),
    isSelected: false,
  });

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
    console.log(date, dateString);
  };

  const solicitar = () => {
    console.log(selectedDate);
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
