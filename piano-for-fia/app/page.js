'use client'


import { useState } from "react";
import PianoKey from './component/PianoKey';
export default function Home() {

  let black = "black";

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
                    <input type="range" className="volume" min="0" max="100"></input>
                  </label>
                    <lable className="label-volume">
                    <h3>Octaves</h3>
                    <select className="octave">
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
            <PianoKey note="C" isBlack={false}></PianoKey>
            <PianoKey note="CS" isBlack={true}></PianoKey>
            <PianoKey note="D" isBlack={false}></PianoKey>
            <PianoKey note="DS" isBlack={true}></PianoKey>
            <PianoKey note="E" isBlack={false}></PianoKey>
            <PianoKey note="F" isBlack={false}></PianoKey>
            <PianoKey note="FS" isBlack={true}></PianoKey>
            <PianoKey note="G" isBlack={false}></PianoKey>
            <PianoKey note="GS" isBlack={true}></PianoKey>
            <PianoKey note="A" isBlack={false}></PianoKey>
            <PianoKey note="AS" isBlack={true}></PianoKey>
            <PianoKey note="B" isBlack={false}></PianoKey>
            <PianoKey note="CH" isBlack={false}></PianoKey>
            <PianoKey note="CHS" isBlack={true}></PianoKey>
            <PianoKey note="DH" isBlack={false}></PianoKey>
            <PianoKey note="DHS" isBlack={true}></PianoKey>
            <PianoKey note="EH" isBlack={false}></PianoKey>
            
          </div>
        </div>
      </div>
    </div>
  );
}
