const axios = require('axios').default

require('dotenv').config()
const apiKey = process.env.REACT_APP_SECRET_KEY

const fetchSources = () => {
    // To query sources
    axios.get(`https://newsapi.org/v2/sources?language=en&category=technology&apiKey=${apiKey}`)
        .then(response => {
            const sourceObjects = response.data.sources
            const sources = sourceObjects.map(source => source.id)
            return sources.join(", ")
        });
}

const getTechNews = ({sources, startDate, stopDate}) => {
   return axios.get(`https://newsapi.org/v2/everything?q=apple&language=en&from=${startDate}&to=${stopDate}&sortBy=popularity&apiKey=${apiKey}`)
        .then(response => {
            return response.data.articles
        });
}

const fetchNews = async ({category}) => {
    let today = new Date().toISOString().slice(0, 10)
    const startDate = today
    const stopDate = today
    switch(category){
        case "entertainment": return await getTechNews({startDate, stopDate})
        case "sports": return await getTechNews({startDate, stopDate}) //TODO
        case "technology": return await getTechNews({startDate, stopDate}) //TODO
        default: return await getTechNews({startDate, stopDate})
    }
}
const news = { fetchNews, fetchSources }
export default news
