import './styles.css';
import gnomeImage from './assets/gnome.png';

class Game {
  constructor() {
    this.boardSize = 4;
    this.currentPosition = null;
    this.gnome = null;
    this.board = null;
    this.interval = null;
    this.moveInterval = 1000; // Интервал перемещения
  }

  init() {
    this.createBoard();
    this.createGnome();
    this.startGame();
  }

  createBoard() {
    const app = document.getElementById('app');
    this.board = document.createElement('div');
    this.board.className = 'board';

    for (let i = 0; i < this.boardSize * this.boardSize; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      this.board.appendChild(cell);
    }

    app.appendChild(this.board);
  }

  createGnome() {
    this.gnome = document.createElement('img');
    this.gnome.src = gnomeImage;
    this.gnome.className = 'gnome';
    this.moveToRandomPosition();
  }

  moveToRandomPosition() {
    // Выбираем новую позицию (не совпадающую с текущей)
    let newPosition;
    do {
      newPosition = Math.floor(Math.random() * this.boardSize * this.boardSize);
    } while (newPosition === this.currentPosition && this.boardSize * this.boardSize > 1);

    // Находим новую ячейку
    const newCell = this.board.children[newPosition];
    
    newCell.appendChild(this.gnome);
    
    this.currentPosition = newPosition;
  }

  startGame() {
    this.interval = setInterval(() => {
      this.moveToRandomPosition();
    }, this.moveInterval);
  }

  stopGame() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

// Запуск игры при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  game.init();
});