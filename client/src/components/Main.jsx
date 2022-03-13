import Home from './Home';
import User from "./User"
import Error from "./Error"
import Color from "./Color"
import City from "./City"
import Theme from './Theme';
import List from './List';
import Manage from "./Manage"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {useState, Fragment} from "react"

function Main() {
    const [user, setUser] = useState({})
    const [isConnected, setIsConnected] = useState(false)
  return (
    <Fragment>
        <Router>
            <Routes>
                <Route exact path="/" element={<Home user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} />} />
                <Route exact path="/lists" element={<List user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} />} />
                <Route exact path="/cities" element={<City user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} />} />
                <Route exact path="/themes" element={<Theme user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} />} />
                <Route exact path="/colors" element={<Color user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} />} />
                <Route exact path="/user" element={<User user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} />} />
                <Route exact path="/manage" element={<Manage user={user} setUser={setUser} isConnected={isConnected} setIsConnected={setIsConnected} />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    </Fragment>
    )
}

export default Main

