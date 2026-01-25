export class ProductComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(data) {
    const stockBadge = data.inStock
      ? '<span class="badge bg-success">В наличии</span>'
      : '<span class="badge bg-secondary">Нет в наличии</span>';

    return `
      <div class="card mb-3" style="max-width: 600px;">
        <div class="row g-0">
          <div class="col-md-5">
            <img src="${data.src}" class="img-fluid rounded-start"
                 style="height: 200px; object-fit: cover; object-position: center;"
                 alt="${data.title}">
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <span class="badge bg-info text-dark">${data.category}</span>
              <h5 class="card-title mt-2">${data.title}</h5>
              <p class="card-text">${data.text}</p>
              <p class="h5">${data.price}</p>
              ${stockBadge}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  render(data) {
    this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
  }
}