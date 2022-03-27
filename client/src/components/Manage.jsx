import "../styles/Manage.css"
import Header from "./Header"
import {useState, useEffect} from "react"

function Manage({user, setUser, isConnected, setIsConnected}) {
    const [users, setUsers] = useState([])

    async function getUsers() {
        const response = await fetch("/users", {
            method: "GET"
        })
        const parseRes = await response.json()
        setUsers(parseRes)
    }

    useEffect(() => {
        getUsers()
    },[])

    async function changeRole(polyuser_id, polyuser_role) {
        const newRole = polyuser_role === "user" ? "admin" : "user"
        const response = await fetch(`/users/role/${polyuser_id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                role: newRole
            })
        })
        getUsers()
    }

    return (
        <div className="font-face-gm">
            <Header  user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>
            <div className="manage-title">
                <h1>Gérer les utilisateurs</h1>
            </div>
            <table>
                <thead>
                <tr>
                    <td>ID</td>
                    <td>Mail</td>
                    <td>Pseudo</td>
                    <td>Rôle</td>
                </tr>
                </thead>
                <tbody>
                {users.map(({polyuser_id, polyuser_mail, polyuser_name, polyuser_role, polyuser_description, polyuser_password}) =>
                    <tr key={polyuser_id}>
                        <td>{polyuser_id}</td>
                        <td>{polyuser_mail}</td>
                        <td>{polyuser_name}</td>
                        <td><button className="toggle" disabled={polyuser_id === user.polyuser_id} onClick={() => changeRole(polyuser_id, polyuser_role)}>{polyuser_role}</button></td>         
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default Manage