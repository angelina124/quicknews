import './App.css';
import { Component } from 'react';
import Header from './components/Header'
import Technology from './components/Technology'
import news from './utilities/news'

class App extends Component{
  constructor(props){
    super(props)
    this.setState({isFetchingSources: false, sources: {}})
    this.fetchNewssSources = this.fetchNewsSources.bind(this)
    this.fetchTechNews = this.fetchTechNews.bind(this)
  }

  fetchNewsSources(){
    const sources = news.fetchSources()
    this.setState({sources})
  }

  async fetchTechNews(){
    const techNews = await news.fetchNews({category: "technology"})
    return techNews
  }

  componentDidMount(){
    this.fetchNewsSources()
  }

  render = () =>
    (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <body>
          <Technology fetchTechNews={this.fetchTechNews}/>
        </body>
      </div>
    )
 
}

export default App;
