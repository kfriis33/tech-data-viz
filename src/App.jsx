import React from "react";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "@material-ui/core/Button"

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

import BarChart from "./BarChart"
import BubbleChart from "./BubbleChart"
import ScatterPlot from "./ScatterPlot"

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import InterceptData from './data/counts/total_counts/intercept_total_counts.csv'
import VoxData from './data/counts/total_counts/vox_total_counts.csv'
import YCombData from './data/counts/total_counts/ycomb_total_counts.csv'
import AngelData from './data/counts/total_counts/defense_total_counts.csv'
import CryptoData from './data/counts/total_counts/crypto_total_counts.csv'
import BrownData from './data/counts/total_counts/brown_total_counts.csv'
import CVData from './data/counts/total_counts/cvpaper_total_counts.csv'
import MLData from './data/counts/total_counts/mlpaper_total_counts.csv'
import DepDefData from './data/counts/total_counts/depdef_total_counts.csv'


let dataSources = [{
  "name": "The Intercept",
  "data": InterceptData,
  "color": '#ffa600',
  "type": "news"
},
{
  "name": "Vox",
  "data": VoxData,
  "color": '#ff6361',
  "type": "news"
},
{
  "name": "Y-Combinator Companies",
  "data": YCombData,
  "color": '#bc5090',
  "type": "companies"
},
{
  "name": "AngelList Defense Companies",
  "data": AngelData,
  "color": '#58508d',
  "type": "companies"
},
{
  "name": "Crypto Conference",
  "data": CryptoData,
  "color": '#58508d',
  "type": "academia"
},
{
  "name": "Brown CS News",
  "data": BrownData,
  "color": '#005780',
  "type": "academia"
},
{
  "name": "Computer Vision Conference",
  "data": CVData,
  "color": '#58508d',
  "type": "academia"
},
{
  "name": "Machine Learning Conference",
  "data": MLData,
  "color": '#58508d',
  "type": "academia"
},
{
  "name": "Dept of Defense News",
  "data": DepDefData,
  "color": '#58508d',
  "type": "academia"
},
]
let COLORS = ['#ffa600',
    '#ff6361',
    '#bc5090',
    '#58508d',
    '#005780']



export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      barGridFilter:"All"
    }
  }

  makeGridTile = (source) => {
    return (
      <GridListTile>
        <BarChart source={source.name} type={source.type} data={source.data} />
      </GridListTile>
    )
  }

  // Helper function for displaying the dropdown titles
  getTitle = (filterName, filterVal) => {
    return filterName+" ("+filterVal+")"
  }


  matchesGridFilter = item => {
    if(this.state.barGridFilter === "All")  {
        return true
    } else if (this.state.barGridFilter === "News outlets" && item.type ==="news") {
        return true
    } else if (this.state.barGridFilter === "Companies" && item.type ==="companies") {
      return true
    } else {
        return false
    }
  }

  filterCharts = event => {
    this.setState({
      barGridFilter: event
    })
  }

  render() {
    return (
      <div>
        <div className="mt-5">
          <h2 className="text-center">Techno-Optmism</h2>
          <p className="text-center mx-5">The belief that technology can continually be improved and can improve the lives of people, making the world a better place.</p>
     
        </div>
        <div id = 'bubble-chart'>
          <BubbleChart/>
        </div>
       
        <div className="row">
          <div className="col-md-7 mt-5">
            <p>We were interested in comparing how technology is spoken about in different spheres: companies, news outlets, academia, and the government. To explore this, we scraped websites and articles from each of these categories to aggregate all of the text-based language that was used, and then found the most commonly used words in each. We cleaned out very common words such as 'the' and then took the top 10 most common words to visualize below:</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5"></div>
          <div className="col-md-7 mt-5" style={{textAlign:"right"}}>
            <p>We were interested in comparing how technology is spoken about in different spheres: companies, news outlets, academia, and the government. To explore this, we scraped websites and articles from each of these categories to aggregate all of the text-based language that was used, and then found the most commonly used words in each. We cleaned out very common words such as 'the' and then took the top 10 most common words to visualize below:</p>
          </div>
        </div>

        <div>
          <ScatterPlot/>
        </div>

        <h3>Word Counts by Source</h3>
        <ButtonToolbar className="toolbar">
                <p className="toolbar-text">Viewing:</p>
                <DropdownButton className="dropdown-button" id="dropdown-button" title={this.state.barGridFilter} size="sm">
                    <Dropdown.Item eventKey="All" onSelect={this.filterCharts}>All</Dropdown.Item>
                    <Dropdown.Item eventKey="News outlets" onSelect={this.filterCharts}>News Outlets</Dropdown.Item>
                    <Dropdown.Item eventKey="Companies" onSelect={this.filterCharts}>Companies</Dropdown.Item>
                    <Dropdown.Item eventKey="Academic papers" onSelect={this.filterCharts}>Academic papers</Dropdown.Item>
                </DropdownButton>
        </ButtonToolbar>
       
        <GridList cellHeight={500} cols={2}>
          {dataSources.filter(this.matchesGridFilter).map(this.makeGridTile)}
        </GridList>
        {/* <div className = "row">
          <div className="col-md-6">
            <BarChart source="The Intercept" color='#ffa600' />

          </div>
          <div className="col-md-6">
            <BarChart source="The Intercept" color='#ffa600' />

          </div>
        </div> */}
      </div>
    );
  }
}

