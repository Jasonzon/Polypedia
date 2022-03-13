import "../styles/Header.css"
import { Link } from 'react-router-dom'

function Header({user, setUser, isConnected, setIsConnected}) {
    return (
        <div className="header">
            <h1 className="title">Polypedia</h1>
            <nav className="nav">
                <Link className="link" to="/">Accueil</Link>
                <Link className="link" to="/lists">Listes</Link>
                <Link className="link" to="/cities">Villes</Link>
                <Link className="link" to="/themes">Themes</Link>
                <Link className="link" to="/colors">Couleurs</Link>
                {user && user.polyuser_role === "admin" ? <Link className="link" to="/manage">Membres</Link> : null }
                <Link className="link" to="/user">{user.polyuser_name ? <span>{user.polyuser_name}</span> : <span>Se connecter</span>}</Link>
            </nav>
        </div>
    )
}

export default Header