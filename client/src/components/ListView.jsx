import "../styles/ListView.css"
import {useState, useEffect} from "react"
import Header from "./Header"
import {useNavigate} from "react-router-dom"

function ListView({id, user, setUser, isConnected, setIsConnected, list_name, list_color, polyuser_id, list_theme, list_city, list_year, list_description}) {
    const [infos, setInfos] = useState({
        color:"",
        theme:"",
        city:"",
        polyuser:""
    })

    const [charged, setCharged] = useState(false)

    const navigate = useNavigate()

    async function getList() {
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

        const response_user = await fetch(`/users/id/${polyuser_id}`, {
            method: "GET"
        })
        const parseRes_user = await response_user.json()

        setInfos({
            color: parseRes_color.color_name,
            theme: parseRes_theme.theme_name,
            city: parseRes_city.city_name,
            polyuser: parseRes_user.polyuser_name
        })
    }

    useEffect(() => {
        if (polyuser_id && list_theme && list_city && list_year) {
            getList()
        }
    },[polyuser_id, list_theme, list_city, list_year])

    useEffect(() => {
        if (infos.city !== "" && infos.color !== "" && infos.theme !== "" && infos.polyuser !== "") {
            setCharged(true)
        }
    }, [infos])

    return (
        <div>
            <Header  user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>
            <div className="title-flex">

            </div>
            {charged ? 
            <div className="list-view">
                <h1>{list_name}</h1>
                <div className="infos-view">
                    <h3>Ville : {infos.city}</h3>
                    <h3>Couleur : {infos.color}</h3>
                    <h3>Thème : {infos.theme}</h3>
                </div>
                <p>{list_description}</p>
                <p>Par {infos.polyuser}</p>
                {user && (user.polyuser_role === "admin" || user.polyuser_id === polyuser_id) ? <button className="button-user modif" onClick={() => navigate(`/lists/modify/id/${id}`)}>Modifier</button> : null }
            </div> : <div className="lds-dual-ring"></div> }
        </div>
    )
}

export default ListView