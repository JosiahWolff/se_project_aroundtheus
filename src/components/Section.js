export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._items.forEach(this._renderer);
  }

  addItem(data) {
    this._container.prepend(data);
  }
}
