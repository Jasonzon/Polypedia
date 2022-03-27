import "../styles/Disconnected.css"
import Header from "./Header"
import {useState} from "react"

function Disconnected({setAuth, user, setUser, isConnected, setIsConnected}) {
    const [isRegistered, setIsRegistered] = useState(true)
    const [inputs, setInputs] = useState({
        mail:"",
        password:"",
        name:""
    })
    
    const {mail, password, name} = inputs

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const [styleMail, setStyleMail] = useState("")
    const [stylePassword, setStylePassword] = useState("")
    const [stylePseudo, setStylePseudo] = useState("")

    const onSubmitForm1 = async (e) => {
        e.preventDefault()
        try {

            if (mail !== "") {
                setStyleMail("")
                const res = await fetch(`/users/mail/${mail}`, {
                    method: "GET"
                })
                const parse = await res.json()
            
                if (parse.length === 0 && password !== "" && name !== "") {
                    setStylePassword("")
                    setStylePseudo("")
                    const body = {mail, password, name:name.replace(/[^a-zA-Z0-9_-]/g,'')}
                    const response = await fetch("/auth/register", {
                        method: "POST",
                        headers: {"Content-Type" : "application/json"},
                        body: JSON.stringify(body)
                    })
                    const parseRes = await response.json()
                    if (parseRes.invalid) {
                        setStyleMail("red-border non")
                    }
                    else {
                        localStorage.setItem("token",parseRes.token)
                        setAuth(true)
                    }

                }
                else {
                    if (name === "") {
                        setStylePseudo("red-border")
                    }
                    else {
                        setStylePseudo("")
                    }
                    if (password === "") {
                        setStylePassword("red-border ok")
                    }
                    else {
                        setStylePassword("")
                    }
                    if (parse.length !== 0) {
                        setStyleMail("red-border")
                    }
                }
            }
            else {
                setStyleMail("red-border ok")
                if (name === "") {
                    setStylePseudo("red-border")
                }
                if (password === "") {
                    setStylePassword("red-border ok")
                }
            }

        } catch (err) {
            console.error(err.message)
        }
    }

    const onSubmitForm2 = async (e) => {
        e.preventDefault()
        try {

            if (mail !== "") {
                setStyleMail("")
                const res = await fetch(`/users/mail/${mail}`, {
                    method: "GET"
                })
                const parse = await res.json()

                if (parse.length !== 0 && password !== "") {
                    setStylePassword("")
                    const body = {mail, password}
                    const response = await fetch("/auth/login", {
                        method: "POST",
                        headers: {"Content-Type" : "application/json"},
                        body: JSON.stringify(body)
                    })
                    const parseRes = await response.json()
                    if (parseRes.valid) {
                        localStorage.setItem("token",parseRes.token)
                        setAuth(true)
                    }
                    else {
                        setStylePassword("red-border")
                    }
                }
                else {
                    if (password === "") {
                        setStylePassword("red-border ok")
                    }
                    else {
                        setStylePassword("")
                    }
                    if (parse.length === 0) {
                        setStyleMail("red-border non")
                    }
                }
            }
            else {
                setStyleMail("red-border ok")
                if (password === "") {
                    setStylePassword("red-border ok")
                }
                else {
                    setStylePassword("")
                }
            }

        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <div className="font-face-gm">
            <Header  user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>
            {isRegistered ? <h1 className="title-user">Connexion</h1> : <h1>Enregistrement</h1>}
            <div className="user">
                <div className="mail">
                    <label>Mail</label>
                    <input onChange={(e)=>onChange(e)} value={mail} className={`input-user ${styleMail}`} type="text" id="mail" name="mail" maxLength="30" required />
                    {styleMail === "" ? null : <> {styleMail === "red-border" ? <span className="little-text">Cette adresse mail existe deja</span> : <> {styleMail === "red-border ok" ? <span className="little-text">Veuillez remplir le formulaire</span> : <span className="little-text">Mail incorrect</span> } </> } </> }
                </div>
                <div className="password">
                    <label>Password</label>
                    <input onChange={(e)=>onChange(e)} value={password} className={`input-user ${stylePassword}`} type="password" name="password" maxLength="20" required />
                    {stylePassword === "" ? null : <> {stylePassword === "red-border" ? <span className="little-text">Mot de passe incorrect</span> : <span className="little-text">Veuillez remplir le formulaire</span> } </> }
                </div>
                {isRegistered ? <button onClick={onSubmitForm2} className="submit button-user">OK</button> : null}
                {isRegistered ? <button className="button-user" onClick={() => setIsRegistered(false)}>Pas enregistré ? Cliquez ici</button> : (
                    <div className="name">
                        <label>Pseudo</label>
                        <input onChange={(e)=>onChange(e)} value={name.replace(/[^a-zA-Z0-9_-]/g,'')} className={`input-user ${stylePseudo}`} type="text" id="name" name="name" maxLength="20" required />
                        {stylePseudo === "" ? null : <span className="little-text">Veuillez choisir un pseudo</span>}
                    </div>
                )}
                {isRegistered ? null : <button onClick={onSubmitForm1} className="submit button-user">OK</button>}
                {isRegistered ? null : <button className="button-user" onClick={() => setIsRegistered(true)}>Déjà enregistré ? Cliquez ici pour se connecter</button>}
            </div>
        </div>
    )
}

export default Disconnected