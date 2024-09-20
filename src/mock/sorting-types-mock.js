import { SortingType, EnabledSortingTypes } from '../constants.js';

function getSortingTypes() {
  return Object.values(SortingType).map((sortingType) => ({
    type: sortingType,
    isEnabled: EnabledSortingTypes.includes(sortingType)
  }));
}

export { getSortingTypes };
