import React from 'react';
import logo from './logo.svg';
import './App.css';
import Profile from './Components/Profile.js'
import {textoNormal, textoTitulo, fundo} from './Components/stylesProfile'


function App() {
  return (
    <div className="App" style={fundo()}>
      <Profile/>
    </div>
  );
}

export default App;
