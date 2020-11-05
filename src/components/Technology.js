import React from 'react';
import Article from './Article'

export default class Technology extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isFetching: false
        }
        this.fetchData = this.fetchData.bind(this)
    }

    async fetchData(){
        const { fetchTechNews } = this.props
        const techNews = await fetchTechNews()
        this.setState({techNews, isFetching:false})
    }

    componentDidMount(){
        this.setState({isFetching: true})
        this.fetchData()
    }

    render(){
        const {isFetching, techNews} = this.state
        console.log(techNews)
        return (
        <div style={{"flex": 1, display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
          <div style={{width:'33%'}}>
            <p>TODAY'S NEWS</p>
            <div>
                { isFetching || !techNews ? 
                    (<p>Fetching data...</p>) : 
                    <ul style={{listStyleType: 'none'}}>
                        {techNews.map((article) => 
                            <li key={article.title}>
                                <Article
                                    title={article.title}
                                    author={article.author}
                                    description={article.description}
                                    url={article.description}
                                    imageSrc={article.urlToImage}
                                />
                            </li>
                        )}
                    </ul>
                }
            </div>
          </div>
          <div>
            <p>YESTERDAY'S NEWS</p>
          </div>
          <div>
            <p>THIS WEEK'S NEWS</p>
          </div>
        </div>
        )
    }
}