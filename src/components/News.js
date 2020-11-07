import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Article from './Article'
import TrendingArticle from './TrendingArticle'
import news from '../utilities/news'
import paywalls from '../constants/paywalls'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const dataToComponents = ({type, data}) => (
    <ul style={{padding: 0, listStyleType: 'none'}}>
        {data.map((article, i) => {
            return <li key={i}>
                {type === 'filtered' ?
                    <Article
                        title={article.title}
                        author={article.author}
                        description={article.description}
                        url={article.url}
                        imageSrc={article.urlToImage}
                        publishedAt={article.publishedAt}
                        source={article.source}
                        hasPaywall={article?.source?.name && paywalls.sourceNames.includes(article.source.name)}
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
                        hasPaywall={article?.source?.name && paywalls.sourceNames.includes(article.source.name)}
                        type={type}
                    />
                }
            </li>
        })}
    </ul>
)

export default class News extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isFetching: false,
            error: {
                filtered: false,
                popular: false
            },
            articles: {
              popularNews: [],
              filteredNews: []
            }
        }
        this.fetchNews = this.fetchNews.bind(this)
    }

    fetchNews = async () => {
        const {sources, startDate, stopDate, keyword, category, filteredPage} = this.props
        const categorySources = sources?.[category] || {}
    
        let queryword = keyword.length === 0 || !keyword ? category : `${category} ${keyword}`
        
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
            keyword: queryword,
            filteredPage
          })
          .then((pNews) => {
            this.setState({error: {...this.state.error, filtered:false}})
            return pNews
          }).catch((err) => {
            this.setState({error: {...this.state.error, filtered:true}, filteredPage: 0})
            return []
          })
        this.setState({
          articles: {
            popularNews: popularNews,
            filteredNews: filteredNews
          },
          isFetching: false
        })
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
            || prevProps.sources !== this.props.sources
            || prevProps.filteredPage !== this.props.filteredPage){
            this.setState({isFetching: true})
            this.fetchNews()
        }
    }

    render(){
        const { isFetching, error, articles: {popularNews = [], filteredNews = []} = {} } = this.state
        const { keyword, filteredPage } = this.props

        return (
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
          <div style={{width:'65%', height: '100%'}}>
            <div style={{display: 'flex', flexDirection: 'column', textDecoration: 'underline', textDecorationColor:'lightgray'}}>
              <p style={{fontSize:24, marginBottom: 0}}>FILTERED NEWS</p>
              {keyword.length !== 0 ? <p>{`Keyword: ${keyword}`}</p> : <div/>}
              <p>{`page: ${filteredPage}`}</p>
            </div>
            <div style={{overflow: 'scroll', height: '80vh'}}>
                { 
                  filteredNews.length === 0 ?
                  <div>
                    <p>
                      Unable to fetch articles. Please double-check your search parameters.
                      <FontAwesomeIcon icon={faExclamationCircle}/>
                    </p>
                  </div> :
                  (isFetching  ? 
                    (<p>Fetching data...</p>) : 
                    (
                        error.filtered ? 
                        <p>
                          This is embarassing! Looks like there was an error fetching your news
                          <FontAwesomeIcon icon={faExclamationCircle}/>
                        </p> :
                        <div>
                          {dataToComponents({data:filteredNews, type: 'filtered'})}
                        </div>
                    )
                  )
                }
            </div>
          </div>
          <div style={{width:'30%', height: '100%'}}>
            <div style={{display: 'flex', flexDirection: 'column', textDecoration: 'underline', textDecorationColor:'lightgray'}}>
                <p style={{fontSize:24, marginBottom: 0}}>TRENDING NEWS</p>
            </div>
            <div style={{overflow: 'scroll', height: '80vh'}}>
            { isFetching || popularNews.length === 0 ? 
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