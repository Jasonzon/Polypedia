import { useParams } from 'react-router-dom';
import ListView from './ListView';
import Error from './Error';
import {useState, useEffect} from "react"

function ListChoose({user, setUser, isConnected, setIsConnected}) {
    const { id } = useParams()
    const [L, setL] = useState({
        list_id:"",
        list_name:"",
        list_theme:"",
        list_year:"",
        list_color:"",
        polyuser_id:"",
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

    async function getLists() {
        const response = await fetch(`http://localhost:5000/listes/id/${id}`, {
            method: "GET"
        })
        const parseRes = await response.json()
        setL(parseRes)
    }

    useEffect(() => getLists(),[list])
    return (
        <div>
        {list.includes(parseInt(id)) || list.length === 0 ? <ListView id={id} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} list_name={L.list_name} list_color={L.list_color} list_theme={L.list_theme} list_year={L.list_year} list_city={L.list_city} list_description={L.list_description} polyuser_id={L.polyuser_id}/> : <Error />}
        </div>
    )
}

export default ListChoose