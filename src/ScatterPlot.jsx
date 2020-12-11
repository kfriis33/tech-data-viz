import React, {Component} from "react";
import { scaleLinear } from "d3-scale";
import {extent} from "d3-array"
import * as d3 from "d3";
import d3Tip from "d3-tip";
import ScatterData from './data/counts/sentiments.csv'

let COLORS = {"news":'#ff6e54',
    "company":'#dd5182',
    "academia":'#955196',
    "defense":"#444e86"}

    // let COLORS_BUBBLE = ['#ffa600',
    // '#ff6e54',
    // '#dd5182',
    // '#955196',
    // '#444e86']

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
        var margin = {top: 10, right: 30, bottom: 50, left: 60},
        width = 860 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        let svg_scatter = d3.select(div_id)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        let tooltip = d3.select(div_id)
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        //Read the data
        d3.csv(ScatterData).then(function(data) {

            // data.forEach(function(d) {
            //     d.subjectivity = +d.subjectivity;
            //     d.polarity = +d.polarity;
            // });


            console.log(data)
            // Add X axis
            var x = d3.scaleLinear()
                .domain([-1, 1])
                .range([ 0, width ]);
                
            svg_scatter.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // Add Y axis
            var y = d3.scaleLinear()
                .domain([0, 1])
                .range([ height, 0])

                
            svg_scatter.append("g")
                .attr("transform", "translate(" + x.range()[1] / 2 + ", 0)")
                .call(d3.axisLeft(y));

            // Add dots
            var dots = svg_scatter.append("g")
                .selectAll("dot")
                .data(data)
            
            const mouseover = (event, d) => {
                console.log("mouseover")
                console.log("event", event)
                console.log("pointer", d3.pointer(event))
                let color_span = `<span style="color: #69b3a2;">`;


                let html = `<h5 style="color:${COLORS[d.type]}">${d.source}</h5>
                            <span>Polarity: ${parseFloat(d.polarity).toFixed(2)} </span><br/>
                            <span>Subjectivity: ${parseFloat(d.subjectivity).toFixed(2)} </span>`;

            
                // Show the tooltip and set the position relative to the event X and Y location
                tooltip      
                .html(html)
                    .style("left", `${(event.pageX)}px`)
                    .style("top", `${(event.pageY) +5}px`)
                    .style("box-shadow", `2px 2px 5px gray`)
              
                    .transition()
                    .duration(200)
                    .style("opacity", 0.9)
            };
    
            const mouseout = (event, d) => {
                console.log("mouseout")
            tooltip.style('opacity', 0);
            }
    


            dots.enter()
                .append("circle")
                // .attr("id", "circleBasicTooltip")
                .attr("cx", (d)=> x(d.polarity))
                .attr("cy", (d) => y(d.subjectivity))
                .attr("r", 8)
                .style("fill", (d)=>COLORS[d.type])
                .attr("class", "sDot")
                .on("mouseout", mouseout)
                .on("mouseover", mouseover);

                // .append("title")
                // .text("hello");

            svg_scatter.append("text")
                .attr("transform", `translate(${(width) / 2},
                            ${(height) + 40})`)
                .style("text-anchor", "middle")
                .text("Polarity");

            svg_scatter.append("text")
                .attr("transform", `translate(0, ${(height) / 2})rotate(-90)`)       // HINT: Place this at the center left edge of the graph
                .style("text-anchor", "middle")
                .text("Subjectivity");
                
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
            <div id="tooltip"/>
         </div>
        )
    }
}



export default ScatterPlot

