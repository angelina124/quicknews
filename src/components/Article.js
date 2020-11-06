import '../styles/Article.css';

const Article = ({title, author, description, url, imageSrc, publishedAt}) => (
    <div onClick={() => window.location.href = `${url}`} className='container'>
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
    </div>
)

export default Article
