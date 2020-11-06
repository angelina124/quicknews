import '../styles/Article.css';

const Article = ({type, title, author, description, url, imageSrc, publishedAt}) => (
    <div onClick={() => window.location.href = `${url}`} className='container' id={type === 'filtered' ? 'filtered' : 'trending'}>
        { 
        imageSrc && 
        <div className='cover-image-container'>
            <img className='cover-image' src={imageSrc} alt={""}/>
        </div> 
        }
        <p className='title'>{title}</p>
        <p className='author'>{author}</p>
        <p className='author'>{publishedAt}</p>
        <p>{description}</p>
        <p><a href={url}>Read more...</a></p>
    </div>
)

export default Article
