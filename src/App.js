import './styles/App.css';
import { Component } from 'react';
import Header from './components/Header'
import News from './components/News'
import news from './utilities/news'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

class App extends Component{
  constructor(props){
    super(props)
    let today = new Date()
    let lastWeek = new Date(today.getTime() - (60*60*24*7*1000));
    
    this.state = {
      isFetchingsources: false, 
      startDate: lastWeek.toISOString().slice(0, 10),
      stopDate: today.toISOString().slice(0, 10),
      category: 'entertainment',
      keyword: '',
      sources: {},
      identifyPaywalls: [],
      filteredPage: 1,
      invalidStartDate: false,
      invalidStopDate: false
    }
    this.fetchNewsSources = this.fetchNewsSources.bind(this)
    this.onCategoryChange = this.onCategoryChange.bind(this)
    this.onSourceClick = this.onSourceClick.bind(this)
  }

  fetchNewsSources = async () => {
    const sources = await news.fetchSources()
    this.setState({sources})
  }

  onCategoryChange = ({category}) => {
    this.setState({category})
  }

  onSourceClick = (source) => {
    const {sources, category} = this.state
    if(sources?.[category]?.idMap){
        this.setState({
          sources : {
            ...sources,
            [category] : {
              ...sources[category],
              idMap: {
                ...sources[category].idMap,
                [source] : !sources[category].idMap[source]}
              }
            }
        })
      }
    }

  componentDidMount(){
    this.fetchNewsSources()
  }

  render = () =>
    {
      const { sources, category, startDate, stopDate, keyword, filteredPage, invalidStartDate, invalidStopDate } = this.state
      return (
        <div className="App">
          <div>
            <Header onCategoryChange={this.onCategoryChange} category={category}/>
          </div>
          <div className='content'>
            <div className='left-bar'>
              <div className='options'>
                <div className='option'>
                  <label className='option-label' htmlFor='keyword'>Enter keyword:</label>
                  <input id='keyword' type="text" onChange={(event) => { this.setState({keyword: event.target.value})}} placeholder="e.g. google"/>
                </div>
                { (invalidStartDate || invalidStopDate) && 
                  (<div className='option'>
                      <p>The date range you have specified is invalid <FontAwesomeIcon icon={faExclamationCircle}/></p>
                  </div>)
                }
                <div className='option'>
                  <label className='option-label' htmlFor='startDate'>Enter start date <br/>(yyyy-mm-dd):</label>
                  <input id='startDate' type="text" onChange={(event) => { 
                    let date = new Date(event.target.value)
                    if(!!(date.getTime())){
                      this.setState({startDate: event.target.value, invalidStartDate: false})
                    } else{
                      this.setState({invalidStartDate: true})
                    }
                  }} placeholder="e.g. 2020-09-01"/>
                </div>
                <div className='option'>
                    <label className='option-label' htmlFor='stopDate'>Enter end date <br/>(yyyy-mm-dd)</label>
                    <input id='stopDate' type="text" onChange={(event) => { 
                      let date = new Date(event.target.value)
                      let startD = new Date(startDate)
                      if(!!(date.getTime()) && date.getTime() > startD.getTime()){
                        this.setState({stopDate: event.target.value, invalidStopDate: false})
                      } else{
                        this.setState({invalidStopDate: true})
                      }
                    }} placeholder="e.g. 2020-11-06"/>
                </div>
                <div className='option'>
                    <label className='option-label' htmlFor='page-number'>Enter page number:</label>
                    <input id='page-number' type="text" onChange={(event) => { this.setState({filteredPage: event.target.value})}} placeholder="1"/>
                </div>
                </div>
                <div className='sources'>
                  {sources && sources[category] && 
                    sources[category]?.nameMap && 
                    Object.keys(sources[category].nameMap).map((source) => (
                        <div onClick={() => this.onSourceClick(source)}>
                          <p 
                            className={sources[category].idMap?.[source] === true ? 'selected-source' : 'source'}
                          >
                            {sources[category].nameMap[source]}
                          </p>
                        </div>
                        )
                      )
                    }
                </div>
              </div>
              <div className='news'>
                <News 
                  category={category} 
                  sources={sources}
                  keyword={keyword} 
                  startDate={startDate} 
                  stopDate={stopDate}
                  filteredPage={filteredPage}
                />
              </div>
            </div>
        </div>
      )
    }
 
}

export default App;
