import { filter } from '../utils/filter.js';

function generateFilter(events) {
  return Object.entries(filter).map(
    ([filterType, filterEvents]) => ({
      type: filterType,
      isDisabled: filterEvents(events).length === 0,
    }),
  );
}

export { generateFilter };
