import "../styles/Header.css"
import { Link } from 'react-router-dom'
import {useEffect} from "react"

function Header({user, setUser, isConnected, setIsConnected}) {

    const checkAuthenticated = async () => {
        try {
            const res = await fetch("/auth/verify", {
                method: "GET",
                headers: {token: localStorage.token}
            })
            const parseRes = await res.json()
            if (parseRes) { 
                setIsConnected(true)
                await getUser()
            }
            else {
             setIsConnected(false)
            }

        } catch (err) {
            console.error(err.message)
        }
    }

    async function getUser() {
        const response = await fetch("/dashboard/", {
            method:"GET",
            headers: {token: localStorage.token}
        
        })
        const parseRes = await response.json()
        setUser(parseRes)
    }

    useEffect(() => {
        if (localStorage.token) {
            checkAuthenticated()
        }
    },[])

    return (
        <div className="header">
            <h1 className="title">Polypedia</h1>
            <nav className="nav">
                <Link className="link" to="/">Accueil</Link>
                <Link className="link" to="/lists/all">Listes</Link>
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