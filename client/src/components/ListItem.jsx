import "../styles/ListItem.css"
import {useState, useEffect} from "react"
import {Link} from "react-router-dom"

function ListItem({user, polyuser_id, style, list_id, list_name, list_color, list_theme, list_city, list_year, list_description}) {
    const [infos, setInfos] = useState({
        color:"",
        theme:"",
        city:""
    })

    async function getInfos() {
        const response_city = await fetch(`http://localhost:5000/villes/id/${list_city}`,{
            method: "GET"
        })
        const parseRes_city = await response_city.json()

        const response_theme = await fetch(`http://localhost:5000/themes/id/${list_theme}`,{
            method: "GET"
        })
        const parseRes_theme = await response_theme.json()

        const response_color = await fetch(`http://localhost:5000/color/id/${list_color}`,{
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
        getInfos()
    },[list_city, list_theme, list_color])

    const [confirm, setConfirm] = useState("")

    async function deleteList() {
        console.log(confirm)
        if (confirm !== "") {
            const response = await fetch(`http://localhost:5000/listes/${list_id}`, {
                method: "DELETE"
            })
            window.location.reload(false)
        }
        else {
            setConfirm("recliquez pour supprimer")
        }
    }
    
    return (
        <div className={`listitem ${style}`}>
            <div className="flex-listitem">
                <Link to={"/lists/id/" + list_id}><h2>{list_name}</h2></Link>
                {user && ( user.polyuser_role === "admin" || user.polyuser_id === polyuser_id) ? <div className="cross-flex"><div className="cross" onClick={deleteList}>
                    <div className="listitem-vertical"></div>
                    <div className="listitem-horizontal"></div>
                </div> <span className="little-text">{confirm}</span> </div>  : null }
            </div>
            <h3>{list_year}</h3>
            <div className="stats">
                <span>Ville: {infos.city}</span>
                <span>Theme: {infos.theme}</span>
                <span>Couleur: {infos.color}</span>
            </div>
            <p>{list_description}</p>
        </div>
    )
}

export default ListItem