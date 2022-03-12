import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Home from './components/Home';
import User from "./components/User"
import Error from "./components/Error"
import Color from "./components/Color"
import City from "./components/City"
import Theme from './components/Theme';
import List from './components/List';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/lists" element={<List/>} />
        <Route exact path="/cities" element={<City/>} />
        <Route exact path="/themes" element={<Theme/>} />
        <Route exact path="/colors" element={<Color/>} />
        <Route exact path="/user" element={<User/>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

