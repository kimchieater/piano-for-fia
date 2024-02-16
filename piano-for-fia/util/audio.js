let audioCtx;

if (typeof window !== 'undefined') {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

async function preloadNote(note) {
    if (!audioCtx) {
        console.error('AudioContext is not available');
        return;
    }
    // Ensure the fetch API is called in a browser context as well
    if (typeof fetch !== 'undefined') {
        const response = await fetch(`/notes/${note}.wav`);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        return audioBuffer;
    }
}

let noteBuffers = {};

async function playNote(note, volume = 1, octave = 4) {
    if (!audioCtx) {
        console.error('AudioContext is not available');
        return;
    }
    const originalOctave = 4;
    const octaveShift = octave - originalOctave;
    const playbackRate = Math.pow(2, octaveShift);

    if (!noteBuffers[note]) {
        noteBuffers[note] = await preloadNote(note);
    }

    const source = audioCtx.createBufferSource();
    source.buffer = noteBuffers[note];
    source.playbackRate.value = playbackRate;

    const gainNode = audioCtx.createGain();
    gainNode.gain.value = volume;

    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    source.start(0);
}

export { playNote };