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

    const [styleMail, setStyleMail] = useState("")
    const [stylePseudo, setStylePseudo] = useState("")
    const [stylePassword, setStylePassword] = useState("")

    function setInfos() {
        setName(user.polyuser_name)
        setMail(user.polyuser_mail)
        setDescription(user.polyuser_description)
    }

    useEffect(() => setInfos(),[user])

    async function submitModif() {

        if (mail !== "") {
            const res = await fetch(`/users/mail/${mail}`, {
                method: "GET"
            })
            const parse = await res.json()
            if (pass) {
                if ((parse.length === 0 || parse[0].polyuser_id === user.polyuser_id) && name !== "" && password !== "") {
                    setStyleMail("")
                    setStylePassword("")
                    setStylePseudo("")
                    const body = {name:name.replace(/[^a-zA-Z0-9_-]/g,''), mail, description, password, id:user.polyuser_id}
                    const res = await fetch("/auth/register", {
                        method: "PUT",
                        headers: {"Content-Type" : "application/json"},
                        body: JSON.stringify(body)
                    })
                    const parseRes = await res.json()
                    localStorage.removeItem("token")
                    localStorage.setItem("token",parseRes.token)
                    navigate("/user")
                }
                else {
                    if (name === "") {
                        setStylePseudo("red-border")
                    }
                    if (password === "") {
                        setStylePassword("red-border")
                    }
                    if (parse.length !== 0 && parse[0].polyuser_id !== user.polyuser_id) {
                        setStyleMail("red-border")
                    }
                }
            }
            else {
                if ((parse.length === 0 || parse[0].polyuser_id === user.polyuser_id) && name !== "") {
                    setStyleMail("")
                    setStylePseudo("")
                    const body = {name:name.replace(/[^a-zA-Z0-9_-]/g,''), mail, description}
                    const response = await fetch(`/users/id/${user.polyuser_id}`, {
                        method: "PUT",
                        headers: {"Content-Type" : "application/json"},
                        body: JSON.stringify(body)
                    })
                    navigate("/user")
                }
                else {
                    if (name === "") {
                        setStylePseudo("red-border")
                    }
                    if (parse.length !== 0 && parse[0].polyuser_id !== user.polyuser_id) {
                        setStyleMail("red-border")
                    }
                }
            }
        }
        else {
            setStyleMail("red-border ok")
            if (name === "") {
                setStylePseudo("red-border")
            }
            if (password === "") {
                setStylePassword("red-border")
            }
        }
    }

    return (
        <div className="font-face-gm">
            <Header  user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>
            <div className="title-flex">
                <h1>Mettre à jour mon compte</h1>
                <button className="button-connected" onClick={() => navigate("/user")}>Retour</button>
            </div>
            <div className="user-page">
                <div className="mail">
                    <label>Pseudo</label>
                    <input onChange={(e)=>setName(e.target.value)} className={`input-user2 ${stylePseudo}`} value={name.replace(/[^a-zA-Z0-9_-]/g,'')} maxLength="20"></input>
                    {stylePseudo === "" ? null : <span className="little-text">Veuillez remplir le formulaire</span>}
                </div>
                <div className="mail">
                    <label>Mail</label>
                    <input onChange={(e)=>setMail(e.target.value)} className={`input-user2 ${styleMail}`} value={mail} maxLength="30"></input>
                    {styleMail === "" ? null : <> {styleMail === "red-border" ? <span className="little-text">Cette adresse mail existe deja</span> : <span className="little-text">Veuillez remplir le formulaire</span> } </> }
                </div>
                <div className="mail">
                    <label>Description</label>
                    <input onChange={(e)=>setDescription(e.target.value)} className="input-user2" value={description} maxLength="250"></input>
                </div>
                {pass ? null : <button className="submit button-user" onClick={() => setPass(true)}>Modifier le mot de passe</button> }
                {pass ?  <div className="mail">
                    <label>Mot de Passe</label>
                    <input onChange={(e)=>setPassword(e.target.value)} placeholder="Nouveau mot de passe" className={`input-user2 ${stylePassword}`} type="password" autoComplete="new-password" value={password} ></input>
                    {stylePassword === "" ? null : <span className="little-text">Veuillez remplir le formulaire</span>}
                        </div> : null}
                {pass ? <button className="submit button-user" onClick={() => setPass(false)}>Ne pas modifier le mot de passe</button>: null }
                <button className="submit button-user" onClick={submitModif}>OK</button> 
            </div>
        </div>
    )
}

export default ModifUser