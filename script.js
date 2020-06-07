var context;
var radius = 10;

document.addEventListener('DOMContentLoaded', () => {
  const vertices = {
    1: [
      { x: 310, y: 310, letter: 'a'},
    ],
    2: [
      { x: 150, y: 310, letter: 'a'},
      { x: 450, y: 310, letter: 'b'},
    ],
    3: [
      { x: 310, y: 150, letter: 'a'},
      { x: 495, y: 405, letter: 'b'},
      { x: 125, y: 405, letter: 'c'},
    ],
  };

  const screen = document.querySelector('canvas');
   
  const style = window.getComputedStyle(screen);
  context = screen.getContext('2d');

  screen.width = style.width.replace('px', '');
  screen.height = style.height.replace('px', '');
  
  // Por clique no canvas
  // screen.onmousedown = (event) => {
  //   if (event.clientX + radius * 2 > screen.width || event.clientY + radius * 2 > screen.height) {
  //     alert('Fora da área! Tente novamente.');
  //     return;
  //   }

  //   generateCyrcle(context, event.clientX, event.clientY, radius, 'a');
    
  //   console.log(event.clientX - radius, event.clientY - radius)
  // }
  
  vertices[1].map(vertice => (
    generateCyrcle(context, vertice.x, vertice.y, radius, vertice.letter)
  ));

});

// Por campo e ação de botão no html
const generateCyrcle = (context, positionX, positionY, radiusCyrcle, letter) => {
  context.beginPath();
  context.arc(positionX - radius, positionY - radius, radiusCyrcle, 0, 2  * Math.PI);
  letter && context.strokeText(letter, positionX - radius * 1.2, positionY - radius * 0.8);
  context.stroke();
};
