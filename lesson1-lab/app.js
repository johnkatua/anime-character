const btn1 = document.getElementById('button1');

let audio1 = new Audio();
audio1.src = './sounds/explode.wav';

btn1.addEventListener('click', () => audio1.play());