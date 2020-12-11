import React, {Component} from "react";
import { scaleLinear } from "d3-scale";
import {extent} from "d3-array"
import * as d3 from "d3";
import d3Tip from "d3-tip";
import ScatterData from './data/counts/sentiments.csv'

let COLORS = {"news":'#ff6361',
    "company":'#bc5090',
    "academia":'#58508d'}

// Scatterplot
class ScatterPlot extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        this.startScatter(this.refs.scatterChart);
    }
    // Whenever the component updates, select the <g> from the DOM, and use D3 to manipulte circles
    componentDidUpdate() {
        this.startScatter(this.refs.scatterChart);
    }
 
    startScatter = (div_id) => {
        // set the dimensions and margins of the graph
        var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 860 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        let svg_scatter = d3.select(div_id)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        //Read the data
        d3.csv(ScatterData).then(function(data) {

            // data.forEach(function(d) {
            //     d.subjectivity = +d.subjectivity;
            //     d.polarity = +d.polarity;
            // });


            console.log(data)
            // Add X axis
            var x = d3.scaleLinear()
                .domain([0, 1])
                .range([ 0, width ]);
            svg_scatter.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // Add Y axis
            var y = d3.scaleLinear()
                .domain([0, 1])
                .range([ height, 0]);
                
            svg_scatter.append("g")
                .call(d3.axisLeft(y));

            // Add dots
            var dots = svg_scatter.append("g")
                .selectAll("dot")
                .data(data)

            dots.enter()
                .append("circle")
                // .attr("id", "circleBasicTooltip")
                .attr("cx", (d)=> x(d.polarity))
                .attr("cy", (d) => y(d.subjectivity))
                .attr("r", 8)
                .style("fill", (d)=>COLORS[d.type])
                .attr("class", "sDot")
                .append("title")
                .text("hello");

            // svg_scatter.selectAll("text")
            //     .data(data)
            //     .enter()
            //     .append("text")

            // create a tooltip
            // var tooltip = d3.select(div_id)
            //     .append("div")
            //     .style("position", "absolute")
            //     .style("visibility", "hidden")
            //     .text("I'm a circle!");
            // d3.select("#circleBasicTooltip")
            // .on("mouseover", function(){return tooltip.style("visibility", "visible");})
            // // .on("mousemove", function(){return tooltip.style("top", (event.pageY-800)+"px").style("left",(event.pageX-800)+"px");})
            // .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
        })

    }
    render() {
        return (
            <div ref ="scatterChart">
            
         </div>
        )
    }
}



export default ScatterPlot

