import React from 'react';
import * as d3 from 'd3';
import './style.scss' ;

class Tree extends React.Component{
   constructor(props){
       super(props)
   state={
        "name": "Top Level",
        "parent": "null",
        "children": [
          {
            "name": "Level 2: A",
            "parent": "Top Level",
            "children": [
              {
                "name": "Son of A",
                "parent": "Level 2: A"
              },
              {
                "name": "Daughter of A",
                "parent": "Level 2: A"
              }
            ]
          },
          {
            "name": "Level 2: B",
            "parent": "Top Level"
          }
        ] 
   }}

   componentDidMount(){
    console.log('Mounting Tree')
    update()    
   }
   componentDidUpdate(){
    console.log('Updating Tree')
    update()    
   }
    
 update(){
    var margin = {top: 20, right: 120, bottom: 20, left: 120},
	width = 960 - margin.right - margin.left,
	height = 500 - margin.top - margin.bottom;
	
    var i = 0,
	 duration = 750,
	 root;

    var tree = d3.layout.tree()
  	.size([height, width]);

    var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });
    
    var svg = d3.select(this.svgEl).append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
    .append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

     root = treeData[0];
     root.x0 = height / 2;
     root.y0 = 0;
  
     updateroot(root);

     d3.select(self.frameElement).style("height", "500px");  
     
     function updateroot(source) {

        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);
      
        // Normalize for fixed-depth.
        nodes.forEach(function(d) { d.y = d.depth * 180; });
      
        // Update the nodes…
        var node = svg.selectAll("g.node")
            .data(nodes, function(d) { return d.id || (d.id = ++i); });
      
        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
            .on("click", click);
      
        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
      
        nodeEnter.append("text")
            .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
            .attr("dy", ".35em")
            .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
            .text(function(d) { return d.name; })
            .style("fill-opacity", 1e-6);
      
        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
      
        nodeUpdate.select("circle")
            .attr("r", 10)
            .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
      
        nodeUpdate.select("text")
            .style("fill-opacity", 1);
      
        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
            .remove();
      
        nodeExit.select("circle")
            .attr("r", 1e-6);
      
        nodeExit.select("text")
            .style("fill-opacity", 1e-6);
      
        // Update the links…
        var link = svg.selectAll("path.link")
            .data(links, function(d) { return d.target.id; });
      
        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", function(d) {
              var o = {x: source.x0, y: source.y0};
              return diagonal({source: o, target: o});
            });
      
        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);
      
        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", function(d) {
              var o = {x: source.x, y: source.y};
              return diagonal({source: o, target: o});
            })
            .remove();
      
        // Stash the old positions for transition.
        nodes.forEach(function(d) {
          d.x0 = d.x;
          d.y0 = d.y;
        });
     }

   }

   
   render()
   {
       return  <svg width={this.props.width} height={this.props.height} ref={el => this.svgEl = el}></svg>
   }

};

export default Tree