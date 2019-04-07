// initialize react here
import React from 'react';
import { render } from 'react-dom';

import './styles/main.scss'

import Chart from './components/bubbles'
import Tree from './components/donut/tree'


class App extends React.Component{
  render(){
    return(
      <div id='bubbles'>
       <Chart width={500} height={300}/>
      </div> 
      <div id='second'>
        <Tree width={500} height={300}/>
      </div>
    );
  }
}




render(<App/>, document.getElementById('app'));
