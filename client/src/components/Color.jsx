import "../styles/Color.css"
import Header from "./Header"
import {useState, useEffect} from "react"
import { Link } from 'react-router-dom'

function Color({user, setUser, isConnected, setIsConnected}) {
    const [colors, setColors] = useState([])
    const [colorList, setColorList] = useState([])

    async function getColors() {
        const response = await fetch("http://localhost:5000/color", {
            method: "GET"
        })
        const parseRes = await response.json()
        setColors(parseRes)
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

    return (
        <div>
            <Header  user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>
            <div className="title-flex">
                <h1>Couleurs de listes</h1>
                {isConnected ? (
                <Link to="/colors/add"><div className="add" title="ajouter">
                    <div className="vertical"></div>
                    <div className="horizontal"></div>
                </div> </Link> ) : ( 
                <div className="add-disabled" title="vous devez être connecté">
                    <div className="vertical-disabled"></div>
                    <div className="horizontal-disabled"></div>
                </div> )}
            </div>
            <div className="color-div">
                <div className="color-table">
                    <table>
                        <tr>
                            <td>Couleur</td>
                            <td>Listes</td>
                        </tr>
                        {colors.map(({color_name, color_id}) =>
                            <tr>
                                <td>{color_name}</td>
                                <td><button className="browse" onClick={() => showLists(color_id)}>Chercher</button></td>         
                            </tr>
                        )}
                    </table>
                </div>
                <ul className="color-list">
                    {colorList.map(({list_name, list_year}) => 
                        <li className="color-item" key={`${list_name}-color`}>
                            <div className="coloritem">
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