import React from 'react'
import PropTypes from 'prop-types'
import { WrapperDropDown } from "./styles"

export default function Dropdown(props){
  const {options} = props
  console.log(options)
    return (
        <WrapperDropDown>
           <ul>{options.map(option => <li key={option.formatted}>{option.formatted}</li>)}</ul>
        </WrapperDropDown>
    )
}

Dropdown.propTypes = {
    options:PropTypes.array
}

Dropdown.defaultProps = {
    options:[]
}