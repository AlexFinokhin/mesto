export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  erase() {
    this._container.innerHTML = "";
  }

  addDefaultItem(element) {
    this._container.append(element);
  }

  addItem(element) {
    this._container.prepend(element);
  }
  renderItems() {
    this.erase();
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
