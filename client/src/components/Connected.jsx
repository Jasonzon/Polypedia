import "../styles/Connected.css"
import Header from "./Header"
import {useEffect} from "react"
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom';

function Connected({setAuth, user, setUser, isConnected, setIsConnected}) {

    const navigate = useNavigate()

    function logout() {
        setAuth(false)
        localStorage.removeItem("token")
        setUser({})
    }

    return (
        <div>
            <Header  user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>
            <div className="connected">
                <h1>Connecté</h1>
                <button className="button-connected" onClick={logout}>Se déconnecter</button>
            </div>
            <div className="user-page">
                <h1>{user.polyuser_name}</h1>
                <h3>{user.polyuser_mail}</h3>
                <h3>{user.polyuser_role}</h3>
                {user.polyuser_description === "" ? <p>pas de description</p> : <p>{user.polyuser_description}</p> }
                <button onClick={() => navigate("/user/modif")} className="submit button-user">Modifier</button>
            </div>
        </div>
    )
}

export default Connected