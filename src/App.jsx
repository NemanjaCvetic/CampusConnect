import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

    const [isLogged, setLogged] = useState(false);
  return (
    <Router>
      <Navbar isLogged = {isLogged} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path ="/login" element={<Login setLogged = {setLogged}/>}/>
        <Route path ="/signup" element={<Signup setLogged = {setLogged}/>}/>
      </Routes>
    </Router>
  );
}

export default App;