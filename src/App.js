import './styles/App.css';
import { Component } from 'react';
import Header from './components/Header'
import Technology from './components/Technology'
import news from './utilities/news'

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
      sources: {}
    }
    this.fetchNewssources = this.fetchNewssources.bind(this)
    this.fetchNews = this.fetchNews.bind(this)
    this.onCategoryChange = this.onCategoryChange.bind(this)
  }

  fetchNewssources = async () => {
    const sources = await news.fetchsources()
    this.setState({sources})
  }

  async fetchNews({category}){
    const {sources, startDate, stopDate, keyword} = this.state
    const categorysources = sources?.[category] || ''
    console.log(startDate)
    console.log(category)
    console.log(categorysources)

    let queryword = keyword.length === 0 ? category : keyword
    console.log(queryword)
    const popularNews = await news.fetchpopularNews({
      category,
      sources: categorysources, 
      startDate, 
      stopDate
    })

    const filteredNews = await news.fetchFilteredNews({
      sources: categorysources, 
      startDate, 
      stopDate,
      keyword: queryword
    })
    return {popularNews, filteredNews}
  }

  onCategoryChange = ({category}) => {
    this.setState({category})
  }

  componentDidMount(){
    this.fetchNewssources()
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
            <div className='options'>
              <div className='option'>
                <label className='option-label' htmlFor='keyword'>Enter keyword:</label>
                <input id='keyword' type="text" onChange={(event) => { this.setState({keyword: event.target.value})}} placeholder="Enter keyword: "/>
              </div>
              <div className='option'>
                <label className='option-label' htmlFor='startDate'>Enter start date (yyyy-mm-dd):</label>
                <input id='startDate' type="text" onChange={(event) => { this.setState({startDate: event.target.value})}} placeholder="Start date (yyyy-mm-dd): "/>
              </div>
              <div className='option'>
                  <label className='option-label' htmlFor='stopDate'>Enter end date (yyyy-mm-dd)</label>
                  <input id='stopDate' type="text" onChange={(event) => { this.setState({stopDate: event.target.value})}} placeholder="End date (yyyy-mm-dd): "/>
              </div>
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
