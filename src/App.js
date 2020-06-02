import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Dropdown from './components/DropDown'
import { SEARCH_BY_NAME_ENDPOINT, API_BASE_URL } from './constants'
import axios from 'axios'
function App() {

  const [options, setOptions] = useState([])
  const [searchedString, setSearchedString] = useState('')

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

  return (
    <div className="container">
      <div className="form-container">
        <h1>Welcome to GeoCoding App</h1>
        <form>
        <input ref={inputRef} type="text" placeholder="Search the Place you wanna go..." value={searchedString} onChange={(e)=>{setSearchedString(e.target.value)}}></input>
       <Dropdown options={options} />
      </form></div>
    </div>    
  )
}

export default App;
