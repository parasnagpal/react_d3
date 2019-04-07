import React from 'react';
import * as d3 from "d3";


function getData()
{
    if(Math.random() > .5){
        return Math.round(Math.random()*100);
    } else {
        return (Math.random()*100).toFixed(1);
    }
}

class Donut extends React.Component{
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
        const salesData=[
            {label:"Basic", color:"#3366CC"},
            {label:"Plus", color:"#DC3912"},
            {label:"Lite", color:"#FF9900"},
            {label:"Elite", color:"#109618"},
            {label:"Delux", color:"#990099"}
        ];
        
        const svg = d3.select(this.svgEl).append("svg").attr("width",700).attr("height",300);
        
        svg.append("g").attr("id","salesDonut");
        svg.append("g").attr("id","quotesDonut");
        
        Donut3D.draw("salesDonut", randomData(), 150, 150, 130, 100, 30, 0.4);
        Donut3D.draw("quotesDonut", randomData(), 450, 150, 130, 100, 30, 0);
            
        function changeData(){
            Donut3D.transition("salesDonut", randomData(), 130, 100, 30, 0.4);
            Donut3D.transition("quotesDonut", randomData(), 130, 100, 30, 0);
        }
        
        function randomData(){
            return salesData.map(function(d){ 
                return {
                    label:d.label, 
                    value:1000*Math.random(), 
                    color:d.color
                };
            });
        }
        changeData()
      }


      render() {
        return <div>
             <svg width={this.props.width} height={this.props.height} ref={el => this.svgEl = el}></svg>
             <div><button onClick={this.handleClick}>Update</button></div>
           </div>
           }
      

};

export default Donut