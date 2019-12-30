class SnakeGame {
  constructor() {
    this.start = this.start.bind(this);
    this.draw = this.draw.bind(this);
    this.move = this.move.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.createFood = this.createFood.bind(this);
    this.drawFood = this.drawFood.bind(this);
    this.checkCollision = this.checkCollision.bind(this);
  }

  start() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.tile = 10;
    this.xv = 10;
    this.yv = 0;
    this.food = this.createFood();
    this.snake = [
      { x: 150, y: 150 },
      { x: 140, y: 150 },
      { x: 130, y: 150 },
      { x: 120, y: 150 }
    ];

    setInterval(this.move, 1000 / 4);
    window.addEventListener('keyup', this.keyUpHandler);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'lightgreen';
    this.ctx.strokeStyle = 'black';

    this.snake.forEach(part => {
      this.ctx.fillRect(part.x, part.y, this.tile, this.tile);
      this.ctx.strokeRect(part.x, part.y, this.tile, this.tile);
    });

    this.drawFood();
  }

  move() {
    this.head = { x: this.snake[0].x + this.xv, y: this.snake[0].y + this.yv };
    this.snake.unshift(this.head);
    this.snake.pop();

    if (this.checkCollision(this.head, this.food)) {
      this.snake.unshift(this.food);
      this.food = this.createFood();
    }

    this.draw();
  }

  keyUpHandler(e) {
    switch (e.keyCode) {
      case 37:
        if (this.xv === 0) {
          this.xv = -this.tile;
          this.yv = 0;
        }
        break;

      case 38:
        if (this.yv === 0) {
          this.yv = -this.tile;
          this.xv = 0;
        }
        break;

      case 39:
        if (this.xv === 0) {
          this.xv = this.tile;
          this.yv = 0;
        }
        break;

      case 40:
        if (this.yv === 0) {
          this.yv = this.tile;
          this.xv = 0;
        }
        break;
    }
  }

  createFood() {
    const tempWidth = this.canvas.width / this.tile;
    const tempHeight = this.canvas.height / this.tile;
    let x = Math.floor(Math.random() * tempWidth) * this.tile;
    let y = Math.floor(Math.random() * tempHeight) * this.tile;
    return { x, y };
  }

  drawFood() {
    this.ctx.fillStyle = 'red';
    this.ctx.strokeStyle = 'black';
    this.ctx.fillRect(this.food.x, this.food.y, this.tile, this.tile);
    this.ctx.strokeRect(this.food.x, this.food.y, this.tile, this.tile);
  }

  checkCollision(coord1, coord2) {
    return coord1.x === coord2.x && coord1.y === coord2.y;
  }
}

let snakeGame = new SnakeGame();
snakeGame.start();
