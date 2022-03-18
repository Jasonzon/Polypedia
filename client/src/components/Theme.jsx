import "../styles/Theme.css"
import Header from "./Header"
import {useState, useEffect} from "react"
import { Link, useNavigate } from 'react-router-dom'

function Theme({user, setUser, isConnected, setIsConnected}) {

    const navigate = useNavigate()

    const [themes, setThemes] = useState([])
    const [themeList, setThemeList] = useState([])
    const [confirm, setConfirm] = useState([])

    async function getThemes() {
        const response = await fetch("http://localhost:5000/themes", {
            method: "GET"
        })
        const parseRes = await response.json()
        setThemes(parseRes)
        setConfirm(themes.slice("").map((theme) => false))
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

    async function deleteTheme(theme_id, index) {
        if (confirm[index]) {
            const response = await fetch(`http://localhost:5000/themes/id/${theme_id}`, {
                method: "DELETE"
            })
            window.location.reload(false);
        }
        else {
            const confirm2 = themes.slice("").map((theme) => false)
            confirm2[index] = true
            setConfirm(confirm2)
        }
    }

    return (
        <div>
            <Header  user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>
            <div className="title-flex">
                <h1>Thèmes de listes</h1>
                {isConnected ? ( <div className="flexadd"><h2>Ajouter</h2>
                <Link to="/themes/add"><div className="add" title="ajouter">
                    <div className="vertical"></div>
                    <div className="horizontal"></div>
                </div> </Link> </div>) : ( <div className="flexadd"><h2>Ajouter</h2>
                <div className="add-disabled" title="vous devez être connecté">
                    <div className="vertical-disabled"></div>
                    <div className="horizontal-disabled"></div>
                </div> </div>)}
            </div>
            <div className="color-div">
                <div className="color-table">
                    <table>
                        <thead>
                        <tr>
                            <td>Theme</td>
                            <td>Listes</td>
                            {user && user.polyuser_role === "admin" ? <td>Supprimer</td> : null }
                        </tr>
                        </thead>
                        <tbody>
                        {themes.map(({theme_name, theme_id}, index) =>
                            <tr key={theme_name}>
                                <td>{theme_name}</td>
                                <td><button className="browse" onClick={() => showLists(theme_id)}>Chercher</button></td>
                                {user && user.polyuser_role === "admin" ? <>
                                {!confirm[index] ? <td><button className="browse" onClick={() => deleteTheme(theme_id,index)}>Supprimer</button></td> :
                                <td><button className="browse" onClick={() => deleteTheme(theme_id,index)}>Confirmer</button></td> } </> : null }                
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <ul className="color-list">
                    {themeList.map(({list_id, list_name, list_year}) => 
                        <li className="color-item" key={`${list_name}-theme`} onClick={() => navigate(`/lists/id/${list_id}`)}>
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