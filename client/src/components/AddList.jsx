import "../styles/AddList.css"
import Header from "./Header"
import Select from "./Select"
import {useState, useEffect} from "react"

function AddList({user, setUser, isConnected, setIsConnected}) {

    const [inputs, setInputs] = useState({
        list_name:"",
        list_year:"",
        list_description:"",
        list_city:"",
        list_theme:"",
        list_color:""
    })

    const {list_name, list_year, list_description} = inputs

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const search1 = "search-city"
    const search2 = "search-theme"
    const search3 = "search-color"

    const [colors, setColors] = useState([])
    const [themes, setThemes] = useState([])
    const [cities, setCities] = useState([])

    async function getColors() {
        const response = await fetch("http://localhost:5000/color", {
            method: "GET"
        })
        const parseRes = await response.json()
        setColors(parseRes)
    }

    async function getThemes() {
        const response = await fetch("http://localhost:5000/themes", {
            method: "GET"
        })
        const parseRes = await response.json()
        setThemes(parseRes)
    }

    async function getCities() {
        const response = await fetch("http://localhost:5000/villes", {
            method: "GET"
        })
        const parseRes = await response.json()
        setCities(parseRes)
    }

    useEffect(() => {
        getColors()
        getThemes()
        getCities()
    },[])

    return (
        <div>
            <Header  user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected}/>
            <h1>Ajouter une liste</h1>
            <div className="big-form">
                <div className="list-form">
                    <div className="flex-column">
                        <label>Nom : </label>
                        <label>Année : </label>
                        <label>Description : </label>
                        <label>Ville : </label>
                        <label>Thème : </label>
                        <label>Couleur : </label>
                    </div>
                    <div className="flex-column">
                        <input onChange={(e)=>onChange(e)} value={list_name} className="input-user2" type="text" id="input_name" name="name" required />
                        <input onChange={(e)=>onChange(e)} value={list_year} className="input-user2" type="text" id="input_year" name="year" required />
                        <input onChange={(e)=>onChange(e)} value={list_description} className="input-user2" type="text" id="input_description" name="description" required />
                        <Select inputs={inputs} setInputs={setInputs} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} search={search1} list={cities}/>
                        <Select inputs={inputs} setInputs={setInputs} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} search={search2} list={themes}/>
                        <Select inputs={inputs} setInputs={setInputs} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} search={search3} list={colors}/>
                    </div>
                </div>
                <button className="submit button-user2">OK</button>
            </div>
        </div>
    )
}

export default AddList