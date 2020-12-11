import React, { Component } from 'react'
import './App.css'

import * as d3 from "d3";
import BubbleData from './data/counts/adj_counts/companies_adj_counts.csv'

const margin = {top: 30, right: 20, bottom: 30, left: 100}

const MAX_WIDTH = Math.max(1080, window.innerWidth);
const MAX_HEIGHT = 720;

let BUBBLES_WIDTH = 1200, BUBBLES_HEIGHT = 630;

// location to centre the bubbles
const centre = { x: window.innerWidth/2 -50, y: BUBBLES_HEIGHT/2 };

let COLORS_BUBBLE = ['#ffa600',
    '#ff6e54',
    '#dd5182',
    '#955196',
    '#444e86']



class BubbleChart extends Component {
   constructor(props){
      super(props)
      this.startBubble = this.startBubble.bind(this)

   }
   componentDidMount() {
      this.startBubble();
   }
   componentDidUpdate() {
      this.startBubble();
   }

   startBubble = () => {      

    let svg = d3.select(this.refs.chart)
        .append('svg')
        .attr('width', BUBBLES_WIDTH)
        .attr('height', BUBBLES_HEIGHT)

    d3.csv(BubbleData).then(function(data) {

        // strength to apply to the position forces
        const forceStrength = 0.03;
        
        // these will be set in createNodes and chart functions
        let bubbles = null;
        let labels = null;
        let nodes = [];

        // create a force simulation and add forces to it
        const simulation = d3.forceSimulation()
            .force('charge', d3.forceManyBody().strength(d => Math.pow(d.radius, 2.0) * 0.01))
            // .force('center', d3.forceCenter(centre.x, centre.y))
            .force('x', d3.forceX().strength(forceStrength).x(centre.x))
            .force('y', d3.forceY().strength(forceStrength*2).y(centre.y))
            .force('collision', d3.forceCollide().radius(d => d.radius + 1));

        // force simulation starts up automatically, which we don't want as there aren't any nodes yet
        simulation.stop();

        // set up colour scale
        const fillColour = d3.scaleOrdinal()
            .domain(["1", "2", "3", "4", "5"])
            .range(COLORS_BUBBLE);

        let rawData = data.slice(0,40)


        // data manipulation function takes raw data from csv and converts it into an array of node objects
        // each node will store data and visualisation values to draw a bubble
        // rawData is expected to be an array of data objects, read in d3.csv
        // function returns the new node array, with a node for each element in the rawData input
    
        // use max size in the data as the max in the scale's domain
        // note we have to ensure that size is a number
        const maxSize = d3.max(rawData, d => +d.count);

        // size bubbles based on area
        const radiusScale = d3.scaleSqrt()
            .domain([0, maxSize])
            .range([0, 80])

        // use map() to convert raw data into node data
        nodes = rawData.map(d => ({
            ...d,
            radius: radiusScale(+d.count),
            size: +d.count,
            x: Math.random() * 900,
            y: Math.random() * 800
        }))

        // callback function called after every tick of the force simulation
        // here we do the actual repositioning of the circles based on current x and y value of their bound node data
        // x and y values are modified by the force simulation
        const ticked = () => {
            bubbles
                .attr('cx', d => d.x)
                .attr('cy', d => d.y)

            labels
                .attr('x', d => d.x)
                .attr('y', d => d.y)
        }


        // bind nodes data to circle elements
        const elements = svg.selectAll('.bubble')
            .data(nodes, d => d.word)
            .enter()
            .append('g')

        bubbles = elements
            .append('circle')
            .classed('bubble', true)
            .attr('r', d => d.radius)
            .attr('fill', d => fillColour(d.group))

        // labels
        labels = elements
            .append('text')
            .attr('dy', '.3em')
            .style('text-anchor', 'middle')
            .style('font-size', 14)
            .text(d => d.word)

        // set simulation's nodes to our newly created nodes array
        // simulation starts running automatically once nodes are set
        simulation.nodes(nodes)
            .on('tick', ticked)
            .restart();

         }).catch(function(err) {
            throw err;
      });
   }


render() {
      return (
         <div ref ="chart">
         </div>

      )
   }
}
export default BubbleChart