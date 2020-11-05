const axios = require('axios').default

require('dotenv').config()
const apiKey = process.env.REACT_APP_SECRET_KEY
const categories = ['technology', 'sports', 'entertainment']

const fetchSources = async() => {
    let sources = {}
    for (var category of categories){
        const categorySources = await fetchCategorySources({category})
        if(typeof(categorySources) != 'undefined') sources[category] = categorySources
    }
    return sources
}

const fetchCategorySources = async({category}) => {
   // To query sources
   return axios.get(`https://newsapi.org/v2/sources?language=en&category=${category}&apiKey=${apiKey}`)
    .then(response => {
        const sourceObjects = response.data.sources
        const sources = sourceObjects.map(source => source.id)
        return sources.join(", ")
    })
    .catch((error) => [])
}

const fetchNews = ({hasSources, sources, startDate, stopDate, keyword}) => {
    let todayArticles = []
    let customizedArticles = []
    let today = new Date().toISOString().slice(0, 10)
    let sourceString = sources?.length > 0 ? `&sources=${sources}` : ''
    return axios.get(`https://newsapi.org/v2/everything?q=technology&language=en&from=${today}&to=${today}&sortBy=popularity${sourceString}&apiKey=${apiKey}`)
            .then(response => {
                todayArticles = response.data.articles
                    return axios.get(`https://newsapi.org/v2/everything?q=${keyword}&language=en&from=${startDate}&to=${stopDate}&sortBy=popularity${sourceString}&apiKey=${apiKey}`)
                    .then(res => {
                        customizedArticles = res.data.articles
                        return {todayArticles, customizedArticles}
                    });
            });
}

const news = { fetchNews, fetchSources }
export default news
