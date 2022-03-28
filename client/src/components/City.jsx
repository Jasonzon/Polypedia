import "../styles/City.css"
import Header from "./Header"
import {useState, useEffect} from "react"
import { Link, useNavigate } from 'react-router-dom'

function City({user, setUser, isConnected, setIsConnected}) {

    const navigate = useNavigate()

    const [cities, setCities] = useState([])
    const [cityList, setCityList] = useState([])
    const [confirm, setConfirm] = useState([])

    async function getCities() {
        const response = await fetch("/villes", {
            method: "GET"
        })
        const parseRes = await response.json()
        setCities(parseRes)
        setConfirm(cities.slice("").map((city) => false))
    }

    useEffect(() => {
        getCities()
    },[])

    async function showLists(city_id) {
        const response = await fetch(`/listes/city/${city_id}`, {
            method: "GET"
        })
        const parseRes = await response.json()
        setCityList(parseRes)
    }

    async function deleteCity(city_id, index) {
        if (confirm[index]) {
            const response = await fetch(`/villes/id/${city_id}`, {
                method: "DELETE"
            })
            window.location.reload(false);
        }
        else {
            const confirm2 = cities.slice("").map((city) => false)
            confirm2[index] = true
            setConfirm(confirm2)
        }
    }

    async function confirmCity(city_id) {
        const body = {validation:true}
        const response = await fetch(`/villes/validation/${city_id}`, {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body)
        })
        window.location.reload(false)
    }

    return (
        <div className="font-face-gm">
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
                {user && user.polyuser_role === "admin" ? <p>Supprimer une ville entrainera la supression des listes de cette ville</p> : null }
                    <table>
                        <thead>
                        <tr>
                            <td>Ville</td>
                            <td>Listes</td>
                            {user && user.polyuser_role === "admin" ? <td>Supprimer</td> : null }
                        </tr>
                        </thead>
                        <tbody>
                        {cities.sort(function(a,b){return a.validation-b.validation}).map(({city_name, city_id, validation}, index) =>
                        <> {(user && user.polyuser_role === "admin" && !validation) || validation ?
                            <tr key={city_name}>
                                <td className={validation ? "blue" : "red"}>{city_name}</td>
                                <td><button className={validation ? "browse blue font-face-gm" : "browse red font-face-gm"} onClick={() => showLists(city_id)}>Chercher</button></td>  
                                {user && user.polyuser_role === "admin" ? <>
                                {!confirm[index] ? <td><button className={validation ? "browse blue font-face-gm" : "browse red font-face-gm"} onClick={() => deleteCity(city_id,index)}>Supprimer</button></td> :
                                <td><button className={validation ? "browse blue font-face-gm" : "browse red font-face-gm"} onClick={() => deleteCity(city_id,index)}>Confirmer</button></td> } </> : null }
                                {user && user.polyuser_role === "admin" && !validation ? <td><button className="browse red font-face-gm" onClick={() => confirmCity(city_id)}>Approuver</button></td> : null }              
                            </tr> : null } </>
                        )}
                        </tbody>
                    </table>
                </div>
                <ul className="color-list">
                    {cityList.map(({list_id, list_name, list_year, validation}) => 
                        <li className="color-item" key={`${list_name}-city`} onClick={() => navigate(`/lists/id/${list_id}`)}>
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

export default City