import React from 'react'
import PropTypes from 'prop-types'
import { WrapperDropDown } from "./styles"

export default function Dropdown(props){
    const {options} = props
    return (
        <WrapperDropDown>
            <ul>{options.map(option => <li>{option}</li>)}</ul>
        </WrapperDropDown>
    )
}

Dropdown.propTypes = {
    options:PropTypes.arrayOf(String)
}

Dropdown.defaultProps = {
    options:[]
}