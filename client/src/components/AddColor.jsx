import "../styles/AddColor.css"
import {useState} from "react"
import Header from "./Header"
import { useNavigate } from 'react-router-dom';

function AddColor({user, setUser, isConnected, setIsConnected}) {
    const navigate = useNavigate()
    const [input, setInput] = useState("")
    const [style, setStyle] = useState("")

    async function submitColor() {

        const newInput = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
        const res = await fetch(`/color/name/${newInput}`, {
            method: "GET"
        })
        const parseRes = await res.json()
        if (parseRes.length === 0 && newInput !== "") {
            setStyle("")
            const body = {name:newInput.replace(/[^a-zA-Z0-9_-]/g,'')}
            const response = await fetch("/color", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            })
            const parseRes = await response.json()
            if (user && user.polyuser_role === "admin") {
                const body2 = {validation:true}
                const response = await fetch(`/color/validation/${parseRes.color_id}`, {
                    method: "PUT",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(body2)
                })    
            }
            navigate("/colors")
        }
        else {
            setStyle("red-border")
        }
    }

    return (
        <div className="font-face-gm">
            <Header  user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>
            <div className="add-name">
                <label>Ajouter une couleur :</label>
                <input onChange={(e)=>setInput(e.target.value)} value={input.replace(/[^a-zA-Z0-9_-]/g,'')} className={`blue-back input-user2 ${style}`} type="text" name="name" maxLength="20" required />
                {style === "" ? null : <span className="little-text">cette couleur existe déjà</span>}
                <button onClick={submitColor} className="submit button-user2">OK</button>
            </div>
        </div>
    )
}

export default AddColor