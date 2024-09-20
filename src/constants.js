const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DATE_FORMAT = {
  EVENT_DATE: 'MMM DD',
  EVENT_TIME: 'HH:mm',
  INPUT_DATE: 'DD/MM/YY HH:mm'
};

const SortingType = {
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

const EnabledSortingTypes = [ SortingType.DAY, SortingType.TIME, SortingType.PRICE ];

export { EVENT_TYPES, DATE_FORMAT, SortingType, EnabledSortingTypes, FilterType };
