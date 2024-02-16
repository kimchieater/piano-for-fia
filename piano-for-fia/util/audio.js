




const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

async function preloadNote(note) {
  const response = await fetch(`/notes/${note}.wav`);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

let noteBuffers = {};

async function playNote(note, volume = 1) {
  if (!noteBuffers[note]) {
    noteBuffers[note] = await preloadNote(note);
  }

  const source = audioCtx.createBufferSource();
  source.buffer = noteBuffers[note];

  const gainNode = audioCtx.createGain();
  gainNode.gain.value = volume;

  source.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  source.start(0);

  
}

export { playNote };