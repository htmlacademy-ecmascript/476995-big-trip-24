const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DATE_FORMAT = {
  EVENT_DATE: 'MMM DD',
  EVENT_TIME: 'HH:mm',
  INPUT_DATE: 'DD/MM/YY HH:mm',
  DATEPICKER_DATE: 'd/m/y H:i'
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const UserAction = {
  ADD_EVENT: 'ADD_EVENT',
  UPDATE_EVENT: 'UPDATE_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export { EVENT_TYPES, DATE_FORMAT, SortType, FilterType, UserAction, UpdateType };
