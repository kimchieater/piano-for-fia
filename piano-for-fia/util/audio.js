let audioCtx;

// Ensure the AudioContext is only created if in a browser environment
if (typeof window !== 'undefined') {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

// A map to hold preloaded note buffers
let noteBuffers = {};

// Preload a note and store it in the noteBuffers map
async function preloadNote(note) {
    if (!audioCtx) {
        console.error('AudioContext is not available');
        return null;
    }

    // Check if the note is already preloaded
    if (noteBuffers[note]) {
        return noteBuffers[note];
    }

    // Fetch and decode the note buffer
    try {
        const response = await fetch(`/notes/${note}.wav`);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

        // Store the decoded buffer for future use
        noteBuffers[note] = audioBuffer;
        return audioBuffer;
    } catch (err) {
        console.error('Error preloading note:', err);
        return null;
    }
}

// Function to play a note
async function playNote(note, volume = 1, octave = 4) {
    if (!audioCtx) {
        console.error('AudioContext is not available');
        return;
    }

    // Adjust the note name for the octave
    const noteName = `${note}${octave}`;

    // Ensure the note is preloaded
    const audioBuffer = await preloadNote(noteName);
    if (!audioBuffer) {
        console.error('Note buffer is not available:', noteName);
        return;
    }

    // Create a buffer source and set its buffer to the preloaded note buffer
    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;

    // Create a gain node for volume control
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = volume;

    // Connect the source to the gain node and the gain node to the destination
    source.connect(gainNode).connect(audioCtx.destination);

    // Start playback
    source.start(0);
}

export { playNote, audioCtx };