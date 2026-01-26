export class SortFilterComponent {
    constructor(root, onChange) {
        this.root = root;
        this.onChange = onChange;
    }
    render(currentSort) {
        this.root.innerHTML = `
      <div class="mb-3">
        <label for="sortSelect" class="form-label">Сортировка:</label>
        <select id="sortSelect" class="form-select">
          <option value="id_asc" ${currentSort === 'id_asc' ? 'selected' : ''}>По ID (возрастание)</option>
          <option value="id_desc" ${currentSort === 'id_desc' ? 'selected' : ''}>По ID (убывание)</option>
          <option value="time_asc" ${currentSort === 'time_asc' ? 'selected' : ''}>По времени вступления (сначала старые)</option>
          <option value="time_desc" ${currentSort === 'time_desc' ? 'selected' : ''}>По времени вступления (сначала новые)</option>
        </select>
      </div>
    `;
        const select = this.root.querySelector('#sortSelect');
        select.addEventListener('change', () => {
            const value = select.value;
            this.onChange(value === '' ? undefined : value);
        });
    }
}
