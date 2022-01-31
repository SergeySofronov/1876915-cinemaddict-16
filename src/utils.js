import dayjs from 'dayjs';
import { DateFormatStyle } from './const';
const DESCRIPTION_MAX_LENGTH = 140;

const getShortFilmDescription = (filmDescription) => {
  if (filmDescription?.length >= DESCRIPTION_MAX_LENGTH) {
    return `${filmDescription.slice(0, DESCRIPTION_MAX_LENGTH - 1)}...`;
  }

  return filmDescription;
};

const getFilmDuration = (durationInMinutes) => {
  const hours = dayjs.duration(durationInMinutes, 'minutes').$d.hours;
  const minutes = dayjs.duration(durationInMinutes, 'minutes').$d.minutes;
  return `${hours ? hours : ''}${hours ? 'h' : ''} ${minutes ? minutes : '00'}m`;
};

const changeDateFormat = (date, format = DateFormatStyle.DEFAULT) => (date ? dayjs(date).format(format) : '');

export {
  getShortFilmDescription,
  changeDateFormat,
  getFilmDuration
};
