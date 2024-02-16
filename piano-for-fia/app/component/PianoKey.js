import { playNote } from '../../util/audio';

export default function PianoKey({note, isBlack}){

  let keyClass =  isBlack ? "piano-key black" : "piano-key";


  const handleKeyClick = () =>{
      playNote(note).catch(err => console.error("Error playing note:", err));  
  }
  return(
    <div className={ keyClass } onClick={ handleKeyClick }>
      <p>{note}</p>
    </div>
  )
}