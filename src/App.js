import React, { useState, useEffect } from 'react'
import './App.css'
import FirstStep from './scenes/FirstStep'
import SecondStep from './scenes/SecondStep'
import ThirdStep from './scenes/ThirdStep'
function App() {

  
  const [step, setStep] = useState(1)
  const [stepCompleted, setStepCompleted] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [userLocationName, setUserLocationName] = useState(null)
  const [plaseSearched, setPlaceSearched] = useState(null)

  

  useEffect(()=>{
    // validate steps
    switch(step){
      case 1:
        // here we need to have the user location in order to go further
        if(!userLocation){
            setStepCompleted(false)
        }else{
            setStepCompleted(true)
          }
        break
      case 2:
        if(!setPlaceSearched){
          setStepCompleted(false)
        }         
        else{
          setStepCompleted(true)
        }
        break
      default:
        break
    }
    

  }, [step, userLocation])

  const goToNextStep = ()=>{
    if(step < 3){
      const nextStep = step + 1
    setStep(nextStep)
    }else{
      setStep(1) // start again
    }
    
  }
  
  return (
    <div className="container">
      <div className="form-container">
        <h1>Welcome to GeoCoding App</h1>
        <h1>Step {step}</h1>
        {step === 1 && <FirstStep onSetUserLocation={setUserLocation} onsetUserLocationName={setUserLocationName}/>}
        {step === 2 && <SecondStep onSetPlaceSearched={setPlaceSearched} />}
        {step === 3 && <ThirdStep startPlace={userLocation} startPlaceName={userLocationName} endPlace={plaseSearched}/>}
        <div className="button-next-container">
  <button className="next-Button"  disabled={!stepCompleted} onClick={goToNextStep}>{step < 3 ? 'Next' : 'Start Again'}</button>
        </div>
    </div>
    </div>
  )

  }
  

export default App;
