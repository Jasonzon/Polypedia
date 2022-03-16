import "../styles/ModifUser.css"
import Header from "./Header"
import {useState, useEffect} from "react"
import { useNavigate } from 'react-router-dom';

function ModifUser({user, setUser, isConnected, setIsConnected}) {

    const navigate = useNavigate()

    const [pass, setPass] = useState(false)

    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [description, setDescription] = useState("")
    const [password, setPassword] = useState("")

    function setInfos() {
        setName(user.polyuser_name)
        setMail(user.polyuser_mail)
        setDescription(user.polyuser_description)
    }

    useEffect(() => setInfos(),[user])

    async function submitModif() {
        const body = {name, mail, description}
        const response = await fetch(`http://localhost:5000/users/id/${user.polyuser_id}`, {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body)
        })
        navigate("/user")
    }

    return (
        <div>
            <Header  user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>
            <div className="title-flex">
                <h1>Mettre à jour mon compte</h1>
                <button className="button-connected" onClick={() => navigate("/user")}>Retour</button>
            </div>
            <div className="user-page">
                <div className="mail">
                    <label>Pseudo</label>
                    <input onChange={(e)=>setName(e.target.value)} className="input-user2" value={name}></input>
                </div>
                <div className="mail">
                    <label>Mail</label>
                    <input onChange={(e)=>setMail(e.target.value)} className="input-user2" value={mail}></input>
                </div>
                <div className="mail">
                    <label>Description</label>
                    <input onChange={(e)=>setDescription(e.target.value)} className="input-user2" value={description}></input>
                </div>
                {pass ? null : <button className="submit button-user" onClick={() => setPass(true)}>Modifier le mot de passe</button> }
                {pass ?  <div className="mail">
                    <label>Mot de Passe</label>
                    <input onChange={(e)=>setPassword(e.target.value)} placeholder="Nouveau mot de passe" className="input-user2" type="password" autoComplete="new-password"  value={password}></input>
                        </div> : null}
                {pass ? <button className="submit button-user" onClick={() => setPass(false)}>Ne pas modifier le mot de passe</button>: null }
                <button className="submit button-user" onClick={submitModif}>OK</button> 
            </div>
        </div>
    )
}

export default ModifUser