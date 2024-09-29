import dayjs from 'dayjs';

function sortByDate(eventA, eventB) {
  return dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));
}

function sortByTime(eventA, eventB) {
  return dayjs(eventB.dateTo).diff(eventB.dateFrom, 'minutes') - dayjs(eventA.dateTo).diff(eventA.dateFrom, 'minutes');
}

function sortByPrice(eventA, eventB) {
  return eventB.basePrice - eventA.basePrice;
}

export { sortByDate, sortByTime, sortByPrice };
