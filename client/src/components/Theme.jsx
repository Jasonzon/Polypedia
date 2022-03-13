import "../styles/Theme.css"
import Header from "./Header"

function Theme({user, setUser, isConnected, setIsConnected}) {
    return (
        <div>
            <Header  user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>
        </div>
    )
}

export default Theme