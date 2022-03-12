import "../styles/Connected.css"
import Header from "./Header"

function Connected({setAuth}) {
    function logout() {
        setAuth(false)
        localStorage.removeItem("token")
    }
    return (
        <div>
            <Header />
            <div className="connected">
                <h1>Connecté</h1>
                <button className="button-connected" onClick={logout}>Se déconnecter</button>
            </div>
        </div>
    )
}

export default Connected