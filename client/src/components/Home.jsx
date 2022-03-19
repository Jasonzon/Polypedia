import '../styles/Home.css';
import Header from "./Header"
import Select from "./Select"
import ListItem from "./ListItem"
import logo from "../assets/logo-polytech.png"
import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"

function Home({user, setUser, isConnected, setIsConnected}) {

  const navigate = useNavigate()

  const [listList, setListList] = useState([])
  const [lastList, setLastList] = useState([])

  const [select, setSelect] = useState("")
  
  async function getLists() {
    const response = await fetch("http://localhost:5000/listes", {
      method: "GET"
    })

    const parseRes = await response.json()
    setListList(parseRes.slice("").filter((obj) => obj.validation))
    setLastList(parseRes.slice("").filter((obj) => obj.validation).slice(-1)[0])
  }

  useEffect(() => {
    getLists()
  },[])

  return (
    <div>
      <Header user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} />
      <div className="Home">
        <h1>Bienvenue sur Polypedia</h1>
        <div className="home-flex">
          <h2>Chercher une liste : </h2>
          <input onChange={(e)=>setSelect(e.target.value)} value={select} className="input-home" type="search" name="modelsearch" list="data-home"></input>
            <datalist id="data-home">
                {listList.map((obj) => 
                    <option value={Object.values(obj)[1]} key={Object.values(obj)[0]}></option>
                )}
            </datalist>
          <button className="submit-home" onClick={() => navigate(`/lists/name/${select}`)}>Chercher</button>
        </div>
        <div className="info">
          <div>
            <p>Chaque école du réseau Polytech a son BDE (ou CDE). Ils sont mis en place chaque année après que les étudiants, généralent en PEIP1 et en 3A se soient affrontés pendant des campagnes.</p>
            <p>Du début d'année scolaire jusqu'au début des campagnes, les étudiants se rassemblent en listes allant de 10 à 70 membres, choississent un thème sur lequel il vont baser leurs campagnes, ainsi qu'une couleur et une direction artistique</p>
            <p>Ces campagnes sont très attendues car elles sont l'un des évènements associatifs les plus importants de l'école, et il est habituel de suivre aussi les campagnes d'autres villes</p>
            <p>Pour que vous puissiez retrouver les anciennes listes, leurs thèmes et leurs couleurs, afin de retrouver des élèves ou d'éviter de choisir un nom de liste qui ait déjà existé, nous les regroupons sur ce site</p>
            <p>Polypedia est l'encyclopédie des listes Polytech, les utilisateurs peuvent ajouter eux-mêmes les nouvelles listes qui apparaissent chaque année dans le réseau, et aussi rechercher celles qui ont déjà été publiés selon leur nom, thème, ville ou couleur !</p>
            <p>N'attendez pas plus longtemps et cliquez sur le bouton "listes" pour avoir un aperçu de listes présentes sur le site !</p>
          </div>
          <img className="logo-polytech" alt="logo polytech" src={logo}/>
        </div>
        <h2 className="last-list">Voici la dernière liste ajoutée :</h2>
        <ListItem style={"home"} list_id={lastList.list_id} list_name={lastList.list_name} list_color={lastList.list_color} list_theme={lastList.list_theme} list_year={lastList.list_year} list_city={lastList.list_city} list_description={lastList.list_description} validation={lastList.validation} />
      </div>
    </div>
  );
}

export default Home;
