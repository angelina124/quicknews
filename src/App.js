import './styles/App.css';
import { Component } from 'react';
import Header from './components/Header'
import Technology from './components/Technology'
import news from './utilities/news'

class App extends Component{
  constructor(props){
    super(props)
    let today = new Date().toISOString().slice(0, 10)
    this.state = {
      isFetchingSources: false, 
      startDate: today,
      stopDate: today,
      category: 'entertainment',
      keyword: '',
      sources: {}
    }
    this.fetchNewsSources = this.fetchNewsSources.bind(this)
    this.fetchNews = this.fetchNews.bind(this)
    this.onCategoryChange = this.onCategoryChange.bind(this)
  }

  fetchNewsSources = async () => {
    const sources = await news.fetchSources()
    this.setState({sources})
  }

  async fetchNews({category}){
    const {sources, startDate, stopDate, keyword} = this.state
    const categorySources = sources?.[category] || ''

    let queryWord = keyword.length === 0 ? category : keyword
    const techNews = await news.fetchNews({
      hasSources: typeof(categorySources) != 'undefined', 
      sources: categorySources, 
      startDate, 
      stopDate, 
      keyword: queryWord
    })
    return techNews
  }

  onCategoryChange = ({category}) => {
    this.setState({category})
  }

  componentDidMount(){
    this.fetchNewsSources()
  }

  render = () =>
    {
      const { category, startDate, stopDate } = this.state
      return (
        <div className="App">
          <header className="App-header">
            <Header onCategoryChange={this.onCategoryChange} category={category}/>
          </header>
          <div style = {{display: 'flex', flexDirection: 'row', width: '95%', justifyContent: 'center'}}>
            <div style={{width: '10%', padding: 24}}>
              <label htmlFor='keyword'>Enter keyword:</label>
              <input id='kewyword' type="text" onChange={(event) => { this.setState({keyword: event.target.value})}} placeholder="Enter keyword: "/>
              <label htmlFor='startDate'>Enter start date (yyyy-mm-dd):</label>
              <input id='startDate' type="text" onChange={(event) => { this.setState({startDate: event.target.value})}} placeholder="Start date (yyyy-mm-dd): "/>
              <label htmlFor='stopDate'>Enter end date (yyyy-mm-dd)</label>
              <input id='stopDate' type="text" onChange={(event) => { this.setState({stopDate: event.target.value})}} placeholder="End date (yyyy-mm-dd): "/>
            </div>
            <div style={{width:'90%'}}>
              <Technology 
                category={category} 
                fetchNews={this.fetchNews} 
                keyword={this.state.keyword} 
                startDate={startDate} 
                stopDate={stopDate}
              />
            </div>
          </div>
        </div>
      )
    }
 
}

export default App;
