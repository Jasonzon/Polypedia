import "../styles/ListItem.css"
import {useState, useEffect} from "react"
import {Link} from "react-router-dom"

function ListItem({user, polyuser_id, style, list_id, list_name, list_color, list_theme, list_city, list_year, list_description, validation}) {
    const [infos, setInfos] = useState({
        color:"",
        theme:"",
        city:""
    })

    const [charged, setCharged] = useState(false)

    async function getInfos() {
        const response_city = await fetch(`/villes/id/${list_city}`,{
            method: "GET"
        })
        const parseRes_city = await response_city.json()

        const response_theme = await fetch(`/themes/id/${list_theme}`,{
            method: "GET"
        })
        const parseRes_theme = await response_theme.json()

        const response_color = await fetch(`/color/id/${list_color}`,{
            method: "GET"
        })
        const parseRes_color = await response_color.json()

        setInfos({
            color: parseRes_color.color_name,
            theme: parseRes_theme.theme_name,
            city: parseRes_city.city_name
        })
    }

    useEffect(() => {
        if (list_city && list_theme && list_color) {
            getInfos()
        }
    },[list_city, list_theme, list_color])

    useEffect(() => {
        if (infos.color !== "" && infos.city !== "" && infos.theme !== "") {
            setCharged(true)
        }
    })

    const [confirm, setConfirm] = useState("")

    async function deleteList() {
        if (confirm !== "") {
            const response = await fetch(`/listes/id/${list_id}`, {
                method: "DELETE"
            })
            window.location.reload(false)
        }
        else {
            setConfirm("recliquez pour supprimer")
        }
    }

    async function addList() {
        const body = {validation:true}
        const response = await fetch(`/listes/validation/${list_id}`, {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body)
        })
        const response_city = await fetch(`/villes/validation/${list_city}`, {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body)
        })
        const response_color = await fetch(`/color/validation/${list_color}`, {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body)
        })
        const response_theme = await fetch(`/themes/validation/${list_theme}`, {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body)
        })
        window.location.reload(false)
    }
    return (
        <div className={typeof validation!== undefined || validation === true ? `listitem font-face-gm ${style} blue` : `listitem font-face-gm ${style} red`}>
            <div className={charged ? "flex-listitem" : "flex-listitem transparent"}>
                {validation ? <Link to={"/lists/id/" + list_id}><h2 className={charged ? "blue-link" : "blue-link transparent"}>{list_name}</h2></Link> : <h2 className={charged ? "" : "transparent"}>{list_name}</h2> }
                {user && ( user.polyuser_role === "admin" || user.polyuser_id === polyuser_id) ? <div className="cross-flex"><div className="cross" onClick={deleteList}>
                    <div className="listitem-vertical"></div>
                    <div className="listitem-horizontal"></div>
                </div> <span className="little-text">{confirm}</span> </div>  : null }
                {!validation && user && user.polyuser_role === "admin" ? <div className="tick-validation" onClick={addList}></div> : null }
            </div>
            <h3 className={charged ? "" : "transparent"}>{list_year}</h3>
            <div className={charged ? "stats" : "stats transparent"}>
                <span>Ville: {infos.city}</span>
                <span>Theme: {infos.theme}</span>
                <span>Couleur: {infos.color}</span>
            </div>
            <p className={charged ? "" : "transparent"}>{list_description}</p>
            {charged ? null : <div className="lds-dual-ring-white"></div> }
        </div>
    )
}

export default ListItem