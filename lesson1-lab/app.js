const btn1 = document.getElementById('button1');
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

console.log(audioCtx);

let audio1 = null;
fetch('audio.txt')
  .then(response => response.text())
  .then(text => {
    audio1 = new Audio(text);
  });
// audio1.src = './sounds/explode.wav';

btn1.addEventListener('click', () => {
  audio1.play();
  audio1.addEventListener('play', () => {
    console.log('play');
  });
  audio1.addEventListener('pause', () => {
    console.log('pause');
  });
  audio1.addEventListener('ended', () => {
    console.log('ended');
  });
});

const btn2 = document.getElementById('button2');
btn2.addEventListener('click', () => {
  audio1.pause();
});