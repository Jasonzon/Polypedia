import "../styles/Color.css"
import Header from "./Header"

function Color({user, setUser, isConnected, setIsConnected}) {
    return (
        <div>
            <Header  user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>
        </div>
    )
}

export default Color