import '../styles/Header.css';

function Header({onCategoryChange, category}) {
    return (
        <div className='header'>
            <div className={category === 'entertainment' ? 'selected' : 'unselected'} onClick={() => onCategoryChange({category: 'entertainment'})}>
                <p>Entertainment</p>
            </div>
            <div className={category === 'sports' ? 'selected' : 'unselected'} onClick={() => onCategoryChange({category: 'sports'})}>
                <p>Sports</p>
            </div>
            <div className={category === 'technology' ? 'selected' : 'unselected'} onClick={() => onCategoryChange({category: 'technology'})}>
                <p>Technology</p>
            </div>
        </div>
    )
}

export default Header