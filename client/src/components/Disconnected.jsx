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
                const res = await fetch(`http://localhost:5000/users/mail/${mail}`, {
                    method: "GET"
                })
                const parse = await res.json()
            
                if (parse.length === 0 && password !== "" && name !== "") {
                    setStyleMail("")
                    setStylePassword("")
                    setStylePseudo("")
                    const body = {mail, password, name}
                    const response = await fetch("http://localhost:5000/auth/register", {
                        method: "POST",
                        headers: {"Content-Type" : "application/json"},
                        body: JSON.stringify(body)
                    })
                    const parseRes = await response.json()
                    localStorage.setItem("token",parseRes.token)
                    setAuth(true)

                }
                else {
                    if (name === "") {
                        setStylePseudo("red-border")
                    }
                    if (password === "") {
                        setStylePassword("red-border")
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
                    setStylePassword("red-border")
                }
            }

        } catch (err) {
            console.error(err.message)
        }
    }

    const onSubmitForm2 = async (e) => {
        e.preventDefault()
        try {
            if (mail !== "" && password !== "") {
                setStylePassword("")
                setStyleMail("")
                const body = {mail, password}
                const response = await fetch("http://localhost:5000/auth/login", {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(body)
                })
                const parseRes = await response.json()
                localStorage.setItem("token",parseRes.token)
                setAuth(true)
            }
            else {
                if (mail === "") {
                    setStyleMail("red-border ok")
                }
                if (password === "") {
                    setStylePassword("red-border ok")
                }
            }

        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <div>
            <Header  user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>
            {isRegistered ? <h1 className="title-user">Connexion</h1> : <h1>Enregistrement</h1>}
            <div className="user">
                <div className="mail">
                    <label>Mail</label>
                    <input onChange={(e)=>onChange(e)} value={mail} className={`input-user ${styleMail}`} type="text" id="mail" name="mail" required />
                    {styleMail === "" ? null : <> {styleMail === "red-border" ? <span className="little-text">Cette adresse mail existe deja</span> : <span className="little-text">Veuillez remplir le formulaire</span> } </> }
                </div>
                <div className="password">
                    <label>Password</label>
                    <input onChange={(e)=>onChange(e)} value={password} className={`input-user ${stylePassword}`} type="password" id="password" name="password" required />
                    {stylePassword === "" ? null : <span className="little-text">Veuillez remplir le formulaire</span>}
                </div>
                {isRegistered ? <button onClick={onSubmitForm2} className="submit button-user">OK</button> : null}
                {isRegistered ? <button className="button-user" onClick={() => setIsRegistered(false)}>Pas enregistré ? Cliquez ici</button> : (
                    <div className="name">
                        <label>Pseudo</label>
                        <input onChange={(e)=>onChange(e)} value={name} className={`input-user ${stylePseudo}`} type="text" id="name" name="name" maxLength="20" required />
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