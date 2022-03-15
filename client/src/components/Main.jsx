import Home from './Home';
import User from "./User"
import Error from "./Error"
import Color from "./Color"
import City from "./City"
import Theme from './Theme';
import List from './List';
import Manage from "./Manage"
import AddList from "./AddList"
import AddCity from "./AddCity"
import AddColor from "./AddColor"
import AddTheme from "./AddTheme"
import ListChoose from "./ListChoose"
import ModifUser from "./ModifUser"
import ListSpec from './ListSpec'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {useState, Fragment, useEffect} from "react"

function Main() {
    const [user, setUser] = useState({})
    const [isConnected, setIsConnected] = useState(false)
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

    useEffect(() => {
        getList()
    },[])
  return (
    <Fragment>
        <Router>
            <Routes>
                <Route exact path="/" element={<Home user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} />} />
                <Route exact path="/lists/all" element={<List path={""} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} />} />
                <Route exact path="/lists/name/:name" element={<ListSpec user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} />} />
                <Route exact path="/cities" element={<City user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} />} />
                <Route exact path="/themes" element={<Theme user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} />} />
                <Route exact path="/colors" element={<Color user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} />} />
                <Route exact path="/user" element={<User user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} />} />
                <Route exact path="/user/modif" element={<ModifUser user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} />} />
                <Route exact path="/manage" element={<Manage user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} />} />
                <Route exact path="/lists/add" element={<AddList user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} />} />
                <Route exact path="/cities/add" element={<AddCity user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} />} />
                <Route exact path="/colors/add" element={<AddColor user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} />} />
                <Route exact path="/themes/add" element={<AddTheme user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} />} />
                {list.length === 0 ? null : <Route exact path="/lists/id/:id" element={<ListChoose list={list} user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} />} /> }
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    </Fragment>
    )
}

export default Main

