import "../styles/Manage.css"
import Header from "./Header"
import {useState, useEffect} from "react"

function Manage({user, setUser, isConnected, setIsConnected}) {
    const [users, setUsers] = useState([])

    async function getUsers() {
        const response = await fetch("http://localhost:5000/users", {
            method: "GET"
        })
        const parseRes = await response.json()
        setUsers(parseRes)
    }

    useEffect(() => {
        getUsers()
    },[changeRole])

    async function changeRole(polyuser_id, polyuser_role) {
        const newRole = polyuser_role === "user" ? "admin" : "user"
        const response = await fetch(`http://localhost:5000/users/role/${polyuser_id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                role: newRole
            })
        })
        
    }

    return (
        <div>
            <Header  user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>
            <div className="manage-title">
                <h1>Gérer les utilisateurs</h1>
            </div>
            <table>
                <tr>
                    <td>ID</td>
                    <td>Mail</td>
                    <td>Pseudo</td>
                    <td>Rôle</td>
                </tr>
                {users.map(({polyuser_id, polyuser_mail, polyuser_name, polyuser_role, polyuser_description, polyuser_password}) =>
                    <tr>
                        <td>{polyuser_id}</td>
                        <td>{polyuser_mail}</td>
                        <td>{polyuser_name}</td>
                        <td><button className="toggle" disabled={polyuser_id === user.polyuser_id} onClick={() => changeRole(polyuser_id, polyuser_role)}>{polyuser_role}</button></td>         
                    </tr>
                )}
            </table>
        </div>
    )
}

export default Manage