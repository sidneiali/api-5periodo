document.addEventListener('DOMContentLoaded', () => {
  const radius = 10;

  const screen = document.querySelector('canvas');
  
  const style = window.getComputedStyle(screen);
  const context = screen.getContext('2d');

  screen.width = style.width.replace('px', '');
  screen.height = style.height.replace('px', '');

  // Por clique no canvas
  screen.onmousedown = (event) => {
    if (event.clientX + radius * 2 > screen.width || event.clientY + radius * 2 > screen.height) {
      alert('Fora da área! Tente novamente.');
      return;
    }
    context.beginPath();
    context.arc(event.clientX + radius, event.clientY + radius, radius, 0, 2  * Math.PI);
    context.stroke();


    console.log(event.clientX, event.clientY)
  }

  // Por campo e ação de botão no html
  const generateEdge = (context, positionX, positionY) => {
    context.beginPath();
    context.arc(positionX + radius, positionY + radius, radius, 0, 2  * Math.PI);
    context.stroke();
  }

  generateEdge(context, 10, 10)
});