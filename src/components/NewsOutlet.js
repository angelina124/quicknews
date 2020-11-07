import '../styles/NewsOutlet.css';

const Article = ({source, title, author, description, url, imageSrc, publishedAt}) => (
    <div onClick={() => window.location.href = `${url}`} className='container' id='filtered'>
        { 
        imageSrc && 
        <div className='cover-image-container'>
            <img className='cover-image' src={imageSrc} alt={""}/>
        </div> 
        }
        <p className='title'>{title}</p>
        <p className='author'>{!author || author.includes('<') ? '' : author}</p>
        <p className='author'>{source.name} | <span className='date'>{new Date(publishedAt).toDateString()}</span></p>
        <p>{description} <a href={url}> -- read more -- </a></p> 
    </div>
)

export default Article
