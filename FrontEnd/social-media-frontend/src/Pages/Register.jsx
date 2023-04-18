import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./register.css"


function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useNavigate();

   const handleRegisterClick = async(e) =>{
    e.preventDefault();
    const user= {
      "firstName": firstName,
      "lastName" : lastName,
      "email": email,
      "password": password
    }
    console.log("user details: ", user);
    //API Call and data send to server
    try{  
      await axios.post("/auth/register",user).then(function (response) {
        // handle success
        history("/login");
        console.log(response);
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
    <div className="container">
    <div className="registerHeading">
    <h1>Social-Web-App</h1>
      <p>Connecting people & share your thoughts...</p>
    </div>
      
<div className="registerForm">
    <form className="register" onSubmit={handleRegisterClick}>
    <h1>Sign up</h1>
    <TextField
        className="firstName"
        id="outlined-basic"
        label="firstName"
        variant="outlined"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <br></br>
        <br></br>
      <TextField
        className="lastName"
        id="outlined-basic"
        label="lastName"
        variant="outlined"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
        <br></br>
        <br></br>
      <TextField
        className="email"
        id="outlined-basic"
        label="Email"
        variant="outlined"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br></br>
      <br></br>
      <TextField
        className="password"
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br></br>
      <br></br>
      <Button id="btn" className="button" type="submit" variant="contained" color="primary">
        Signup
      </Button>
    </form>
      
    </div>


    </div>
    
  );
}

export default Register;