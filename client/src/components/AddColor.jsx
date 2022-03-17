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
        const res = await fetch(`http://localhost:5000/color/name/${newInput}`, {
            method: "GET"
        })
        const parseRes = await res.json()
        if (parseRes.length === 0 && newInput !== "") {
            setStyle("")
            const body = {name:newInput}
            const response = await fetch("http://localhost:5000/color", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            })
            navigate("/colors")
        }
        else {
            setStyle("red-border")
        }
    }

    return (
        <div>
            <Header  user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>
            <div className="add-name">
                <label>Ajouter une couleur :</label>
                <input onChange={(e)=>setInput(e.target.value)} value={input} className={`blue-back input-user2 ${style}`} type="text" name="name" required />
                {style === "" ? null : <span className="little-text">cette couleur existe déjà</span>}
                <button onClick={submitColor} className="submit button-user2">OK</button>
            </div>
        </div>
    )
}

export default AddColor