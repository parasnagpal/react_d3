// initialize react here
import React from 'react';
import { render } from 'react-dom';

import './styles/main.scss'

import Chart from './components/bubbles'


class App extends React.Component{
  render(){
    return(
      <div id='bubbles'>
       <Chart width={500} height={300}/>
      </div> 
    );
  }
}




render(<App/>, document.getElementById('app'));
