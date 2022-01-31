import dayjs from 'dayjs';
const DATE_FORMAT = 'YYYY/MM/DD HH:mm';
const DESCRIPTION_MAX_LENGTH = 140;
const BASE_DATE = '1990-01-01';
const DateFormat = {
  DAY: 'day',
  WEEK: 'week',
  QUARTER: 'quarter',
  MONTH: 'month',
  YEAR: 'year',
  HOUR: 'hour',
  MINUTE: 'minute',
  SECOND: 'second',
  MSECOND: 'millisecond'
};

// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloat = (lowerBound, upperBound) => Math.random() * (upperBound - lowerBound) + lowerBound;

const getRandomFloatStrict = (lowerBound, upperBound, valueAfterComma) => Number((getRandomFloat(lowerBound, upperBound) + 1 / Math.pow(10, valueAfterComma + 1)).toFixed(valueAfterComma));

const getNonRepeatUintArray = (lowerBorder, upperBorder, arrayLength) => {
  const arrayTotalNumbers = [];
  const arrayRandomNumbers = [];
  let lower = Math.ceil(Math.min(Math.abs(lowerBorder), Math.abs(upperBorder)));
  const upper = Math.floor(Math.max(Math.abs(lowerBorder), Math.abs(upperBorder)));
  let totalNumbers = Math.abs(upper - lower) + 1;
  if (arrayLength && (totalNumbers >= arrayLength)) {
    while (totalNumbers--) {
      arrayTotalNumbers.push(totalNumbers + lower);
    }
    while (arrayTotalNumbers.length) {
      lower = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
      arrayRandomNumbers.push(arrayTotalNumbers[lower]);
      arrayTotalNumbers.splice(lower, 1);
    }

    return arrayRandomNumbers;
  }

  throw new Error('generateNonRepeatArray: wrong attributes');
};

const getRandomPartFromArray = (inputArray) => {
  if (Array.isArray(inputArray)) {
    const upper = getRandomInteger(1, inputArray.length);
    const lower = getRandomInteger(0, inputArray.length - 1);

    if (upper > lower) {
      return inputArray.slice(lower, upper);
    }
    return inputArray.slice(upper, lower);
  }

  return new Error('getRandomPartFromArray: inputArray is not an array');
};

const getRandomBoolean = () => Boolean(getRandomInteger(0, 1));

const getRandomDate = (dateBase = BASE_DATE, dateGap = 0, dateFormat = DATE_FORMAT) => {
  const date = dayjs(dateBase)
    .add(getRandomInteger(-dateGap, dateGap), DateFormat.DAY)
    .add(getRandomInteger(-dateGap, dateGap), DateFormat.MONTH)
    .add(getRandomInteger(-dateGap, dateGap), DateFormat.YEAR)
    .toDate();

  return dayjs(date).format(dateFormat);
};

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

const changeDateFormat = (date, format = DATE_FORMAT) => (date ? dayjs(date).format(format) : '');

export {
  getRandomInteger,
  getNonRepeatUintArray,
  getRandomPartFromArray,
  getRandomBoolean,
  getRandomDate,
  getRandomFloatStrict,
  getShortFilmDescription,
  changeDateFormat,
  getFilmDuration
};
