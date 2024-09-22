import AbstractView from '../framework/view/abstract-view';

function createSortListTemplate() {
  return '<form class="trip-events__trip-sort  trip-sort" action="#" method="get"></form>';
}

export default class SortListView extends AbstractView {
  get template() {
    return createSortListTemplate();
  }
}
