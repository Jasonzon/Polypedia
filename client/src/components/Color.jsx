import "../styles/Color.css"
import Header from "./Header"
import {useState, useEffect} from "react"
import { Link, useNavigate } from 'react-router-dom'

function Color({user, setUser, isConnected, setIsConnected}) {
    const navigate = useNavigate()

    const [colors, setColors] = useState([])
    const [colorList, setColorList] = useState([])

    const [confirm, setConfirm] = useState([])

    async function getColors() {
        const response = await fetch("http://localhost:5000/color", {
            method: "GET"
        })
        const parseRes = await response.json()
        setColors(parseRes)
        setConfirm(colors.slice("").map((color) => false))
    }

    useEffect(() => {
        getColors()
    },[])

    async function showLists(color_id) {
        const response = await fetch(`http://localhost:5000/listes/color/${color_id}`, {
            method: "GET"
        })
        const parseRes = await response.json()
        setColorList(parseRes)
    }

    async function deleteColor(color_id, index) {
        if (confirm[index]) {
            const response = await fetch(`http://localhost:5000/color/id/${color_id}`, {
                method: "DELETE"
            })
            window.location.reload(false);
        }
        else {
            const confirm2 = colors.slice("").map((color) => false)
            confirm2[index] = true
            setConfirm(confirm2)
        }
    }

    async function confirmColor(color_id) {
        const body = {validation:true}
        const response = await fetch(`http://localhost:5000/color/validation/${color_id}`, {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body)
        })
        window.location.reload(false)
    }

    return (
        <div>
            <Header  user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>
            <div className="title-flex">
                <h1>Couleurs de listes</h1>
                {isConnected ? ( <div className="flexadd"><h2>Ajouter</h2>
                <Link to="/colors/add"><div className="add" title="ajouter">
                    <div className="vertical"></div>
                    <div className="horizontal"></div>
                </div> </Link> </div> ) : ( <div className="flexadd"><h2>Ajouter</h2>
                <div className="add-disabled" title="vous devez être connecté">
                    <div className="vertical-disabled"></div>
                    <div className="horizontal-disabled"></div>
                </div> </div>)}
            </div>
            <div className="color-div">
                <div className="color-table">
                {user && user.polyuser_role === "admin" ? <p>Supprimer une couleur entrainera la supression des listes de cette couleur</p> : null }
                    <table>
                        <thead>
                        <tr>
                            <td>Couleur</td>
                            <td>Listes</td>
                            {user && user.polyuser_role === "admin" ? <td>Supprimer</td> : null}
                        </tr>
                        </thead>
                        <tbody>
                        {colors.sort(function(a,b){return a.validation-b.validation}).map(({color_name, color_id, validation}, index) => 
                            <> {(user && user.polyuser_role === "admin" && !validation) || validation ? 
                            <tr key={color_name}>
                                <td className={validation ? "blue" : "red"}>{color_name}</td>
                                <td><button className={validation ? "browse blue" : "browse red"} onClick={() => showLists(color_id)}>Chercher</button></td>
                                {user && user.polyuser_role === "admin" ? <>
                                {!confirm[index] ? <td><button className={validation ? "browse blue" : "browse red"} onClick={() => deleteColor(color_id,index)}>Supprimer</button></td> :
                                <td><button className={validation ? "browse blue" : "browse red"} onClick={() => deleteColor(color_id,index)}>Confirmer</button></td> } </> : null }
                                {user && user.polyuser_role === "admin" && !validation ? <td><button className="browse red" onClick={() => confirmColor(color_id)}>Approuver</button></td> : null }       
                            </tr> : null } </>
                        )}
                        </tbody>
                    </table>
                </div>
                <ul className="color-list">
                    {colorList.map(({list_id,list_name, list_year, validation}) => 
                        <li className="color-item" key={`${list_name}-color`} onClick={() => navigate(`/lists/id/${list_id}`)}>
                            <div className={validation ? "coloritem blue" : "coloritem red"}>
                                <span>{list_name}</span>
                                <span className="year">{list_year}</span>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Color