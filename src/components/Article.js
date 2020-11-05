const Article = ({title, author, description, url, imageSrc}) => (
    <div style={{width: '95%', height: 400, textAlign: 'left', justifyContent: 'center'}}>
        <p style={{fontSize: 20, color: '#272589'}}>{title}</p>
        <p style={{fontSize: 12, color: '#A8A5A5'}}>{author}</p>
        <div style={{width: '100%', height:100}}>
            <img style={{height: '100%', width: 'auto'}} src={imageSrc} alt={""}/>
        </div>
        <p style={{width:'100%', height: 100, overflow: 'scroll'}}>{description}</p>
        <a href={url} target="_blank" rel="noreferrer">Read More...</a>
    </div>
)

export default Article
