export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
                <div id="product-page" class="container my-5 d-flex justify-content-center">
        <div class="card" style="width: 720px;">
          <div class="row g-0">
            <div class="col-md-5 d-flex align-items-center justify-content-center p-3">
              <img class="card-img-top" src="${data.src}" alt="${data.title}" style="max-height:320px; object-fit:cover;">
            </div>

            <div class="col-md-7">
              <div class="card-body d-flex flex-column" style="min-height:320px;">
                <h5 class="card-title text-center mb-2">${data.title}</h5>
                <p class="card-text mb-3">${data.text}</p>

                <!-- Кнопка "Назад" прижата вниз с помощью mt-auto -->
                <div class="mt-auto d-flex justify-content-end">
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
            `
        )
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}