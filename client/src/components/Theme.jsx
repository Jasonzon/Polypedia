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
        const response = await fetch("/themes", {
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
        const response = await fetch(`/listes/theme/${theme_id}`, {
            method: "GET"
        })
        const parseRes = await response.json()
        setThemeList(parseRes)
    }

    async function deleteTheme(theme_id, index) {
        if (confirm[index]) {
            const response = await fetch(`/themes/id/${theme_id}`, {
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

    async function confirmTheme(theme_id) {
        const body = {validation:true}
        const response = await fetch(`/themes/validation/${theme_id}`, {
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
                {user && user.polyuser_role === "admin" ? <p>Supprimer un thème entrainera la supression des listes avec ce thème</p> : null }
                    <table>
                        <thead>
                        <tr>
                            <td>Theme</td>
                            <td>Listes</td>
                            {user && user.polyuser_role === "admin" ? <td>Supprimer</td> : null}
                        </tr>
                        </thead>
                        <tbody>
                        {themes.sort(function(a,b){return a.validation-b.validation}).map(({theme_name, theme_id, validation}, index) =>
                        <> {(user && user.polyuser_role === "admin" && !validation) || validation ? 
                            <tr key={theme_name}>
                                <td className={validation ? "blue" : "red"}>{theme_name}</td>
                                <td><button className={validation ? "browse blue" : "browse red"} onClick={() => showLists(theme_id)}>Chercher</button></td>
                                {user && user.polyuser_role === "admin" ? <>
                                {!confirm[index] ? <td><button className={validation ? "browse blue" : "browse red"} onClick={() => deleteTheme(theme_id,index)}>Supprimer</button></td> :
                                <td><button className={validation ? "browse blue" : "browse red"} onClick={() => deleteTheme(theme_id,index)}>Confirmer</button></td> } </> : null }
                                {user && user.polyuser_role === "admin" && !validation ? <td><button className="browse red" onClick={() => confirmTheme(theme_id)}>Approuver</button></td> : null }                 
                            </tr> : null } </>
                        )}
                        </tbody>
                    </table>
                </div>
                <ul className="color-list">
                    {themeList.map(({list_id, list_name, list_year, validation}) => 
                        <li className="color-item" key={`${list_name}-theme`} onClick={() => navigate(`/lists/id/${list_id}`)}>
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

export default Theme