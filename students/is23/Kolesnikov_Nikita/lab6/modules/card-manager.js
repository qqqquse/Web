export class CardManager {
    constructor(parent, CardClass) {
        this.parent = parent;   
        this.CardClass = CardClass;  
        this.cards = [];             
        this.handleCardClick = null; 
    }

    setCards(cardsData) {
        this.cards = cardsData;
        this.render();
    }

    addCard(cardData) {
        this.cards.push(cardData);
        this.render();
    }

    removeCard(cardId) {
        this.cards = this.cards.filter(c => c.id !== cardId);
        this.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.cards.forEach(cardData => {
            const card = new this.CardClass(this.parent);
            card.render(cardData, () => {
                if (this.handleCardClick) this.handleCardClick(null, cardData);
            });
        });
    }
}