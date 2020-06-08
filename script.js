const radius = 20;
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

var context;
var count = 0;

document.addEventListener('DOMContentLoaded', () => {
  const letter = alphabet.split('');

  const screen = document.querySelector('canvas');
  
  screen.width = 600;
  screen.height = 600;

  context = screen.getContext('2d');

  context.textAlign = "center";
  context.lineWidth = 0.5;
  context.textBaseline = "middle";
  context.font = `${radius}px sans serif`;

  screen.addEventListener('click', (event) => {
    const clientClick = {
      x: event.clientX,
      y: event.clientY,
    };

    console.log(clientClick);

    generateCyrcle(context, clientClick.x, clientClick.y, radius, letter);
  }, true);
});

const generateCyrcle = (context, positionX, positionY, radiusCyrcle, letter) => {
  if (!letter[count]) {
    alert('Fim de caracteres');
    return;
  }

  context.beginPath();
  context.arc(positionX, positionY, radiusCyrcle, 0, 2  * Math.PI);
  letter && context.strokeText(letter[count], positionX, positionY);
  context.stroke();

  count++;
};
