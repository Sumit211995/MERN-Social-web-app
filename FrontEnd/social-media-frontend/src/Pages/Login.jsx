import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Cookies from 'universal-cookie';
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useNavigate();

  const handleRegisterClick = async(e) =>{
    e.preventDefault();
    const user= {
      "email": email,
      "password": password
    }
    console.log("user details: ", user);
    //API Call and data send to server
    try{  
      await axios.post("/auth/login",user).then(function (response) {
        // handle success
        const cookies = new Cookies();
        cookies.set('user_data',response.data);
        history("/");
        window.location.reload();
        console.log("response after login--->",response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      }) 
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="container" id="login">
      <div id="LoginHeading">
    <h1>Social-Web-App</h1>
      <p>Connecting people & share your thoughts...</p>
    </div>

    <div className="loginForm">
      
     <form className="login" onSubmit={handleRegisterClick}>
     <h1>Login</h1>
     <TextField
        label="Email"
        id="outlined-basic"
        variant="outlined"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <br></br>
      <br></br>
      <TextField
        label="Password"
        id="outlined-basic"
        variant="outlined"
        type="password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br></br>
      <br></br>
      <Button id="btn" type="submit" variant="contained" color="primary">
        Login
      </Button>
      <p>Don't have an account? <Link to="/Register">Signup</Link></p>
     </form>
      
    </div>
    </div>
    
  );
}
export default Login;
