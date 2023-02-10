let snake = [0, 1, 2];
const size = 10;
const box = document.getElementById('snake-box');
const playButton = document.getElementById('playButton'); 
const score = document.getElementById('score');
const interval = 500;
let accumulator = 1;
let divs;
let idInterval;
let foodIndex;
let obstacles = [];
let scoreCount = 0;

playButton.addEventListener('click', () => {
  startGame();
});

// Movimiento de la Snake con el teclado (Estos apuntes son principalmente para no perderme y tenerlos presentes para hacer los recorderis que sean necesarios)
function startGame()  {
  // Agrego la función createBox()
  createBox();
  drawSnake();
  randomFood(); // Llamo a la función para generar la comida
  idInterval = setInterval(moveSnake, interval);
  document.addEventListener('keydown', event => {
    switch (event.key) {
      case 'ArrowLeft':
        accumulator = -1;
        break;
      case 'ArrowUp':
        accumulator = -size;
        break;
      case 'ArrowRight':
        accumulator = 1;
        break;
      case 'ArrowDown':
        accumulator = size;
        break;
    }
  });
}

function createBox() {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const div = document.createElement('div');
      box.appendChild(div);
    }
  }
}

function drawSnake() {
  divs = document.querySelectorAll('.box div');
  snake.forEach((index) => divs[index].classList.add('snake'));
}

function moveSnake() {
  const tail = snake.shift();
  divs[tail].classList.remove('snake');
  const head = snake[snake.length - 1] + accumulator;
  if (isCollision(head)) {
    clearInterval(idInterval);
    restart();
  }
  
  snake.push(head);
  divs[head].classList.add('snake');

  // comida
  eatFood(tail);
}

function eatFood(tail) {
  if (snake[snake.length - 1] === foodIndex) {
    divs[foodIndex].classList.remove('food');
    snake.unshift(tail);
    divs[tail].classList.add('snake');
    score.innerText = ++scoreCount;
    randomFood();
  }
}

function randomFood() {
  foodIndex = Math.floor(Math.random() * divs.length);
  while (snake.includes(foodIndex)) {
    foodIndex = Math.floor(Math.random() * divs.length);
  }
  divs[foodIndex].classList.add('food');
}

// Colisiones (cambié el "index" por "head"  para agregarle la lógica de detectar la cabeza de la serpiente y así colisionara consigo misma.
function isCollision(head) {
  if (head >= size * size || head < 0 || (accumulator === 1 && head % size === 0) || (accumulator === -1 && (head + 1) % size === 0) || snake.includes(head)) {
    return true;
  }
  return false;
}

function checkCollision() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0] === snake[i] || snake[0] === obstacles[i]) {
      clearInterval(idInterval);
      restart();
      return;
    }
  }
}

//Cambié la función cleargame por resetgame con base a lo nuevo, mejoras y cambios en el proceso
function resetGame() {
  scoreCount = 0;
  score.innerText = scoreCount;
  document.removeEventListener('keydown', handleKeyPress);
}

function restart() {
  alert('Game Over');
  window.location.reload();
}

