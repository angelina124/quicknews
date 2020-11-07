import '../styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faFootballBall, faCode } from '@fortawesome/free-solid-svg-icons'

function Header({onCategoryChange, category}) {
    return (
        <div className='header'>
            <div className={category === 'entertainment' ? 'selected' : 'unselected'} onClick={() => onCategoryChange({category: 'entertainment'})}>
                <p className='tab-title'>Entertainment <FontAwesomeIcon icon={faFilm} size="sm"/></p>
            </div>
            <div className={category === 'sports' ? 'selected' : 'unselected'} onClick={() => onCategoryChange({category: 'sports'})}>
                <p className='tab-title'>Sports <FontAwesomeIcon icon={faFootballBall} size="sm"/></p>
            </div>
            <div className={category === 'technology' ? 'selected' : 'unselected'} onClick={() => onCategoryChange({category: 'technology'})}>
                <p className='tab-title'>Technology <FontAwesomeIcon icon={faCode} size="sm"/></p>
            </div>
        </div>
    )
}

export default Header