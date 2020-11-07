import '../styles/Article.css';

const Article = ({source, title, author, description, url, imageSrc, publishedAt, hasPaywall}) => (
    <div onClick={() => window.location.href = `${url}`} className='container' id='filtered'>
        { 
        imageSrc && 
        <div className='cover-image-container'>
            <img className='cover-image' src={imageSrc} alt={""}/>
        </div> 
        }
        <p className='title'>{title}</p>
        <p className='author'>{!author || author.includes('<') ? '' : author}</p>
        <p className='author'>
            {source?.name && source.name} | <span className='date'>{new Date(publishedAt).toDateString()}</span>
        </p>
        <p>{description} <a href={url}> -- read more -- </a></p> 
        { hasPaywall && <p className='paywall'>*may have paywall</p>}
    </div>
)

export default Article
