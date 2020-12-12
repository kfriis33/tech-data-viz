import React from "react";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav'
import Button from "@material-ui/core/Button"

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

import BarChart from "./BarChart"
import BubbleChart from "./BubbleChart"
import ScatterPlot from "./ScatterPlot"

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

import InterceptData from './data/counts/total_counts/intercept_total_counts.csv'
import VoxData from './data/counts/total_counts/vox_total_counts.csv'
import YCombData from './data/counts/total_counts/ycomb_total_counts.csv'
import AngelData from './data/counts/total_counts/angelall_total_counts.csv'
import CryptoData from './data/counts/total_counts/crypto_total_counts.csv'
import BrownData from './data/counts/total_counts/brown_total_counts.csv'
import CVData from './data/counts/total_counts/cvpaper_total_counts.csv'
import MLData from './data/counts/total_counts/mlpaper_total_counts.csv'
import DepDefData from './data/counts/total_counts/depdef_total_counts.csv'

import InterceptVerbs from './data/counts/verb_counts/intercept_verb_counts.csv'
import InterceptAdj from './data/counts/adj_counts/intercept_adj_counts.csv'

import VoxVerbs from './data/counts/verb_counts/vox_verb_counts.csv'
import VoxAdj from './data/counts/adj_counts/vox_adj_counts.csv'

import YCombVerbs from './data/counts/verb_counts/ycomb_verb_counts.csv'
import YCombAdj from './data/counts/adj_counts/ycomb_adj_counts.csv'

import AngelVerbs from './data/counts/verb_counts/angelall_verb_counts.csv'
import AngelAdj from './data/counts/adj_counts/angelall_adj_counts.csv'

import CryptoVerbs from './data/counts/verb_counts/crypto_verb_counts.csv'
import CryptoAdj from './data/counts/adj_counts/crypto_adj_counts.csv'

import BrownVerbs from './data/counts/verb_counts/brown_verb_counts.csv'
import BrownAdj from './data/counts/adj_counts/brown_adj_counts.csv'

import CVVerbs from './data/counts/verb_counts/cvpaper_verb_counts.csv'
import CVAdj from './data/counts/adj_counts/cvpaper_adj_counts.csv'

import MLVerbs from './data/counts/verb_counts/mlpaper_verb_counts.csv'
import MLAdj from './data/counts/adj_counts/mlpaper_adj_counts.csv'

import DepDefVerbs from './data/counts/verb_counts/depdef_verb_counts.csv'
import DepDefAdj from './data/counts/adj_counts/depdef_adj_counts.csv'



import NewsData from './data/counts/total_counts/news_total_counts.csv'
import CompanyData from './data/counts/total_counts/companies_total_counts.csv'
import AcademiaData from './data/counts/total_counts/academia_total_counts.csv'
import DefenseData from './data/counts/total_counts/defense_total_counts.csv'

import NewsVerbs from './data/counts/verb_counts/news_verb_counts.csv'
import CompanyVerbs from './data/counts/verb_counts/companies_verb_counts.csv'
import AcademiaVerbs from './data/counts/verb_counts/academia_verb_counts.csv'
import DefenseVerbs from './data/counts/verb_counts/defense_verb_counts.csv'

import NewsAdj from './data/counts/adj_counts/news_adj_counts.csv'
import CompanyAdj from './data/counts/adj_counts/companies_adj_counts.csv'
import AcademiaAdj from './data/counts/adj_counts/academia_adj_counts.csv'
import DefenseAdj from './data/counts/adj_counts/defense_adj_counts.csv'

import Fade from 'react-reveal/Fade';


