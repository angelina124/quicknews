function Header({onCategoryChange}) {
    return (
        <div style={{display:"flex", justifyContent: "left", width: "80%"}}>
            <div style={{margin:10}} onClick={() => onCategoryChange({category: 'entertainment'})}>
                <p>Entertainment</p>
            </div>
            <div style={{margin:10}} onClick={() => onCategoryChange({category: 'sports'})}>
                <p>Sports</p>
            </div>
            <div style={{margin:10}} onClick={() => onCategoryChange({category: 'technology'})}>
                <p>Technology</p>
            </div>
        </div>
    )
}

export default Header