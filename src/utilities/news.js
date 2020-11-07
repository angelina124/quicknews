const axios = require('axios').default

require('dotenv').config()
const apiKey = process.env.REACT_APP_SECRET_KEY
const categories = ['technology', 'sports', 'entertainment']

const fetchSources = async() => {
    let sources = {}

    for (var category of categories){
        const categorySources = await fetchCategorySources({category})
        
        const idMap = {}
        const nameMap = {}

        for(var i in categorySources.ids){
            nameMap[categorySources.ids[i]] = categorySources.names[i]
            idMap[categorySources.ids[i]] = true
        }

        if(typeof(categorySources) != 'undefined') 
            sources[category] = { idMap,  nameMap }
    }
    return sources
}

const fetchCategorySources = async({category}) => {
   // To query sources
   return axios.get(`https://newsapi.org/v2/sources?language=en&category=${category}&apiKey=${apiKey}`)
    .then(response => {
        const sourceObjects = response.data.sources
        const ids = sourceObjects.map(source => source.id)
        const names = sourceObjects.map(source => source.name)
        return { ids, names }
    })
    .catch((error) => [])
}

const fetchPopularNews = async ({category}) => {
    let popularNews = []
    return axios.get(`https://newsapi.org/v2/top-headlines?language=en&country=us&category=${category}&apiKey=${apiKey}`)
            .then(response => {
                popularNews = response?.data?.articles
                return typeof(popularNews) !== 'undefined' ? popularNews : []
            });

    
}

const fetchFilteredNews = async ({sources, startDate, stopDate, keyword, filteredPage}) => {
    let sourceString = sources?.length > 0 ? `&sources=${sources.join(", ")}` : ''
    return axios.get(`https://newsapi.org/v2/everything?q=${keyword}&language=en&page=${filteredPage}&from=${startDate}&to=${stopDate}&sortBy=relevancy${sourceString}&apiKey=${apiKey}`)
        .then(response => {
            let filteredArticles = response?.data?.articles
            return typeof(filteredArticles) !== 'undefined' ? filteredArticles : []
        })
}

const news = { fetchPopularNews, fetchFilteredNews, fetchSources }
export default news
