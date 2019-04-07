import React from 'react';
import * as d3 from "d3";
import './style.scss' 


function getData() {
  let numItems = 20 + Math.floor(20 * Math.random())
  let data = []
  for(let i=0; i<numItems; i++) {
    data.push({
      x: Math.random(),
      y: Math.random(),
      r: Math.random(),
      color: i % 5
    })
  }
  return data
}

let colors = ['#2176ae', '#57b8ff', '#b66d0d', '#fbb13c', '#fe6847']

class Chart extends React.Component {
    constructor(props){
      super(props)
        this.state={
          data:getData()
        }

       this.handleClick=this.handleClick.bind(this) 
       this.updateStyleAndAttrs=this.update.bind(this) 
    }
    

    handleClick(){
      this.setState({
        data:getData()
      })
    }
    componentDidMount()
    {
      console.log('Mounted')
      this.update()
    }    
    componentDidUpdate()
    {
      console.log('updating')
      this.update()
    }
    
     

    update(){
      let maxRadius=50
      let xScale=d3.scaleLinear().domain([0,1]).range([0,this.props.width])
      let yScale=d3.scaleLinear().domain([0,1]).range([0,this.props.height])
      let rScale=d3.scaleLinear().domain([0,1]).range([0,maxRadius])

    let u = d3.select(this.svgEl)
      .selectAll('circle')
      .data(this.state.data)
    
    u.enter()
      .append('circle')
      .attr('cx', 0.5 * this.props.width)
      .attr('cy', 0.5 * this.props.height)
      .style('fill', '#fff')
      .merge(u)
      .transition()
      .duration(1000)
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', d => rScale(d.r))
      .style('fill', d => colors[d.color])
    
    u.exit().remove()

    }

    

    render() {
      return <div>
           <svg width={this.props.width} height={this.props.height} ref={el => this.svgEl = el}></svg>
           <div><button onClick={this.handleClick}>Update</button></div>
         </div>
}
  
}

export default Chart