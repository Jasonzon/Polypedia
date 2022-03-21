import "../styles/AddList.css"
import Header from "./Header"
import Select from "./Select"
import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"

function AddList({user, setUser, isConnected, setIsConnected}) {

    const navigate = useNavigate()

    const [inputs, setInputs] = useState({
        list_name:"",
        list_year:"",
        list_description:"",
        list_city:"",
        list_theme:"",
        list_color:""
    })

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

    const [styleCity, setStyleCity] = useState("")
    const [styleColor, setStyleColor] = useState("")
    const [styleTheme, setStyleTheme] = useState("")
    const [styleName, setStyleName] = useState("")
    const [styleYear, setStyleYear] = useState("")
    const [styleDescription, setStyleDescription] = useState("")

    async function submitAll() {

        const newCity = inputs.list_city.charAt(0).toUpperCase() + inputs.list_city.slice(1).toLowerCase()
        const newColor = inputs.list_color.charAt(0).toUpperCase() + inputs.list_color.slice(1).toLowerCase()
        const newTheme = inputs.list_theme.charAt(0).toUpperCase() + inputs.list_theme.slice(1).toLowerCase()
        const newName = inputs.list_name.charAt(0).toUpperCase() + inputs.list_name.slice(1).toLowerCase()
        const newYear = inputs.list_year
        const newDescription = inputs.list_description.charAt(0).toUpperCase() + inputs.list_description.slice(1).toLowerCase()

        if (newCity !== "" && newColor !== "" && newTheme !== "" && newName !== "" && newTheme !== "" && newDescription !== "") {
            var CITY = 0
            var COLOR = 0
            var THEME = 0

            const response_city = await fetch(`http://localhost:5000/villes/name/${newCity}`, {
                method: "GET"
            })
            const parseRes_city = await response_city.json()
            if (parseRes_city.length !== 0) {
                var CITY = parseRes_city[0].city_id
            }
            
            const response_color = await fetch(`http://localhost:5000/color/name/${newColor}`, {
                method: "GET"
            })
            const parseRes_color = await response_color.json()
            if (parseRes_color.length !== 0) {
                var COLOR = parseRes_color[0].color_id
            }

            const response_theme = await fetch(`http://localhost:5000/themes/name/${newTheme}`, {
                method: "GET"
            })
            const parseRes_theme = await response_theme.json()
            if (parseRes_theme.length !== 0) {
                var THEME = parseRes_theme[0].theme_id
            }
            setStyleCity("")
            setStyleColor("")
            setStyleTheme("")
            setStyleName("")
            setStyleYear("")
            setStyleDescription("")

            if (parseRes_city.length === 0) {
                const body_city = {name:newCity.replace(/[^a-zA-Z0-9_-]/g,'')}
                const res_city = await fetch("http://localhost:5000/villes", {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(body_city)
                })
                const parseRes_CITY = await res_city.json()
                CITY = parseRes_CITY.city_id
            }

            if (parseRes_color.length === 0) {
                const body_color = {name:newColor.replace(/[^a-zA-Z0-9_-]/g,'')}
                const res_color = await fetch("http://localhost:5000/color", {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(body_color)
                })
                const parseRes_COLOR = await res_color.json()
                COLOR = parseRes_COLOR.color_id
            }

            if (parseRes_theme.length === 0) {
                const body_theme = {name:newTheme.replace(/[^a-zA-Z0-9_-]/g,'')}
                const res_theme = await fetch("http://localhost:5000/themes", {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(body_theme)
                })
                const parseRes_THEME = await res_theme.json()
                THEME = parseRes_THEME.theme_id
            }

            const body_list = {
                name:newName.replace(/[^a-zA-Z0-9_-]/g,''),
                year:parseInt(newYear.toString().replace(/[^0-9]/g,'')),
                description:newDescription,
                theme:THEME,
                color:COLOR,
                city:CITY,
                user:user.polyuser_id
            }

            const response_list = await fetch("http://localhost:5000/listes", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body_list)
            })
            
            const parseRes_list = await response_list.json()
            goNav(parseRes_list.list_id)
        }
        else {
            if (newCity === "") {
                setStyleCity("red-border")
            }
            else {
                setStyleCity("")
            }
            if (newColor === "") {
                setStyleColor("red-border")
            }
            else {
                setStyleColor("")
            }
            if (newTheme === "") {
                setStyleTheme("red-border")
            }
            else {
                setStyleName("")
            }
            if (newName === "") {
                setStyleName("red-border")
            }
            else {
                setStyleName("")
            }
            if (newYear === "") {
                setStyleYear("red-border")
            }
            else {
                setStyleYear("")
            }
            if (newDescription === "") {
                setStyleDescription("red-border")
            }
            else {
                setStyleDescription("")
            }
        }
    }

    async function goNav(path) {
        navigate(`/lists/id/${path}`)
    }

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
                        <input onChange={(e)=>onChange(e)} value={inputs.list_name.replace(/[^a-zA-Z0-9_-]/g,'')} className={`input-user2 ${styleName}`} type="text" id="input_name" name="list_name" maxLength="20" required />
                        {styleName === "" ? null : <span className="little-text">Vous devez rentrer un nom</span>}
                        <input onChange={(e)=>onChange(e)} value={inputs.list_year.toString().replace(/[^0-9]/g,'')} className={`input-user2 ${styleYear}`} type="text" id="input_year" name="list_year" maxLength="4" required />
                        {styleYear === "" ? null : <span className="little-text">Vous devez rentrer une année</span>}
                        <input onChange={(e)=>onChange(e)} value={inputs.list_description} className={`input-user2 ${styleDescription}`} type="text" id="input_description" name="list_description" maxLength="500" required />
                        {styleDescription === "" ? null : <span className="little-text">Vous devez rentrer une description</span>}
                        <Select style={styleCity} value="city" name={"list_city"} inputs={inputs} setInputs={setInputs} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} search={search1} list={cities.filter((obj) => obj.validation)}/>
                        {styleCity === "" ? null : <span className="little-text">Vous devez rentrer une ville</span>}
                        <Select style={styleTheme} value="theme" name={"list_theme"} inputs={inputs} setInputs={setInputs} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} search={search2} list={themes.filter((obj) => obj.validation)}/>
                        {styleTheme === "" ? null : <span className="little-text">Vous devez rentrer un thème</span>}
                        <Select style={styleColor} value="color" name={"list_color"} inputs={inputs} setInputs={setInputs} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} search={search3} list={colors.filter((obj) => obj.validation)}/>
                        {styleColor === "" ? null : <span className="little-text">Vous devez rentrer une couleur</span>}
                    </div>
                </div>
                <button className="submit button-user2" onClick={submitAll}>OK</button>
            </div>
        </div>
    )
}

export default AddList