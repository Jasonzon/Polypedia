import "../styles/Header.css"
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className="header">
            <h1 className="title">Polypedia</h1>
            <nav className="nav">
                <Link className="link" to="/">Accueil</Link>
                <Link className="link" to="/lists">Listes</Link>
                <Link className="link" to="/cities">Villes</Link>
                <Link className="link" to="/themes">Themes</Link>
                <Link className="link" to="/colors">Couleurs</Link>
                <Link className="link" to="/user">Mon Compte</Link>
            </nav>
        </div>
    )
}

export default Header