export class ProductCardComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(data) {
    return `
      <div class="card" style="width: 300px;">
        <img src="${data.src}" class="card-img-top" alt="${data.title}"
             style="height: 200px; object-fit: cover; object-position: center;">
        <div class="card-body">
          <span class="badge bg-success">${data.category}</span>
          <h5 class="card-title mt-2">${data.title}</h5>
          <p class="card-text">${data.text}</p>
          <p class="text-muted">${data.price}</p>
          <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
        </div>
      </div>
    `;
  }

  addListeners(data, listener) {
    document.getElementById(`click-card-${data.id}`).addEventListener("click", listener);
  }

  render(data, listener) {
    this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
    this.addListeners(data, listener);
  }
}