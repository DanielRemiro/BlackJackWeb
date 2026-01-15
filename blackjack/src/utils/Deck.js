const SUITS = ["♠", "♥", "♦", "♣"];
const VALUES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export class Deck {
  constructor() {
    this.cards = [];
    this.reset();
  }

  // Genera y baraja
  reset() {
    this.cards = [];
    for (let suit of SUITS) {
      for (let value of VALUES) {
        this.cards.push({ suit, value });
      }
    }
    this.shuffle();
  }

  // Algoritmo Fisher-Yates
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  // Sacar una carta
  draw() {
    return this.cards.pop();
  }

  // Obtener estado actual (para React)
  getCards() {
    return [...this.cards];
  }
}