import "../styles/Connected.css"
import Header from "./Header"
import {useEffect} from "react"

function Connected({setAuth, user, setUser, isConnected, setIsConnected}) {
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
        </div>
    )
}

export default Connected