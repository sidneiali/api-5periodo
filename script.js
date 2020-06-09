const radius = 20;
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const dataCyrcle = [];
const dataLine = [];

var context;
var countCyrcle = 0;

document.addEventListener('DOMContentLoaded', () => {
  const letter = alphabet.split('');

  const screen = document.querySelector('canvas');
  
  screen.width = 600;
  screen.height = 600;

  context = screen.getContext('2d');

  context.textAlign = "center";
  context.lineWidth = 1;
  context.textBaseline = "middle";
  context.font = `${radius}px sans serif`;

  screen.addEventListener('click', (event) => {
    const clientClick = {
      x: event.clientX,
      y: event.clientY,
    };

    if (event.ctrlKey) {
      clearCanvas();
      return;
    }

    generateCyrcle(context, clientClick.x, clientClick.y, radius, letter);

    console.log(dataCyrcle);
  }, true);
});

const generateCyrcle = (context, positionX, positionY, radiusCyrcle, letter) => {
  if (!letter[countCyrcle]) {
    alert('Fim de caracteres');
    return;
  }

  context.beginPath();
  context.imageSmoothingEnabled = true;
  context.arc(positionX - radiusCyrcle, positionY - radiusCyrcle, radiusCyrcle, 0, 2  * Math.PI);
  letter && context.strokeText(letter[countCyrcle], positionX - radiusCyrcle, positionY - radiusCyrcle);
  context.stroke();

  const objectCyrcle = {
    letter: letter[countCyrcle],
    x: positionX,
    y: positionY,
  }

  dataCyrcle.push(objectCyrcle);

  countCyrcle++;
};

const generateLine = (context, startingPosition, finalPosition) => {
  const initialIndex = dataCyrcle.findIndex(cyrcle => 
    cyrcle.letter === startingPosition);

  const finalIndex = dataCyrcle.findIndex(cyrcle => 
    cyrcle.letter === finalPosition);

  if ( initialIndex >= 0 && finalIndex >= 0 && initialIndex !== finalIndex ) {
    context.beginPath();
    context.moveTo(dataCyrcle[initialIndex].x - radius, dataCyrcle[initialIndex].y - radius);
    context.lineTo(dataCyrcle[finalIndex].x - radius, dataCyrcle[finalIndex].y - radius);
    context.stroke();

    const objectLine = {
      start: dataCyrcle[initialIndex].letter, 
      final: dataCyrcle[finalIndex].letter,
    }
  
    dataLine.push(objectLine);
  }
  console.log(dataLine);
}

const clearCanvas = () => {
  context.clearRect(0, 0, screen.width, screen.height);
  dataCyrcle.length = 0;
  countCyrcle = 0;
}
