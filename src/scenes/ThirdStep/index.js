import React, { Fragment, useEffect, useState } from 'react'
import { API_BASE_URL, GET_DISTANCE_ENDPOINT } from '../../constants'
import axios from 'axios'

export default function ThirdStep(props){
    const {startPlace, startPlaceName, endPlace} = props
    const [distance, setDistance] = useState('')

    useEffect(()=>{
        const getDistanceBetweenPlaces = async ()=> {
            const latStartPlace = startPlace.latitude
            const lngStartPlace = startPlace.longitude
            const latEndPlace = endPlace.geometry.lat
            const lngEndPlace = endPlace.geometry.lng
            const queryStringStartPlace = `?lat_start_place=${latStartPlace}&lng_start_place=${lngStartPlace}`
            const queryStringEndPlace = `&lat_end_place=${latEndPlace}&lng_end_place=${lngEndPlace}`
            const response = await axios(API_BASE_URL+ GET_DISTANCE_ENDPOINT + queryStringStartPlace + queryStringEndPlace)
            const data = response.data
            const {result} = data
            setDistance(result)
        }  
        getDistanceBetweenPlaces()      
    }, [endPlace.geometry.lat, endPlace.geometry.lng, startPlace.latitude, startPlace.longitude])

    return (
    <Fragment>
        <h3>The place where you are is : {startPlaceName}</h3>    
    <h3>The place you have chosen is: {endPlace.formatted}</h3>    
    <h3>The distance between the two Places is: {distance && parseInt(distance) + 'km'}</h3>
    </Fragment>)
}