import "../styles/User.css"
import {useEffect} from "react"
import Connected from "./Connected"
import Disconected from "./Disconnected"

function User({isConnected, setIsConnected, user, setUser}) {
    const checkAuthenticated = async () => {
        try {
            const res = await fetch("http://localhost:5000/auth/verify", {
                method: "GET",
                headers: {token: localStorage.token}
            })
            const parseRes = await res.json()
            parseRes === true ?  setIsConnected(true) : setIsConnected(false)

        } catch (err) {
            console.error(err.message)
        }
    }
    useEffect(() => {
        checkAuthenticated()
    },[])

    const setAuth = boolean => {
        setIsConnected(boolean)
    }
    return (
        <div>
            {isConnected ? <Connected setAuth={setAuth} user={user} setUser={setUser} /> : <Disconected user={user} setUser={setUser} setAuth={setAuth}/>}
        </div>
    )
}

export default User