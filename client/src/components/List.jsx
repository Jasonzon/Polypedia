import "../styles/List.css"
import Header from "./Header"
import ListItem from "./ListItem"
import {useState, useEffect} from "react"

function List({user, setUser, isConnected, setIsConnected}) {
    const [lists, setLists] = useState([])
    async function getLists() {
        const response = await fetch("http://localhost:5000/listes", {
            method:"GET"
        })
        const parseRes = await response.json()
        setLists(parseRes)
    }
    useEffect(() => {
        getLists()
    },[])

    return (
        <div>
            <Header  user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>
            <h1>Ici retrouvez toutes les listes disponibles sur le site</h1>
            <ul className="list-list">
                {lists.map(({list_name, list_color, list_theme, list_city, list_year, list_description}) => 
                    <li key={list_name}>
                        <ListItem list_name={list_name} list_color={list_color} list_theme={list_theme} list_year={list_year} list_city={list_city} list_description={list_description} />
                    </li>
                )}
            </ul>
        </div>
    )
}

export default List