let dataSources = [{
  "name": "The Intercept",
  "data": InterceptData,
  "verbs": InterceptVerbs,
  "adj": InterceptAdj,
  "color": '#ffa600',
  "type": "news"
},
{
  "name": "Vox",
  "data": VoxData,
  "verbs": VoxVerbs,
  "adj": VoxAdj,
  "color": '#ff6361',
  "type": "news"
},
{
  "name": "AngelList Companies",
  "data": AngelData,
  "verbs": AngelVerbs,
  "adj": AngelAdj,
  "color": '#bc5090',
  "type": "companies"
},
{
  "name": "Y-Combinator Companies",
  "data": YCombData,
  "verbs": YCombVerbs,
  "adj": YCombAdj,
  "color": '#bc5090',
  "type": "companies"
},
{
  "name": "Crypto Conference",
  "data": CryptoData,
  "verbs": CryptoVerbs,
  "adj": CryptoAdj,
  "color": '#58508d',
  "type": "academia"
},
{
  "name": "Brown CS News",
  "data": BrownData,
  "verbs": BrownVerbs,
  "adj": BrownAdj,
  "color": '#005780',
  "type": "academia"
},
{
  "name": "Computer Vision Conference",
  "data": CVData,
  "verbs": CVVerbs,
  "adj": CVAdj,
  "color": '#58508d',
  "type": "academia"
},
{
  "name": "Machine Learning Conference",
  "data": MLData,
  "verbs": MLVerbs,
  "adj": MLAdj,
  "color": '#58508d',
  "type": "academia"
},
{
  "name": "Dept of Defense News",
  "data": DepDefData,
  "verbs": DepDefVerbs,
  "adj": DepDefAdj,
  "color": '#58508d',
  "type": "defense"
},
{
  "name": "AngelList Defense Companies",
  "data": AngelData,
  "verbs": AngelVerbs,
  "adj": AngelAdj,
  "color": '#58508d',
  "type": "defense"
},
]

let aggDataSources = [
  {
    "name": "News Outlets",
    "data": NewsData,
    "verbs": NewsVerbs,
    "adj": NewsAdj,
    "color": '#58508d',
    "type": "news"
  },
  {
    "name": "Companies",
    "data": CompanyData,
    "verbs": CompanyVerbs,
    "adj": CompanyAdj,
    "color": '#58508d',
    "type": "companies"
  },
  {
    "name": "Academia",
    "data": AcademiaData,
    "verbs": AcademiaVerbs,
    "adj": AcademiaAdj,
    "color": '#58508d',
    "type": "academia"
  },
  {
    "name": "Defense",
    "data": DefenseData,
    "verbs": DefenseVerbs,
    "adj": DefenseAdj,
    "color": '#58508d',
    "type": "defense"
  },
]

