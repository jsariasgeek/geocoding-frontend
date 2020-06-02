import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Dropdown from './components/DropDown'
import { SEARCH_BY_NAME_ENDPOINT, API_BASE_URL } from './constants'
import axios from 'axios'
import FirstStep from './scenes/FirstStep'
function App() {

  const [options, setOptions] = useState([])
  const [searchedString, setSearchedString] = useState('')
  const [step, setStep] = useState(1)
  const [stepCompleted, setStepCompleted] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const inputRef = useRef()

  useEffect(()=> {
    // Search Place by Name
    const fetchData = async()=>{
      if(searchedString && searchedString === inputRef.current.value){
      const queryString = encodeURIComponent(searchedString)
      const response = await axios(API_BASE_URL+ SEARCH_BY_NAME_ENDPOINT + '?place_name=' + queryString)
      const data = response.data
      const {results} = data
      console.log(results)
      setOptions(results)
      }
    }
    setTimeout(()=>{fetchData()}, 200)
  }, [searchedString, inputRef])

  useEffect(()=>{
    if(!searchedString){
      //clean results
      setOptions([])
    }
  }, [searchedString])

  const validateStep = () => {
    if(step === 1){
      // here we need to have the user location in order to go further
      if(!userLocation){
        setStepCompleted(false)
      }
    }    
  }


  const renderSecondStep = ()=> (
    <form>
      <input ref={inputRef} type="text" placeholder="Search the Place you wanna go..." value={searchedString} onChange={(e)=>{setSearchedString(e.target.value)}}></input>
      <Dropdown options={options} />
    </form>
  )

  const renderResult = () => {

  }
  
  return (
    <div className="container">
      <div className="form-container">
        <h1>Welcome to GeoCoding App</h1>
        <h1>Step {step}</h1>
        {step === 1 && <FirstStep/>}
        {step === 2 && renderSecondStep()}
        {step === 2 && renderResult()}
        <div className="button-next-container" disabled={!stepCompleted}><button className="next-Button">Next</button></div>
    </div>    
    </div>    
  )

  }
  

export default App;
