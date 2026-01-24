import { ProductCardComponent } from '../../components/product-card/index.js';
import { AccordionComponent } from '../../components/accordion/index.js';
import { ApiService } from '../../api.js'; // Импортируем ApiService

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.onCardClick = this.onCardClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onAddDogClick = this.onAddDogClick.bind(this);
        this.dogs = []; // Храним данные о собаках
    }

    // Заменяем локальный getData на загрузку с сервера
    async loadData() {
        try {
            this.dogs = await ApiService.getAllDogs();
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            this.dogs = [];
        }
    }

    onCardClick(event) {
        const cardId = event.target.dataset.id || event.target.closest('[data-id]')?.dataset.id;
        if (cardId) {
            window.history.pushState({ page: 'product', id: cardId }, '', `#product-${cardId}`);
            window.dispatchEvent(new Event('popstate'));
        }
    }

    async onDeleteClick(event) {
        const dogId = event.target.dataset.id;
        if (!dogId) return;
        
        if (confirm('Вы уверены, что хотите удалить эту породу?')) {
            try {
                await ApiService.deleteDog(dogId);
                // Обновляем список после удаления
                await this.render();
                alert('Порода успешно удалена!');
            } catch (error) {
                alert('Ошибка при удалении породы');
            }
        }
    }

    async onAddDogClick() {
        // Создаем форму для добавления новой собаки
        const formHtml = `
            <div class="modal fade" id="addDogModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Добавить новую породу</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="addDogForm">
                                <div class="mb-3">
                                    <label for="breed" class="form-label">Название породы</label>
                                    <input type="text" class="form-control" id="breed" required>
                                </div>
                                <div class="mb-3">
                                    <label for="description" class="form-label">Краткое описание</label>
                                    <textarea class="form-control" id="description" rows="2" required></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="fullInfo" class="form-label">Полная информация (HTML)</label>
                                    <textarea class="form-control" id="fullInfo" rows="4" required></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="image" class="form-label">Ссылка на изображение</label>
                                    <input type="text" class="form-control" id="image" 
                                           value="img/default-dog.jpg" required>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                            <button type="button" class="btn btn-primary" id="saveDogBtn">Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Добавляем модальное окно в DOM
        document.body.insertAdjacentHTML('beforeend', formHtml);
        const modal = new bootstrap.Modal(document.getElementById('addDogModal'));
        modal.show();
        
        // Обработчик сохранения
        document.getElementById('saveDogBtn').onclick = async () => {
            const breed = document.getElementById('breed').value;
            const description = document.getElementById('description').value;
            const fullInfo = document.getElementById('fullInfo').value;
            const image = document.getElementById('image').value;
            
            if (!breed || !description || !fullInfo || !image) {
                alert('Пожалуйста, заполните все поля');
                return;
            }
            
            try {
                await ApiService.addDog({
                    breed,
                    description,
                    fullInfo, // Добавляем новое поле
                    image
                });
                
                modal.hide();
                document.getElementById('addDogModal').remove();
                await this.render();
                alert('Порода успешно добавлена!');
            } catch (error) {
                alert('Ошибка при добавлении породы');
            }
        };
    }

    getAddDogFormHTML() {
        return `
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">Добавить новую породу</h5>
                    <button class="btn btn-success" id="addDogBtn">
                        <i class="bi bi-plus-circle"></i> Добавить породу
                    </button>
                </div>
            </div>
        `;
    }

    async render() {
        // Загружаем данные с сервера
        await this.loadData();
        
        this.parent.innerHTML = '';
        
        // Заголовок
        this.parent.insertAdjacentHTML('beforeend', `
            <h1 class="mb-4">🐶 Питомник "Весёлый хвост"</h1>
            <p class="lead mb-4">Выберите породу собаки для получения подробной информации</p>
        `);
        
        // Форма добавления новой собаки
        this.parent.insertAdjacentHTML('beforeend', this.getAddDogFormHTML());
        
        // Кнопка добавления
        const addBtn = this.parent.querySelector('#addDogBtn');
        if (addBtn) {
            addBtn.addEventListener('click', this.onAddDogClick);
        }
        
        // Контейнер для карточек
        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-5';
        cardsContainer.id = 'cards-container';
        this.parent.appendChild(cardsContainer);
        
        // Отрисовываем карточки из данных с сервера
        this.dogs.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col';
            cardsContainer.appendChild(col);
            
            const productCard = new ProductCardComponent(col);
            productCard.render(item, this.onCardClick, this.onDeleteClick);
        });
        
        // Добавляем аккордеон
        const accordionContainer = document.createElement('div');
        accordionContainer.className = 'mt-5';
        this.parent.appendChild(accordionContainer);
        
        const accordion = new AccordionComponent(accordionContainer);
        accordion.render();
    }
}