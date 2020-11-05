import '../styles/Article.css';

const Article = ({title, author, description, url, imageSrc}) => (
    <div className='container'>
        <div className='text'>
            <p className='title'>{title}</p>
            <p className='author'>{author}</p>
            <p>{description}</p>
        </div>
        { 
        imageSrc && 
        <div className='cover-image-container'>
            <img className='cover-image' src={imageSrc} alt={""}/>
        </div> 
        }
    </div>
)

export default Article
