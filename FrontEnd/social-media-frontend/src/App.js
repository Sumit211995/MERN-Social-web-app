import React from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "./context/AuthContext";

function App() {
  // const { user } = useContext(AuthContext);
  const cookies = new Cookies();
  const userData = cookies.get("user_data");

  return (
    <Router>
      <Routes>
        {/* <Route exact path="/"> {user ? <Home /> : <Register />} </Route>  */}
        <Route path="/login" element={
            userData ? <Home /> : <Login />
          }></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route
          path="/"
          element={
            userData ? <Home /> : <Login />
          }
        ></Route>
        <Route path="/profile/:firstName" element={<Profile />}></Route> 
      </Routes>
    </Router>
  );
}

export default App;
