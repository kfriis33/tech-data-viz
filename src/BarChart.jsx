import React, { Component } from 'react'
import './App.css'

// import { scaleLinear, scaleBand } from "d3-scale"

// import { max } from 'd3-array'
// import { select } from 'd3-selection'

import * as d3 from "d3";
import FormControl from "@material-ui/core/FormControl"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormLabel from "@material-ui/core/FormLabel"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"

const margin = {top: 5, right: 40, bottom: 30, left: 110}
// width = 960 - margin.left - margin.right,
// height = 500 - margin.top - margin.bottom;

const MAX_WIDTH = Math.min(1500, window.innerWidth);
const MAX_HEIGHT = 720;

let bar_width = (MAX_WIDTH / 2) - 150, bar_height = 300;



// let COLORS = {"news":'#ff6361',
//     "companies":'#bc5090',
//     "academia":'#58508d'}
   //  '#58508d',
   //  '#005780'}

   let COLORS = {"news":'#ff6e54',
    "companies":'#dd5182',
    "academia":'#955196',
    "defense":"#444e86"}


// y axis: words
let y = d3.scaleBand()
   .range([0, bar_height - margin.top - margin.bottom])
   .padding(0.1);  // Improves readability

// x axis: word counts
let x = d3.scaleLinear()
.range([0, bar_width -margin.left - margin.right-15]);



class BarChart extends Component {
   constructor(props){
      super(props)
      this.state = {
         radioSelector:"adjectives"
      }
      this.startBar = this.startBar.bind(this)
      

   }
   componentDidMount() {
      this.startBar(COLORS[this.props.type], this.props.adjData);
   }

   componentDidUpdate() {
      let val = this.state.radioSelector;

      if (val == "all") {
         this.setData(this.props.data, COLORS[this.props.type])
      } else if (val == "verbs") {
         this.setData(this.props.verbData, COLORS[this.props.type])
      } else if (val == "adjectives") {
         this.setData(this.props.adjData, COLORS[this.props.type])
      } else {
         console.log("ERROR")
         this.setData(this.props.data, COLORS[this.props.type])
      }

   }

   startBar = (color, data) => {
      this.svg_bar = d3.select(this.refs.chart)
         .append("svg")
         .attr("width", bar_width)
         .attr("height", bar_height)
         .append("g")
         .attr("transform", `translate(${margin.left}, ${margin.top})`);

      // Set up reference to count SVG group
      this.countRef = this.svg_bar.append("g");

      this.y_axis_label = this.svg_bar.append("g")
         .style("font-size", "16px");

      this.setData(data, color)
      
   }   

   setData = (data, color) => {

      let svg = this.svg_bar
      let countRef = this.countRef
      let y_axis_label = this.y_axis_label

      d3.csv(data).then(function(data) {
         data.forEach(function(d) {
            d.count = +d.count;
         });

         data = data.slice(0,10)

         x.domain([0, d3.max(data, function(d) { return d.count; })])




         let x_axis_text = svg.append("text")
            .attr("transform", `translate(${(bar_width - margin.left - margin.right) / 2},
                     ${(bar_height - margin.top - margin.bottom) + 15})`)
            .style("text-anchor", "middle");


         // y axis: words
         y.domain(data.map(function(d) { return d.word; }));


         y_axis_label.call(d3.axisLeft(y).tickSize(0).tickPadding(10));

         let bars = svg.selectAll("rect")
            .data(data, function(d) {return d.word});
         
         bars.enter()
            .append("rect")
            .merge(bars)
            .transition()
            .duration(1000)
            .attr('fill', color)
            .attr("x", x(0))
            .attr("y", function(d) { return y(d.word); })
            .attr("width", function(d) { return x(parseInt(d.count)); })
            .attr("height",  y.bandwidth());

         let c = countRef.selectAll("text").data(data);

         // Render the text elements on the DOM
         c.enter()
            .append("text")
            .merge(c)
            .transition()
            .duration(1000)
            .attr("x", function(d) { return x(parseInt(d.count)) + 10; })       // HINT: Add a small offset to the right edge of the bar, found by x(d.count)
            .attr("y", function(d) { return y(d.word) + 17})       // HINT: Add a small offset to the top edge of the bar, found by y(d.artist)
            .style("text-anchor", "start")
            .text(function(d) { return parseInt(d.count)});

         x_axis_text.text(`# occurrences`);

         // Remove elements not in use if fewer groups in new dataset
         bars.exit().remove();
         c.exit().remove();

         }).catch(function(err) {
            throw err;
      });
   }

   updateData = event => {

      let val = event.target.value
      this.setState({
         radioSelector: val
      })

      if (val == "all") {
         this.setData(this.props.data, COLORS[this.props.type])
      } else if (val == "verbs") {
         this.setData(this.props.verbData, COLORS[this.props.type])
      } else if (val == "adjectives") {
         this.setData(this.props.adjData, COLORS[this.props.type])
      } else {
         console.log("ERROR")
      }
   }

render() {
      return (
         <div ref ="chart" className="bar-chart">
            <h4>{this.props.source}</h4>
            <div className="row justify-content-center">
            <FormControl component="fieldset">
               
            <RadioGroup row  name="gender1" value={this.state.radioSelector} onChange={this.updateData}>
               <FormControlLabel value="adjectives" control={<Radio />} label="Adjectives" />
               <FormControlLabel value="verbs" control={<Radio />} label="Verbs" />
               <FormControlLabel value="all" control={<Radio />} label="All" />

            </RadioGroup>
            </FormControl>
            </div>
         </div>

      )
   }
}
export default BarChart