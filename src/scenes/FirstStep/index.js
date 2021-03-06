import React, { useEffect, useState, Fragment } from 'react'
import CheckPicture from '../../assets/img/check.svg'
import './styles.css'
import axios from 'axios'
import { API_BASE_URL, SEARCH_BY_COORDENATES_ENDPOINT } from '../../constants'

export default function FirstStep(props){
    const {onSetUserLocation, onsetUserLocationName} = props
    const [position, setPosition] = useState(null)
    const [errorApiLocation, setErrorApiLocation] = useState(false)
    const [userLocationName, setUserLocationName] = useState('')

    useEffect(()=>{
        // get the user's location
        navigator.geolocation.getCurrentPosition((position)=>{
            setPosition(position)
            setErrorApiLocation(false)
        })
    }, [])

    useEffect(()=>{
        if(position){
            const {coords} = position
            const {latitude, longitude} = coords
            onSetUserLocation(coords)
            const getPlaceByCoordenates = async (lat, lng) => {
                const queryString = `?lat=${lat}&lng=${lng}`
                const response = await axios.get(API_BASE_URL+ SEARCH_BY_COORDENATES_ENDPOINT + queryString)
                const {data} = response
                const {results} = data
                const placeDesiredName = results[0]['formatted']
                setUserLocationName(placeDesiredName)
                onsetUserLocationName(placeDesiredName)
            }
            getPlaceByCoordenates(latitude, longitude)
        }
    }, [onSetUserLocation, onsetUserLocationName, position])

    const renderSucessPosition = () => (
        <Fragment>
            <h3>We have Your Position</h3>
        <div className="check-container"><img className="check" src={CheckPicture} alt="Check Ok"/></div>
    {userLocationName && <h4>Your Position is: {userLocationName}</h4>}
        </Fragment>
    )



    return(
        <div>
            <h2>Please Tell Us Where You are</h2>
            {!position && !errorApiLocation && <h3>In order to access to your location please click Allow!</h3>}
            {position && renderSucessPosition()}
        </div>
    )
}