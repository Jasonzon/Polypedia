import "../styles/Theme.css"
import Header from "./Header"
import {useState, useEffect} from "react"
import { Link } from 'react-router-dom'

function Theme({user, setUser, isConnected, setIsConnected}) {
    const [themes, setThemes] = useState([])
    const [themeList, setThemeList] = useState([])

    async function getThemes() {
        const response = await fetch("http://localhost:5000/themes", {
            method: "GET"
        })
        const parseRes = await response.json()
        setThemes(parseRes)
    }

    useEffect(() => {
        getThemes()
    },[])

    async function showLists(theme_id) {
        const response = await fetch(`http://localhost:5000/listes/theme/${theme_id}`, {
            method: "GET"
        })
        const parseRes = await response.json()
        setThemeList(parseRes)
    }

    return (
        <div>
            <Header  user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>
            <div className="color-div">
                <div className="color-table">
                    <div>
                        <h1>Thèmes de listes</h1>
                    </div>
                    <table>
                        <tr>
                            <td>Theme</td>
                            <td>Listes</td>
                        </tr>
                        {themes.map(({theme_name, theme_id}) =>
                            <tr>
                                <td>{theme_name}</td>
                                <td><button className="browse" onClick={() => showLists(theme_id)}>Chercher</button></td>         
                            </tr>
                        )}
                    </table>
                </div>
                <ul className="color-list">
                    {themeList.map(({list_name, list_year}) => 
                        <li className="color-item" key={`${list_name}-theme`}>
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

export default Theme