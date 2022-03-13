import "../styles/City.css"
import Header from "./Header"

function City({user, setUser, isConnected, setIsConnected}) {
    return (
        <div>
            <Header  user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>
        </div>
    )
}

export default City