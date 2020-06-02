import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import Dropdown from '../../components/DropDown'
import { API_BASE_URL, SEARCH_BY_NAME_ENDPOINT } from '../../constants'

export default function SecondStep(props){
    const {onSetPlaceSearched} = props
    const [searchedString, setSearchedString] = useState('')
    const [placeSearchedName, setPlaceSearchedName] = useState(null)
    const [options, setOptions] = useState([])
    const inputRef = useRef()
    useEffect(()=> {
        // Search Place by Name
        const fetchData = async()=>{
          if(searchedString && !placeSearchedName && searchedString === inputRef.current.value){
             
          const queryString = encodeURIComponent(searchedString)
          const response = await axios(API_BASE_URL+ SEARCH_BY_NAME_ENDPOINT + '?place_name=' + queryString)
          const data = response.data
          const {results} = data
          setOptions(results)
          }
        }
        setTimeout(()=>{fetchData()}, 200)
      }, [searchedString, inputRef, placeSearchedName])
    
    useEffect(()=>{
    if(!searchedString){
        //clean results
        setOptions([])
    }
    }, [searchedString])

    const setPlaceSearched = placeName => {
        const place = options.find(option => option['formatted']=== placeName)
        onSetPlaceSearched(place)
        //clean results
        setOptions([])
        // Set the place
        setSearchedString(place['formatted'])
        setPlaceSearchedName(place['formatted'])
    }

    const clearSearch = () => {
        setPlaceSearchedName(null)
        setOptions([])
        setSearchedString('')
    }

    return (
        <form>
         <div style={{display:'flex'}}>
            <input 
            ref={inputRef} type="text" 
            placeholder="Search the Place you wanna go..." 
            value={searchedString} onChange={(e)=>{setSearchedString(e.target.value)}}></input>
            <button onClick={clearSearch} type="button">Clear</button>
        </div>
          <Dropdown options={options.map(option => option['formatted'])} onSelectOption={setPlaceSearched} />
            {placeSearchedName && <h3>The place you have chosen is: {placeSearchedName}</h3>}
        </form>
      )
}