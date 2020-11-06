import '../styles/TrendingArticle.css';

const TrendingArticle = ({source, type, title, author, description, url, publishedAt}) => (
    <div onClick={() => window.location.href = `${url}`} className='container' id='trending'>
        <p className='trending-title'>{title}</p>
        <p className='author'>{!author || author.includes('<') ? '' : author}</p>
        <p className='author'>{source.name} | <span className='date'>{new Date(publishedAt).toDateString()}</span></p>
        <p><a href={url}> -- read more -- </a></p>
    </div>
)

export default TrendingArticle
