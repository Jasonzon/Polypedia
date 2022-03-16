import "../styles/City.css"
import Header from "./Header"
import {useState, useEffect} from "react"
import { Link, useNavigate } from 'react-router-dom'

function City({user, setUser, isConnected, setIsConnected}) {

    const navigate = useNavigate()

    const [cities, setCities] = useState([])
    const [cityList, setCityList] = useState([])

    async function getCities() {
        const response = await fetch("http://localhost:5000/villes", {
            method: "GET"
        })
        const parseRes = await response.json()
        setCities(parseRes)
    }

    useEffect(() => {
        getCities()
    },[])

    async function showLists(city_id) {
        const response = await fetch(`http://localhost:5000/listes/city/${city_id}`, {
            method: "GET"
        })
        const parseRes = await response.json()
        setCityList(parseRes)
    }

    return (
        <div>
            <Header  user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>
            <div className="title-flex">
                <h1>Villes du réseau</h1>
                {isConnected ? ( <div className="flexadd"><h2>Ajouter</h2>
                <Link to="/cities/add"><div className="add" title="ajouter">
                    <div className="vertical"></div>
                    <div className="horizontal"></div>
                </div> </Link></div> ) : ( <div className="flexadd"><h2>Ajouter</h2>
                <div className="add-disabled" title="vous devez être connecté">
                    <div className="vertical-disabled"></div>
                    <div className="horizontal-disabled"></div>
                </div></div> )}
            </div>
            <div className="color-div">
                <div className="color-table">
                    <table>
                        <thead>
                        <tr>
                            <td>Ville</td>
                            <td>Listes</td>
                        </tr>
                        </thead>
                        <tbody>
                        {cities.map(({city_name, city_id}) =>
                            <tr key={city_name}>
                                <td>{city_name}</td>
                                <td><button className="browse" onClick={() => showLists(city_id)}>Chercher</button></td>         
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <ul className="color-list">
                    {cityList.map(({list_id, list_name, list_year}) => 
                        <li className="color-item" key={`${list_name}-city`} onClick={() => navigate(`/lists/id/${list_id}`)}>
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

export default City