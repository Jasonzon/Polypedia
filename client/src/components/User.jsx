import "../styles/User.css"
import {useState, useEffect} from "react"
import Connected from "./Connected"
import Disconected from "./Disconnected"

function User() {
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

    const [isConnected, setIsConnected] = useState(false)
    const setAuth = boolean => {
        setIsConnected(boolean)
    }
    return (
        <div>
            {isConnected ? <Connected setAuth={setAuth} /> : <Disconected setAuth={setAuth}/>}
        </div>
    )
}

export default User