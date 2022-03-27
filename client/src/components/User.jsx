import "../styles/User.css"
import Connected from "./Connected"
import Disconected from "./Disconnected"

function User({isConnected, setIsConnected, user, setUser}) {
    
    const setAuth = boolean => {
        setIsConnected(boolean)
    }

    return (
        <div className="font-face-gm">
            {isConnected ? <Connected setAuth={setAuth} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} /> : <Disconected user={user} setUser={setUser} setAuth={setAuth} isConnected={isConnected} setIsConnected={setIsConnected}/>}
        </div>
    )
}

export default User