import { Link } from "react-router-dom";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import Cookies from "universal-cookie";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import "./topbar.css";

function Topbar() {
  const search = useRef();
  const cookies = new Cookies();
  const userData = cookies.get("user_data");
  cookies.set('loggedIn_user_id',userData && userData._id);
  const [searchedUser, setsearchedUser] = useState([]);
  const [selected, setSelected] = useState();
  const history = useNavigate();

  const searchUserHandle = async (e) => {
    e.preventDefault();
    const user = search.current.value;
    if (user.length >= 3) {
      try {
        const res = await axios.get(`/users/search?searchUser=${user}`);
        console.log(res.data);
        setsearchedUser(res.data);
      } catch (err) {}
    }
  };

  const redirectToUser = async (e, index,userValue) => {
    e.preventDefault();
    // const data =
    console.log("e--->", index,userValue);
    try {
      history(`/profile/${userValue && userValue.firstName}`)
    } catch (err) {}
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Social-web-app </span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friends or posts"
            className="searchInput"
            ref={search}
            onChange={searchUserHandle}
            list="user_search"
          />
          {searchedUser.map((userValue,index) => (
            <List component="nav" id="user_search">
              <ListItemButton
              onClick={(event) => redirectToUser(event, index,userValue)}
              >
                <ListItemText
                  primary={userValue.firstName + " " + userValue.lastName}
                />
              </ListItemButton>
            </List>
          ))}
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Home</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${userData && userData.firstName}`}>
          <img
            src={
              userData && userData.profilePicture
                ? `http://localhost:8000/images/${
                    userData && userData.profilePicture
                  }`
                : `http://localhost:8000/images/person/noAvatar.png`
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
