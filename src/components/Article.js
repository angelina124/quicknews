import '../styles/Article.css';

const Article = ({source, type, title, author, description, url, imageSrc, publishedAt}) => (
    <div onClick={() => window.location.href = `${url}`} className='container' id={type === 'filtered' ? 'filtered' : 'trending'}>
        { 
        type === 'filtered' &&
        imageSrc && 
        <div className='cover-image-container'>
            <img className='cover-image' src={imageSrc} alt={""}/>
        </div> 
        }
        <p className='title'>{title}</p>
        <p className='author'>{author}</p>
        <p className='author'>{source.name} | <span className='date'>{new Date(publishedAt).toDateString()}</span></p>
        
        {type === 'filtered' ?
         <p>{description} <a href={url}> -- read more -- </a></p> :
         <p><a href={url}> -- read more -- </a></p>
        }
        
    </div>
)

export default Article
