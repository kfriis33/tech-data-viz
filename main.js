// // Add your JavaScript code here
// const MAX_WIDTH = Math.max(1080, window.innerWidth);
// const MAX_HEIGHT = 720;
// const margin = {top: 40, right: 100, bottom: 40, left: 175};

// // Assumes the same graph width, height dimensions as the example dashboard. Feel free to change these if you'd like
// let bar_width = (MAX_WIDTH / 2) - 10, bar_height = 400;


// let graph_2_width = (MAX_WIDTH / 2) +10, graph_2_height = 400;
// // Declare svg_graph with width and height
// let graph_3_width = MAX_WIDTH / 2, graph_3_height = 575;

const margin = {top: 30, right: 20, bottom: 30, left: 80},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

const MAX_WIDTH = Math.max(1080, window.innerWidth);
const MAX_HEIGHT = 720;

let graph_1_width = (MAX_WIDTH / 2) - 150, graph_1_height = 400;



let BUBBLES_WIDTH = 1200, BUBBLES_HEIGHT = 700;

// location to centre the bubbles
const centre = { x: BUBBLES_WIDTH/2, y: BUBBLES_HEIGHT/2 };



let dataSources = [{
    "name": "The Intercept",
    "path": './data/word_counts.csv',
    "div_id": '#bar1'
  },
  {
    "name": "Vox",
    "path": './data/word_counts_vox.csv',
    "div_id": '#bar2'
  },
  {
    "name": "The Intercept",
    "path": './data/word_counts.csv',
    "div_id": '#bar3'
  },
  {
    "name": "The Intercept",
    "path": './data/word_counts.csv',
    "div_id": '#bar4'
  }
]

let COLORS = ['#ffa600',
    '#ff6361',
    '#bc5090',
    '#58508d',
    '#003f5c']