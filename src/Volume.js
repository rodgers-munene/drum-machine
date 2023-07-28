import React, { useState } from 'react';
import './volume.css'

const Volume = () => {
    const [newVolume, setNewVolume] = useState(50);
  return (
    <div>
        <label htmlFor='vlm-slider'>
        <input
         id='vlm-slider'
          type="range"
          min={0}
          max={100}
          step={1}
          value={newVolume}
          onChange={event =>{
            setNewVolume(event.target.valueAsNumber)
          }}
          
        />
        </label>
    </div>
  )
}

export default Volume