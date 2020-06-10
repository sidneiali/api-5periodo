const radius = 20;
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const dataCyrcle = [];
const dataLine = [];

var context;
var countCyrcle = 0;
var firtValue;
var finalValue;
var listDegree;

document.addEventListener('DOMContentLoaded', () => {
  const letter = alphabet.split('');

  const screen = document.querySelector('canvas');
  listDegree = document.querySelector('#list-degree');
  firtValue = document.querySelector('#firtValue');
  finalValue = document.querySelector('#finalValue');
  
  screen.width = 600;
  screen.height = 600;

  context = screen.getContext('2d');

  context.textAlign = "center";
  context.lineWidth = 1;
  context.textBaseline = "middle";
  context.font = `${radius}px sans serif`;

  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });

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
    degree: 0,
  }

  if (letter[countCyrcle]) {
    const li = document.createElement('li');
    li.setAttribute('id', 'li-list-degree');
    const textList = document.createTextNode(`${letter[countCyrcle]}: 0`);
    li.appendChild(textList);
    listDegree.appendChild(li); 
  }

  dataCyrcle.push(objectCyrcle);
  countCyrcle++;
  console.log('Vertice: ', dataCyrcle);
};

const generateLine = (context, startingLetter, finalLetter) => {
  var countLi = 0;
  var foundIt = false;

  const initialIndex = dataCyrcle.findIndex(cyrcle => 
    cyrcle.letter === startingLetter);

  const finalIndex = dataCyrcle.findIndex(cyrcle => 
    cyrcle.letter === finalLetter);

  if (dataLine.length >= 0) {
    for (const index in dataLine) {
      if((dataLine[index].start === startingLetter && dataLine[index].final === finalLetter) 
        || (dataLine[index].start === finalLetter && dataLine[index].final === startingLetter)) {
          foundIt = true;
        }
    }
  }

  if ((initialIndex >= 0 && finalIndex >= 0) && (initialIndex !== finalIndex) && !foundIt) {
    context.beginPath();
    context.moveTo(dataCyrcle[initialIndex].x - radius, dataCyrcle[initialIndex].y - radius);
    context.lineTo(dataCyrcle[finalIndex].x - radius, dataCyrcle[finalIndex].y - radius);
    context.stroke();
    
    const objectLine = {
      start: dataCyrcle[initialIndex].letter, 
      final: dataCyrcle[finalIndex].letter,
    }
    
    dataLine.push(objectLine);

    const liListDegree = document.querySelectorAll('#li-list-degree');
    
    dataCyrcle.map(cyrcle => {
      if ((cyrcle.letter === objectLine.start || cyrcle.letter === objectLine.final) 
      && (objectLine.start !== objectLine.final)) {
        cyrcle.degree++;
      }
      liListDegree[countLi].innerText = `${cyrcle.letter}: ${cyrcle.degree}`;
      countLi++;
    });
  }

  
  console.log('Aresta: ', dataLine);
  console.log('Vertice: ', dataCyrcle);
};

const clearCanvas = (data) => {
  context.clearRect(0, 0, screen.width, screen.height);
  dataCyrcle.map(cyrcle => listDegree.removeChild(listDegree.children[0]));
  dataCyrcle.length = 0;
  dataLine.length = 0;
  countCyrcle = 0;
  firtValue.value = '';
  finalValue.value = ''; 
};
