const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const up = document.querySelector('#up');
const left = document.querySelector('#left');
const right = document.querySelector('#right');
const down = document.querySelector('#down');

let canvasSize;
let elementsSize;

const playerPosition = {
  x: undefined,
  y: undefined,
};

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  };

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  elementsSize = canvasSize / 10;

  startGame();
};

function startGame() {
  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'end';
  
  const mapRow = maps[0].trim().split('\n');
  const mapRowCols = mapRow.map(item => item.trim().split(''));
  
  game.clearRect(0,0,canvasSize,canvasSize);
  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

      if (col === 'O') {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log(playerPosition)
        }
      }

      game.fillText(emoji, posX, posY)
    })
  });

  movePlayer();
}

function movePlayer() {
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

window.addEventListener('keydown', moveByKeys);
up.addEventListener('click', moveUp);
left.addEventListener('click',moveLeft);
right.addEventListener('click', moveRight);
down.addEventListener('click', moveDown);

function moveByKeys(event) {
  if (event.key == 'ArrowUp') moveUp();
  else if (event.key == 'ArrowLeft') moveLeft();
  else if (event.key == 'ArrowRight') moveRight();
  else if (event.key == 'ArrowDown') moveDown();
};

function moveUp() {
  console.log('ARRIBA!!');
  if ((playerPosition.y - elementsSize) < elementsSize) {
    console.log('OUT');
  } else {
    playerPosition.y -= elementsSize;
    startGame();
  };
}
function moveLeft() {
  console.log('IZQUIERDA!!');
  if ((playerPosition.x - elementsSize) < elementsSize) {
    console.log('OUT');
  } else {
    playerPosition.x -= elementsSize;
    startGame();
  };
}
function moveRight() {
  console.log('DERECHA!!');
  if ((playerPosition.x + elementsSize) > canvasSize) {
    console.log('OUT');
  } else {
    playerPosition.x += elementsSize;
    startGame();
  };
};

function moveDown() {
  console.log('ABAJO!!');
  if ((playerPosition.y + elementsSize) > canvasSize) {
    console.log('OUT');
  } else {
    playerPosition.y += elementsSize;
    startGame();
  };
};
