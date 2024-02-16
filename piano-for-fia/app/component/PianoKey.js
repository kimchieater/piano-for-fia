import { playNote, audoC} from '../../util/audio'; 
import {useState, useEffect} from 'react';



export default function PianoKey({note, isBlack, volume, octave}){

  let keyClass =  isBlack ? "piano-key black" : "piano-key";


  const handleKeyClick = () =>{
      playNote(note, volume, octave).catch(err => console.error("Error playing note:", err));  
  }

  const handleTouchStart = (e) => {
    e.preventDefault();
    if (audioCtx.state === 'suspended') {
        audioCtx.resume().then(() => {
            console.log("AudioContext resumed!");
            playNote(note, volume, octave).catch(err => console.error("Error playing note:", err));
        });
    } else {
        playNote(note, volume, octave).catch(err => console.error("Error playing note:", err));
    }
};



  return(
    <div className={ keyClass } onClick={ handleKeyClick } onTouchStart={handleTouchStart}>
      <p>{note}</p>
    </div>
  )
}