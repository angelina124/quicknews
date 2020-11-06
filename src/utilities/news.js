const axios = require('axios').default

require('dotenv').config()
const apiKey = process.env.REACT_APP_SECRET_KEY
const categories = ['technology', 'sports', 'entertainment']

const fetchsources = async() => {
    let sources = {}
    for (var category of categories){
        const categorysources = await fetchCategorysources({category})
        if(typeof(categorysources) != 'undefined') sources[category] = categorysources
    }
    return sources
}

const fetchCategorysources = async({category}) => {
   // To query sources
   return axios.get(`https://newsapi.org/v2/sources?language=en&category=${category}&apiKey=${apiKey}`)
    .then(response => {
        const sourceObjects = response.data.sources
        const sources = sourceObjects.map(source => source.id)
        return sources.join(", ")
    })
    .catch((error) => [])
}

const fetchpopularNews = ({category, sources, startDate, stopDate, keyword}) => {
    let popularNews = []
    let sourcestring = sources?.length > 0 ? `&sources=${sources}` : ''
    return axios.get(`https://newsapi.org/v2/everything?language=en&q=${category}&sortBy=popularity${sourcestring}&apiKey=${apiKey}`)
            .then(response => {
                popularNews = response?.data?.articles
                return typeof(popularNews) !== 'undefined' ? popularNews : []
            });

    
}

const fetchFilteredNews = ({sources, startDate, stopDate, keyword}) => {
    let sourcestring = sources?.length > 0 ? `&sources=${sources}` : ''
    return axios.get(`https://newsapi.org/v2/everything?q=${keyword}&language=en&from=${startDate}&to=${stopDate}&sortBy=relevancy${sourcestring}&apiKey=${apiKey}`)
        .then(response => {
            let filteredArticles = response?.data?.articles
            return typeof(filteredArticles) !== 'undefined' ? filteredArticles : []
        });
}

const news = { fetchpopularNews, fetchFilteredNews, fetchsources }
export default news
