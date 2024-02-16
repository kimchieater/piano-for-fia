'use client'

import { useState, useEffect } from "react";
import KeyMapping from "./noteKeys/notekeys";
import PianoKey from './component/PianoKey';
import { playNote } from '../util/audio';

export default function Home() {



  let [volume, setVolume] = useState(100);
  let [octave, setOctave] = useState(4);
  let [keyActive, setKeyActive] = useState(false);


  let webAudioVolume = volume / 100;

  let black = "black";

  const handleOctaveChange = (e) =>{
    setOctave(Number(e.target.value));
  }

  useEffect(()=>{
    const handleKeyPress = (event) =>{
      const key = event.key;
      const noteBase = KeyMapping[key];
      playNote(noteBase, webAudioVolume, octave);
    };

  window.addEventListener('keydown', handleKeyPress);
  

  return () => {
    window.removeEventListener('keydown', handleKeyPress);
  }
  }, [octave, volume]);


  return (
    <div className="main">
      <div className="piano-bg">
        <div className="fia"><h5>Please try to remember that books aren't always an escape; sometimes books teach us things. They show us the world; they don't hide it.</h5>
        <h4>-Everything I Know About Love-</h4>
        </div>
        
        <div className="piano-container">
              <div className="piano-adjust">
                {/* adjust section where client can adjust volumne, level of octaves*/}
                  <label className="label-volume">
                    <h3>Volume</h3>
                    <input type="range" className="volume" min="0" max="100" value={volume} onChange={(e) => setVolume(e.target.value)}></input>
                  </label>
                    <h3>Fia Clare Proffitt</h3>
                    <lable className="label-volume">
                    <h3>Octaves</h3>
                    <select className="octave" value={octave} onChange={handleOctaveChange}>
                      {[...Array(7)].map((a,i) => (
                        <option key={i} value={i+1}>
                          {i+1}
                        </option>
                      ))}
                    </select>
                  </lable>
                  
                  
            </div>
          <div className="piano-note">
            
            {/* client can play piano by pressing a certain key on keyboard, or touch on mobile */}
            <PianoKey note="C" isBlack={false} volume={webAudioVolume} octave={octave}></PianoKey>
            <PianoKey note="CS" isBlack={true} volume={webAudioVolume} octave={octave}></PianoKey>
            <PianoKey note="D" isBlack={false} volume={webAudioVolume} octave={octave}></PianoKey>
            <PianoKey note="DS" isBlack={true} volume={webAudioVolume} octave={octave}></PianoKey>
            <PianoKey note="E" isBlack={false} volume={webAudioVolume} octave={octave}></PianoKey>
            <PianoKey note="F" isBlack={false} volume={webAudioVolume} octave={octave}></PianoKey>
            <PianoKey note="FS" isBlack={true} volume={webAudioVolume} octave={octave}></PianoKey>
            <PianoKey note="G" isBlack={false} volume={webAudioVolume} octave={octave}></PianoKey>
            <PianoKey note="GS" isBlack={true} volume={webAudioVolume} octave={octave} ></PianoKey>
            <PianoKey note="A" isBlack={false} volume={webAudioVolume} octave={octave}></PianoKey>
            <PianoKey note="AS" isBlack={true} volume={webAudioVolume} octave={octave}></PianoKey>
            <PianoKey note="B" isBlack={false} volume={webAudioVolume} octave={octave}></PianoKey>
            <PianoKey note="CH" isBlack={false} volume={webAudioVolume} octave={octave}></PianoKey>
            <PianoKey note="CHS" isBlack={true} volume={webAudioVolume} octave={octave}></PianoKey>
            <PianoKey note="DH" isBlack={false} volume={webAudioVolume} octave={octave}></PianoKey>
            <PianoKey note="DHS" isBlack={true} volume={webAudioVolume} octave={octave}></PianoKey>
            <PianoKey note="EH" isBlack={false} volume={webAudioVolume} octave={octave}></PianoKey>
            
          </div>
        </div>
      </div>
    </div>
  );
}
