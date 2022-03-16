import { useParams } from 'react-router-dom';
import ListView from './ListView';
import Error from './Error';
import {useState, useEffect} from "react"
import ModifList from './ModifList';

function ListChoose({path, user, setUser, isConnected, setIsConnected}) {
    const { id } = useParams()
    const [L, setL] = useState({
        list_id:parseInt(id),
        list_name:"",
        list_theme:"",
        list_year:0,
        list_color:"",
        polyuser_id:0,
        list_description:"",
        list_city:""
    })

    const [list, setList] = useState([])

    async function getList() {
        const response = await fetch("http://localhost:5000/listes", {
            method: "GET"
        })
        const parseRes = await response.json()
        setList(parseRes.slice("").map((object) => 
            object.list_id
        ))
    }

    useEffect(() =>  getList(),[])

    const [parseRes_city, setParseRes_city] = useState(0)
    const [parseRes_color, setParseRes_color] = useState(0)
    const [parseRes_theme, setParseRes_theme] = useState(0)

    async function getLists() {
        const response = await fetch(`http://localhost:5000/listes/id/${id}`, {
            method: "GET"
        })
        const parseRes = await response.json()

        const response_city = await fetch(`http://localhost:5000/villes/id/${parseRes.list_city}`,{
            method: "GET"
        })
        const parseRescity = await response_city.json()
        setParseRes_city(parseRescity)
        const response_theme = await fetch(`http://localhost:5000/themes/id/${parseRes.list_theme}`,{
            method: "GET"
        })
        const parseRestheme = await response_theme.json()
        setParseRes_theme(parseRestheme)
        const response_color = await fetch(`http://localhost:5000/color/id/${parseRes.list_color}`,{
            method: "GET"
        })
        const parseRescolor = await response_color.json()
        setParseRes_color(parseRescolor)

        setL({
            list_id:parseInt(id),
            list_name:parseRes.list_name,
            list_theme:parseRes_theme.theme_name,
            list_year:parseRes.list_year,
            list_color:parseRes_color.color_name,
            polyuser_id:parseRes.polyuser_id,
            list_description:parseRes.list_description,
            list_city:parseRes_city.city_name      
        })
    }

    useEffect(() => getLists(),[list])
    return (
        <div> {path === "modify" && L.list_color !== "" ? <ModifList user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} list_name={L.list_name} list_color={L.list_color} list_theme={L.list_theme} list_year={L.list_year} list_city={L.list_city} list_description={L.list_description} polyuser_id={L.polyuser_id}/> : <>
        {list.includes(parseInt(id)) || list.length === 0 ? <ListView id={id} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} list_name={L.list_name} list_color={parseRes_color.color_id} list_theme={parseRes_theme.theme_id} list_year={L.list_year} list_city={parseRes_city.city_id} list_description={L.list_description} polyuser_id={L.polyuser_id}/> : <Error />} </> }
        </div>
    )
}

export default ListChoose