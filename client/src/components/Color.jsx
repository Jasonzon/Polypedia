import "../styles/Color.css"
import Header from "./Header"
import {useState, useEffect} from "react"

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
        const response = await fetch(`http://localhost:5000/color-list/${color_id}`, {
            method: "GET"
        })
        const parseRes = await response.json()
        setColorList(parseRes)
    }

    return (
        <div>
            <Header  user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>
            <div className="color-div">
                <div className="color-table">
                    <div>
                        <h1>Couleurs de listes</h1>
                    </div>
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
                        <li className="color-item">
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