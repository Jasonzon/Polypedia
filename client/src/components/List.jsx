import "../styles/List.css"
import Header from "./Header"
import ListItem from "./ListItem"
import {useState, useEffect} from "react"
import { Link} from 'react-router-dom'

function List({path, user, setUser, isConnected, setIsConnected}) {
    const [lists, setLists] = useState([])
    async function getLists() {
        const response = await fetch(`http://localhost:5000/listes/${path}`, {
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
            <div className="title-flex">
                <h1>Ici retrouvez toutes les listes disponibles sur le site</h1>
                {isConnected ? ( <div className="flexadd"><h2>Ajouter</h2>
                <Link to="/lists/add"><div className="add" title="ajouter">
                    <div className="vertical"></div>
                    <div className="horizontal"></div>
                </div> </Link></div> ) : ( <div className="flexadd"><h2>Ajouter</h2>
                <div className="add-disabled" title="vous devez être connecté">
                    <div className="vertical-disabled"></div>
                    <div className="horizontal-disabled"></div>
                </div></div> )}
            </div>
            <ul className="list-list">
                {lists.map(({polyuser_id, list_id, list_name, list_color, list_theme, list_city, list_year, list_description}) => 
                    <li key={list_name}>
                        <ListItem style={""} polyuser_id={polyuser_id} user={user} list_id={list_id} list_name={list_name} list_color={list_color} list_theme={list_theme} list_year={list_year} list_city={list_city} list_description={list_description} />
                    </li>
                )}
            </ul>
        </div>
    )
}

export default List