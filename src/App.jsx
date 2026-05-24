import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import LostFound from "./pages/LostFound";
import RequestPage from "./pages/RequestPage";
import Profile from "./pages/Profile";
import Footbar from "./components/footbar";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/Users";
import Items from "./pages/Items";
import Claims from "./pages/Claims";
import "leaflet/dist/leaflet.css";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  // Read from localStorage on startup so the user stays logged in on refresh
  const [isLogged, setLogged] = useState(() => {
    return !!localStorage.getItem("token");
  });

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLogged(false);
  }

  return (
    <Router>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,

          style: {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "14px",
            padding: "14px 18px",
            fontSize: "0.95rem",
            border: "1px solid #374151",
          },

          error: {
            style: {
              background: "#dc2626",
            },
            iconTheme: {
              primary: "white",
              secondary: "#dc2626",
            },
          },
        }}
      />
      
      <Navbar isLogged={isLogged} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setLogged={setLogged} />} />
        <Route path="/signup" element={<Signup setLogged={setLogged} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/request/:id" element={<RequestPage />} />
        <Route path="/lostfound" element={<LostFound />} />
        <Route path="/report-lost" element={<ReportLost />} />
        <Route path="/report-found" element={<ReportFound />} />
        <Route path="/admin" element={<AdminDashboard />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/items" element={<Items />}></Route>
        <Route path="/admin/claims" element={<Claims />} />
      </Routes>
      <Footbar />
    </Router>


  );
}

export default App;