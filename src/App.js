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
      startDate, stopDate, 
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
      const { category } = this.state
      return (
        <div className="App">
          <header className="App-header">
            <Header onCategoryChange={this.onCategoryChange}/>
          </header>
          <body style = {{display: 'flex', flexDirection: 'row', width: '95%', justifyContent: 'center'}}>
            <div style={{width: '20%', padding: 24}}>
              <input type="text" onChange={(event) => { this.setState({keyword: event.target.value})}} placeholder="Enter keyword: "/>
            </div>
            <div style={{width:'80%'}}>
              <Technology category={category} fetchNews={this.fetchNews} keyword={this.state.keyword}/>
            </div>
          </body>
        </div>
      )
    }
 
}

export default App;
