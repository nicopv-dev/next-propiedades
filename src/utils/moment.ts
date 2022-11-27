import moment from 'moment';
// import esLocale from 'moment/locale/es';

// moment.updateLocale('es', [esLocale]);

export const formatDate = (date: Date): string =>
  moment(date).locale('es').format('DD/MM/YYYY');

export const createdAtDate = (date: string): string => {
  const aux = moment(date);

  return `${aux.format('MMM')} de ${aux.format('YYYY')}`;
};
