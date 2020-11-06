import React from 'react';
import Article from './Article'

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
            isFetching: false
        }
        this.fetchData = this.fetchData.bind(this)
    }

    async fetchData(){
        const { fetchNews, category } = this.props
        const techNews = await fetchNews({category})
        this.setState({techNews, isFetching:false})
    }

    componentDidMount(){
        this.setState({isFetching: true})
        this.fetchData()
    }

    componentDidUpdate(prevProps){
       if(prevProps.keyword !== this.props.keyword 
            || prevProps.category !== this.props.category 
            || prevProps.startDate !== this.props.startDate){
            this.setState({isFetching: true})
            this.fetchData()
        }
    }

    render(){
        const { isFetching, techNews: {popularNews = [], filteredNews = []} = {} } = this.state
        const { keyword} = this.props
    
        return (
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
          <div style={{width:'40%', height: '100%'}}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <p style={{fontSize:24}}>FILTERED NEWS</p>
              {keyword.length === 0 ? <p>{keyword}</p> : <div/>}
            </div>
            <div style={{overflow: 'scroll', height: '80vh'}}>
                { isFetching || !filteredNews ? 
                    (<p>Fetching data...</p>) : 
                    dataToComponents({data:filteredNews, type: 'filtered'})
                }
            </div>
          </div>
          <div style={{width:'40%', height: '100%'}}>
            <p style={{fontSize:24}}>TRENDING NEWS</p>
            <div style={{overflow: 'scroll', height: '80vh'}}>
                { isFetching || !popularNews ? 
                    (<p>Fetching data...</p>) : 
                    dataToComponents({data:popularNews, type: 'trending'})
                }
            </div>
          </div>
        </div>
        )
    }
}