import React from 'react';
import Article from './Article'
import TrendingArticle from './TrendingArticle'
import news from '../utilities/news'
import paywalls from '../constants/paywalls'

const dataToComponents = ({type, data}) => (
    <ul style={{padding: 0, listStyleType: 'none'}}>
        {data.map((article, i) => 
            <li key={i}>
                {type === 'filtered' ?
                    <Article
                        title={article.title}
                        author={article.author}
                        description={article.description}
                        url={article.url}
                        imageSrc={article.urlToImage}
                        publishedAt={article.publishedAt}
                        source={article.source}
                        hasPaywall={paywalls.sourceNames.includes(article.source.name)}
                        type={type}
                    /> :
                    <TrendingArticle
                        title={article.title}
                        author={article.author}
                        description={article.description}
                        url={article.url}
                        imageSrc={article.urlToImage}
                        publishedAt={article.publishedAt}
                        source={article.source}
                        hasPaywall={paywalls.sourceNames.includes(article.source.name)}
                        type={type}
                    />
                }
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
        this.fetchNews = this.fetchNews.bind(this)
    }

    async fetchNews(){
        const {sources, startDate, stopDate, keyword, category} = this.props
        const categorySources = sources?.[category] || {}
    
        let queryword = keyword.length === 0 ? category : `${category} ${keyword}`
        
        const popularNews = await news.fetchPopularNews({category})
          .then((pNews) => {
            this.setState({error: {...this.state.error, popular: false}})
            return pNews
          }).catch((err) => {
            this.setState({error: {...this.state.error, popular: true}})
            return []
          })
        const keys = categorySources?.idMap ? Object.keys(categorySources.idMap).filter((id) => categorySources.idMap[id] === true) : {}
    
        const filteredNews = await news.fetchFilteredNews({
            sources: keys, 
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
        this.setState({techNews: {popularNews, filteredNews}, isFetching: false})
      }


    componentDidMount(){
        this.setState({isFetching: true})
        this.fetchNews()
    }

    componentDidUpdate(prevProps){
       if(prevProps.keyword !== this.props.keyword 
            || prevProps.category !== this.props.category 
            || prevProps.startDate !== this.props.startDate
            || prevProps.stopDate !== this.props.stopDate
            || prevProps.sources !== this.props.sources){
            this.setState({isFetching: true})
            this.fetchNews()
        }
    }

    render(){
        const { isFetching, error, techNews: {popularNews = [], filteredNews = []} = {} } = this.state
        const { keyword} = this.props
    
        return (
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
          <div style={{width:'65%', height: '100%'}}>
            <div style={{display: 'flex', flexDirection: 'column', textDecoration: 'underline', textDecorationColor:'lightgray'}}>
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
          <div style={{width:'30%', height: '100%'}}>
            <div style={{display: 'flex', flexDirection: 'column', textDecoration: 'underline', textDecorationColor:'lightgray'}}>
                <p style={{fontSize:24, marginBottom: 0}}>TRENDING NEWS</p>
            </div>
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