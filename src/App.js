import React from 'react';
import './App.css';
import { DropDown } from './styles';
import Dropdown from './components/DropDown';

function App() {

  const options = [
    'First Option',
    'Second Option',
    'Third Option',
    'Fourth Option',
  ]

  return (
    <div className="container">
      <div className="form-container">
        <h1>Welcome to GeoCoding App</h1>
        <form>
        <input type="text" placeholder="Search the Place you wanna go..."></input>
       <Dropdown options={options} />
      </form></div>
    </div>    
  )
}

export default App;
