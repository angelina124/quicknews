import React from 'react';
import Article from './Article'
import news from '../utilities/news'

const dataToComponents = ({type, data}) => (
    <ul style={{padding: 0, listStyleType: 'none'}}>
        {data.map((article, i) => 
            <li key={i}>
                <Article
                    title={article.title}
                    author={article.author}
                    description={article.description}
                    url={article.url}
                    imageSrc={article.urlToImage}
                    publishedAt={article.publishedAt}
                    type={type}
                />
            </li>
        )}
    </ul>
)

export default class Technology extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isFetching: false,
            error: {
                filtered: false,
                popular: false
            }
        }
        this.fetchData = this.fetchData.bind(this)
        this.fetchNews = this.fetchNews.bind(this)
    }

    async fetchNews({category}){
        const {sources, startDate, stopDate, keyword} = this.props
        const categorySources = sources?.[category] || ''
    
        let queryword = keyword.length === 0 ? category : keyword
        
        const popularNews = await news.fetchPopularNews({category, sources: categorySources, startDate, stopDate})
          .then((pNews) => {
            this.setState({error: {...this.state.error, popular: false}})
            return pNews
          }).catch((err) => {
            this.setState({error: {...this.state.error, popular: true}})
            return []
          })
    
        const filteredNews = await news.fetchFilteredNews({
            sources: categorySources, 
            startDate, 
            stopDate,
            keyword: queryword
          })
          .then((pNews) => {
            this.setState({error: {...this.state.error, filtered:false}})
            return pNews
          }).catch((err) => {
            this.setState({error: {...this.state.error, filtered:true}})
            return []
          })
        return {popularNews, filteredNews}
      }

    async fetchData(){
        const { category } = this.props
        const techNews = await this.fetchNews({category})
        this.setState({techNews, isFetching:false})
    }

    componentDidMount(){
        this.setState({isFetching: true})
        this.fetchData()
    }

    componentDidUpdate(prevProps){
       if(prevProps.keyword !== this.props.keyword 
            || prevProps.category !== this.props.category 
            || prevProps.startDate !== this.props.startDate
            || prevProps.stopDate !== this.props.stopDate){
            this.setState({isFetching: true})
            this.fetchData()
        }
    }

    render(){
        const { isFetching, error, techNews: {popularNews = [], filteredNews = []} = {} } = this.state
        const { keyword} = this.props
    
        return (
        <div style={{display:"flex", flexDirection:"row", justifyContent:"left"}}>
          <div style={{width:'60%', height: '100%'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <p style={{fontSize:24, marginBottom: 0}}>FILTERED NEWS</p>
              {keyword.length !== 0 ? <p>{`Keyword: ${keyword}`}</p> : <div/>}
            </div>
            <div style={{overflow: 'scroll', height: '80vh'}}>
                { isFetching || !filteredNews ? 
                    (<p>Fetching data...</p>) : 
                    (
                        error.filtered ? 
                        <p>This is embarassing! Looks like there was an error fetching your news :(</p> :
                        dataToComponents({data:filteredNews, type: 'filtered'})
                    )
                }
            </div>
          </div>
          <div style={{width:'40%', height: '100%'}}>
            <p style={{fontSize:24, marginBottom: 0}}>TRENDING NEWS</p>
            <div style={{overflow: 'scroll', height: '80vh'}}>
            { isFetching || !popularNews ? 
                    (<p>Fetching data...</p>) : 
                    (
                        error.popular ? 
                        <p>This is embarassing! Looks like there was an error fetching your news :(</p> :
                        dataToComponents({data:popularNews, type: 'popular'})
                    )
                }
            </div>
          </div>
        </div>
        )
    }
}