const radius = 20;
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const data = [];

var context;
var count = 0;

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

    console.log(data);
  }, true);
});

const generateCyrcle = (context, positionX, positionY, radiusCyrcle, letter) => {
  if (!letter[count]) {
    alert('Fim de caracteres');
    return;
  }

  context.beginPath();
  context.imageSmoothingEnabled = true;
  context.arc(positionX - radiusCyrcle, positionY - radiusCyrcle, radiusCyrcle, 0, 2  * Math.PI);
  letter && context.strokeText(letter[count], positionX - radiusCyrcle, positionY - radiusCyrcle);
  context.stroke();

  const dataCyrcle = {
    letter: letter[count],
    x: positionX,
    y: positionX,
  }

  data.push(dataCyrcle);

  count++;
};

const clearCanvas = () => {
  context.clearRect(0, 0, screen.width, screen.height);
  data.length = 0;
  count = 0;
}
