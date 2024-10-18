const EventTypes = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DateFormat = {
  EVENT_DATE: 'MMM DD',
  EVENT_TIME: 'HH:mm',
  INPUT_DATE: 'DD/MM/YY HH:mm',
  DATEPICKER_DATE: 'd/m/y H:i',
  TRIP_INFO: 'D MMM',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PRESENT: 'PRESENT',
  PAST: 'PAST'
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
  INIT: 'INIT'
};

const AUTHORIZATION = 'Basic TZPk6NHiTsPq8mx';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

export { EventTypes, DateFormat, SortType, FilterType, UserAction, UpdateType, AUTHORIZATION, END_POINT };
