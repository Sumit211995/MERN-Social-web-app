import React from "react";
import Topbar from "../components/topbar/Topbar";
import Postbar from "../components/postbar/Postbar";

import Feed from "../components/feed/Feed";

import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "./home.css";

function Home() {
  const history = useNavigate();
  const cookies = new Cookies();
  const userData = cookies.get("user_data");
  const id = userData ? userData._id : '';
  if (id === undefined){
    history('/'); 
  }
  return (
    <>
      {" "}
      <Topbar />
      <Postbar />
      <div className="homeContainer">
        
        <Feed id={id} />
        
      </div>
    </>
  );
}

export default Home;
