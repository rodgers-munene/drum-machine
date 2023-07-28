import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Toggle from './Toggle';
import Volume from './Volume';
import Heater_1 from './Assets/Heater-1.mp3'
import Heater_2 from './Assets/Heater-2.mp3'
import Heater_3 from './Assets/Heater-3.mp3'
import Heater_4 from './Assets/Heater-4_1.mp3'
import clap from './Assets/Heater-6.mp3'
import open_hh from './Assets/Dsc_Oh.mp3'
import Kick_n_Hat from './Assets/Kick_n_Hat.mp3'
import kick from './Assets/RP4_KICK_1.mp3'
import closed_hh from './Assets/Cev_H2.mp3'
import { useEffect } from 'react'


const App = () =>{

  // event listener for key down for the keyboard buttons
  useEffect(() =>{
    document.addEventListener('keydown', (event) =>{
      let arr = ['Q','W','E','A','S','D','Z','X','C'];
      const toggleUno = document.getElementById("Power");
      if(arr.includes(event.key.toUpperCase())){
        playSound(event.key.toUpperCase());
        if(toggleUno.checked === true){
          setView(drumPads[arr.indexOf(event.key.toUpperCase())].name);
        }
      }      
    })
  });

  // setting the power button to be on by default
    useEffect(() =>{
      const toggleUno = document.getElementById("Power");
      toggleUno.checked = true
    }, []);

  // drumpads library
  const drumPads = [
    {
      keyCode: 81,
      text: "Q",
      src: Heater_1,
      name: "Heater 1"
    },
    {
      keyCode: 87,
      text: "W",
      src: Heater_2,
      name: "Heater 2"
    },
    {
      keyCode: 69,
      text: "E",
      src: Heater_3,
      name: "Heater 3"
    },
    {
      keyCode: 65,
      text: "A",
      src: Heater_4,
      name: "Heater 4"
    },
    {
      keyCode: 83,
      text: "S",
      src: clap,
      name: "Clap"
    },
    {
      keyCode: 68,
      text: "D",
      src: open_hh,
      name: "Open HH"
    },
    {
      keyCode: 90,
      text: "Z",
      src: Kick_n_Hat,
      name: "kick n' Hat"
    },
    {
      keyCode: 88,
      text: "X",
      src: kick,
      name: "Kick"
    },
    {
      keyCode: 67,
      text: "C",
      src: closed_hh,
      name: "Closed HH"
    }
  ];

  // the play sound function;
  function playSound(selector, name){
    const volumeSlider = document.getElementById("vlm-slider")
    const toggleUno = document.getElementById("Power");
    const audio = document.getElementById(selector);
    if(toggleUno.checked === true){
      audio.volume = volumeSlider.value/100
      audio.play();
      setView(name);
    }
    
  }

  

  const handleChange = () =>{
    const toggleUno = document.getElementById("Power");
    const volumeSlider = document.getElementById("vlm-slider");
    if(toggleUno.checked === true){
      setView("Volume: "+ volumeSlider.value);
    }    
  }

  useEffect(() =>{
    const volumeSlider = document.getElementById("vlm-slider")
    volumeSlider.addEventListener('input', handleChange);

    return () => {
      volumeSlider.removeEventListener('input', handleChange);
    }
  }, [])

  // resetting the display screen when the power button is turned off
  const isTrue = () => {
    const toggleUno = document.getElementById("Power");
    if(toggleUno.checked !== true){
      setView("")
    }
  }

  // the use state for setting the display
  const [view, setView] = useState("")
  
  
  return(
    <div className='container'>
      <div id='drum-machine'>
          {/* Creating the drum kit */}
          <div className='drum-kit'>
            {drumPads.map((drumPad) => <div key={drumPad.src} className='drum-pad' id={drumPad.keyCode} onClick={() =>{
              playSound(drumPad.text, drumPad.name);
            }}  >{drumPad.text}
            <audio src={drumPad.src} className='clip' id={drumPad.text}></audio>
          </div>)}
        
      </div>

          {/* Creating the two toggle buttons, the screen and, the volume button*/}

          {/* power button */}
          <div className='toggle1' onClick={isTrue}>
            <Toggle label="Power" />
          </div>

          {/* screen display */}
          <div id='display'>
            <p>{view}</p>
          </div>

          {/* volume slider */}
          <div className='volume-btn' onChange={handleChange}>
            <Volume />
          </div>


          {/* Bank button */}
          <div className='toggle2'>
            <Toggle label="Bank"/>
          </div>

          
        </div>
      </div>
  )
}

export default App;