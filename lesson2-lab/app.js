let audio1 = document.getElementById('audio1');

fetch('../lesson1-lab/audio.txt')
  .then(response => response.text())
  .then(text => {
    audio1.src = text;
  });;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const container = document.getElementById('container');
const file = document.getElementById('audioFile');
const canvas = document.getElementById('canvas');
canvas.width = container.clientWidth;
canvas.height = container.clientHeight;
const ctx = canvas.getContext('2d');
let audioSource = null;
let analyser = null;

container.addEventListener('click', () => {
  audio1.play();
  audioSource = audioCtx.createMediaElementSource(audio1);
  analyser = audioCtx.createAnalyser(); // AnalyserNode 
  audioSource.connect(analyser); // connect the source to the analyser
  analyser.connect(audioCtx.destination); // connect the analyser to the destination (speaker)
  analyser.fftSize = 256; // 256 samples
  const bufferLength = analyser.frequencyBinCount; // half the FFT value
  const dataArray = new Uint8Array(bufferLength); // create an array to store the data
  const barWidth = canvas.width / bufferLength; // width of each bar
  let barHeight;
  let x = 0; // horizontal position of each bar
  function renderFrame() {
    requestAnimationFrame(renderFrame);
    x = 0;
    analyser.getByteFrequencyData(dataArray); // get frequency data and store it in dataArray
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] * 2.5;
      ctx.fillStyle = `rgb(${barHeight + 100},50,50)`;
      ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
      x += barWidth + 1;
    }
  };
  renderFrame();
});

file.addEventListener('change', () => {
  const files = file.files;
  console.log(files);
  audio1.src = URL.createObjectURL(files[0]);
  audio1.load();
  audio1.play();
});