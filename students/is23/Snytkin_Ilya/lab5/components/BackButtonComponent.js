export class BackButtonComponent {
  constructor(parent) {
    this.parent = parent;
  }

  render(onClick) {
    const btn = document.createElement('button');
    btn.className = 'btn btn-secondary mb-3';
    btn.textContent = '← Вернуться к участникам';
    btn.addEventListener('click', onClick);
    this.parent.prepend(btn);
  }
}