let COLORS = ['#ffa600',
    '#ff6361',
    '#bc5090',
    '#58508d',
    '#005780']

    let COLORS_DICT = {"news":'#ff6e54',
    "company":'#dd5182',
    "academia":'#955196',
    "defense":"#444e86"}


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
        <BarChart source={source.name} type={source.type} data={source.data} verbData={source.verbs} adjData={source.adj}/>
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
    } else if (this.state.barGridFilter === "Academia" && item.type ==="academia") {
      return true
    } else if (this.state.barGridFilter === "Defense" && item.type ==="defense") {
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
          <h2 className="text-center mb-4">Techno-Optmism</h2>
          <div className="navbar" class="sticky-top" style={{padding: "1% 0% 1% 0%"}} bg="light" variant="light">
          <div class="container-fluid" style={{textAlign: "center"}}>
            <a class="navitem" href="#context">Context</a>
            <a class="navitem" href="#sentiment">Sentiment</a>
            <a class="navitem" href="#words">Word Counts</a>
            <a class="navitem" href="#sources">Sources</a>
          </div>
        </div>

              <div id = 'bubble-chart'>
          <BubbleChart/>
          <p className="caption">Data: most common adjectives from company mission statements</p>

        </div>
 
       <div id="context">
        <h3 >Context</h3>
        <Fade left>
        <div className="bubble">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-7">
            <p>In this project, we were interested in exploring the trend of techno-optimism, the notion that technology can continually be improved and can continually improve people’s lives and make the world a better place. From class readings and discussions throughout the semester, this notion was repeatedly debunked as we saw example after example of technologies that did more harm than good despite their “for good” framing to the public. This “for good” framing is pervasive throughout the tech community, from startups pitching ideas to VCs, to tech giants mining users’ data, to governments defending mass surveillance. We were interested in exploring these trends more formally, but initially we were not sure exactly how. We came up with the following questions to guide us:
How can trends of techno-optimism be quantified and communicated to the public?
How do the ways companies describe themselves differ from their true impact?
</p>
          </div>
          <div className="col-md-4" style={{textAlign:"right"}}>
            <h6><i>“Techno-optimism: the belief that technology and technologists are building the future and that the rest of the world, including government, needs to catch up”</i></h6>
          </div>
        </div>
        
        <div className="row justify-content-between align-items-center mt-5">
          <div className="col-md-4">
          <h6><i>“Techno-optimism has deep roots in American political culture, and its belief in American ingenuity and technological progress”</i></h6>
          </div>
          <div className="col-md-7" style={{textAlign:"right"}}>
            <p>These questions led us to focusing on the written language that pushes forward overly positive views of technology. We brainstormed various text-based data sources that might have this agenda such as company mission statements and websites, and then brainstormed text-based data sources that might provide contrast such as news articles, court cases, and academia. We created datasets for ourselves using web scraping, then used natural language processing to analyze them to find the most commonly used words, the most common verbs and adjectives, and the sentiment rating of the text as a whole. Finally, we made data visualizations of these results and displayed them on a public website. By quantifying the trends of language used by different technology stakeholders and creating visualizations of them, we sought to reveal the fluff that’s used to make technology seem like an entirely positive, world-changing good and display the dissonance between this language and technology’s true impact.</p>
          </div>
        </div>
        </div>
        </Fade>
        </div>
        <div id="sentiment">
          <h3>Sentiment Analysis</h3>
          <p>
          <span className="tab"/>
            <FiberManualRecordIcon style={{fill: COLORS_DICT["news"]}}/> News Outlets <span className="tab"/>
            <FiberManualRecordIcon style={{fill: COLORS_DICT['company']}}/> Companies <span className="tab"/>
            <FiberManualRecordIcon style={{fill: COLORS_DICT['academia']}}/> Academia <span className="tab"/>
            <FiberManualRecordIcon style={{fill: COLORS_DICT['defense']}}/> Defense 

          </p>
          <div id="scatter-plot">
          <ScatterPlot/>
          <p className="caption">Hover over data points for more info!</p>

          </div>

          <Fade left>
          <div className="bubble">
          <p>We used <a href="https://textblob.readthedocs.io/en/dev/">TextBlob</a> to analyze the sentiment of our datasets along 2 axes: polarity (x axis) and subjectivity (y axis). Polarity measures how positive or negative the text of a source is on a scale of -1 (negative) to 1 (positive).
          </p>
          <p>
            Subjectivity is measured from a scale of 0 being objective to 1 being subjective. TextBlob measures subjectivity
            partially by how many adverbs are used (assumes texts with a higher proportion of adverbs are more subjective).
          </p>
          
          <p> If you're interested in checking out the most positive and most negative news articles determined by this analysis, they are linked below!
          </p>
          

          <div className="row mx-5 mt-4 justify-content-between">
            <div className="col-md-2 py-2 border-right">
            
            </div>
            <div className="col-md-5 border-right">
            <h4>Most positive articles</h4>

            </div>
            <div className="col-md-5">
            <h4>Most negative articles</h4>

            </div>
          </div>

          <div className="row mx-5 py-2 justify-content-between border-top border-bottom">
            <div className="col-md-2 border-right">
            <strong>The Intercept</strong>
            </div>
            <div className="col-md-5 border-right">
              <ul>
                <li><a href="">Coronavirus Monitoring Bracelets Flood the Market, Ready to Snitch on People Who Don’t Distance </a>
             (Polarity: 0.3169)</li>
                <li><a href="">Surveillance Capitalism Meets the Coronavirus Shock Doctrine </a> (Polarity: 0.3169)
</li>
              </ul>
            </div>
            <div className="col-md-5">
              <ul>
                <li><a href="">Google Hedges on Promise to End Controversial Involvement in Military Drone Contract </a> (Polarity: -0.117)</li>
                <li><a href="">Google Won’t Renew Its Drone AI Contract, But It May Still Sign Future Military AI Contracts </a> (Polarity: -0.108)</li>
              </ul>
            </div>
          </div>
          <div className="row mx-5 py-2 justify-content-between">
          <div className="col-md-2 border-right">
          <strong>Vox</strong>

          </div>
            <div className="col-md-5 border-right">
              <ul>
                <li>
                <a href="">Okay, Google, how do I listen to Vox?</a>
             (Polarity: 0.227)
                </li>
                <li>       <a href="">Morning Brew, the business newsletter publisher for millennials, is in talks to sell itself to Business Insider </a> (Polarity: 0.213)</li>
              </ul>
            
            </div>
            <div className="col-md-5">
              <ul>
                <li><a href="">Civil rights leaders are still fed up with Facebook over hate speech 
</a> (Polarity: -0.06966)</li>
                <li><a href="">The messy politics of Nextdoor</a> (Polarity: 0)</li>
              </ul>
            </div>
          </div>
          </div>
          </Fade>
        </div>

        <div id="words">>
        <h3>Word Counts (aggregated)</h3>
        <br/>
        
        <GridList cellHeight={400} cols={2}>
          {aggDataSources.map(this.makeGridTile)}
        </GridList>
        </div>

        <h3> Word Counts (by Source)</h3>
        <ButtonToolbar className="toolbar">
                <p className="toolbar-text">Viewing:</p>
                <DropdownButton className="dropdown-button" id="dropdown-button" title={this.state.barGridFilter} size="sm">
                    <Dropdown.Item eventKey="All" onSelect={this.filterCharts}>All</Dropdown.Item>
                    <Dropdown.Item eventKey="News outlets" onSelect={this.filterCharts}>News Outlets</Dropdown.Item>
                    <Dropdown.Item eventKey="Companies" onSelect={this.filterCharts}>Companies</Dropdown.Item>
                    <Dropdown.Item eventKey="Academia" onSelect={this.filterCharts}>Academia</Dropdown.Item>
                    <Dropdown.Item eventKey="Defense" onSelect={this.filterCharts}>Defense</Dropdown.Item>

                </DropdownButton>
        </ButtonToolbar>
       
       <div className="bubble">
        <GridList cellHeight={400} cols={2}>
          {dataSources.filter(this.matchesGridFilter).map(this.makeGridTile)}
        </GridList>
        </div>
        {/* <div className = "row">
          <div className="col-md-6">
            <BarChart source="The Intercept" color='#ffa600' />

          </div>
          <div className="col-md-6">
            <BarChart source="The Intercept" color='#ffa600' />

          </div>
        </div> */}
        <div id="sources">
          <h3>Sources</h3>
          <li><a href="https://www.nytimes.com/2019/09/28/opinion/sunday/silicon-valley-techno-optimism.html">The Church of Techno-Optimism
</a></li>
          <li><a href="https://angel.co/all-markets">Angellist</a></li>
          <li><a href="https://www.ycombinator.com/companies/">YCombinator</a></li>
          <li><a href="https://www.vox.com/recode">Vox Recode</a></li>
          <li><a href="https://theintercept.com/technology/">The Intercept</a></li>
          <li><a href="https://www.defense.gov/Newsroom/">Department of Defense Newsroom</a></li>
          <li><a href="https://www.iacr.org/publications/access.php">International Association for Cryptologic Research Publications
</a></li>
          <li><a href="https://openaccess.thecvf.com/ICCV2019?day=2019-10-29">International Conference on Computer Vision</a></li>
          <li><a href="https://icml.cc/virtual/2020/papers.html?filter=keywords">International Conference on Machine Learning</a></li>
          <li><a href="https://cs.brown.edu/news/">Brown Computer Science News</a></li>

        </div>
      </div>
    );
  }
}

