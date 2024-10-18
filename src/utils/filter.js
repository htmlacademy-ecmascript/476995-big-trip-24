import dayjs from 'dayjs';
import { FilterType } from '../constants.js';

const isFutureFilter = (date) => {
  const currDate = dayjs();
  const targetDate = dayjs(date);

  return targetDate.isAfter(currDate);
};

const isPresentFilter = (eventPoint) => {
  const currDate = dayjs();
  const targetDateFrom = dayjs(eventPoint.dateFrom);
  const targetDateTo = dayjs(eventPoint.dateTo);

  return currDate.isAfter(targetDateFrom) && currDate.isBefore(targetDateTo);
};

const isPastFilter = (date) => {
  const currDate = dayjs();
  const targetDate = dayjs(date);

  return targetDate.isBefore(currDate);
};

const filter = {
  [FilterType.EVERYTHING]: (eventPoints) => eventPoints,
  [FilterType.FUTURE]: (eventPoints) => eventPoints.filter((eventPoint) => isFutureFilter(eventPoint.dateFrom)),
  [FilterType.PRESENT]: (eventPoints) => eventPoints.filter((eventPoint) => isPresentFilter(eventPoint)),
  [FilterType.PAST]: (eventPoints) => eventPoints.filter((eventPoint) => isPastFilter(eventPoint.dateTo)),
};

export { filter };
