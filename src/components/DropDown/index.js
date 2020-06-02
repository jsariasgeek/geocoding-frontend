import React from 'react'
import PropTypes from 'prop-types'
import { WrapperDropDown } from "./styles"

export default function Dropdown(props){
  const {options, onSelectOption} = props
    return (
        <WrapperDropDown>
           <ul>{options.map(option => <li key={option} onClick={()=>{onSelectOption(option)}}>{option}</li>)}</ul>
        </WrapperDropDown>
    )
}

Dropdown.propTypes = {
    options:PropTypes.array
}

Dropdown.defaultProps = {
    options:[]
}