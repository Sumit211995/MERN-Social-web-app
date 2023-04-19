import "./profile.css";
import Topbar from "../components/topbar/Topbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useParams } from "react-router";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const cookies = new Cookies();
  const loggedInUserID = cookies.get("loggedIn_user_id");
  const history = useNavigate();

  const [user, setUser] = useState({});
  const username = useParams().firstName;

  const handleLogout = (e) => {
    e.preventDefault();
    history("/login");
    cookies.remove("user_data");
    window.location.reload();
  };
  //
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?firstName=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  console.log("id check", user._id, loggedInUserID);

  const handleFollow = async (e) => {
    try {
      const followResponse = await axios.put(`/users/${user._id}/follow`);
    } catch {}
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        {/* <Sidebar /> */}
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? `http://localhost:8000/images/${user.coverPicture}`
                    : `http://localhost:8000/images/person/noAvatar.png`
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user && user.profilePicture
                    ? `http://localhost:8000/images/${user.profilePicture}`
                    : `http://localhost:8000/images/person/noAvatar.png`
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <span className="profileInfoName">
                {user.firstName + " " + user.lastName}
              </span>
              <span className="profileInfoName">{user.email}</span>
              <span className="profileInfoDesc">{user.desc}</span>
              <div className="logout_user">
                {user._id === loggedInUserID ? (
                  <Button
                    id="btn"
                    className="button"
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                  <div>
                    <Button
                      id="btn"
                      className="button"
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={handleFollow}
                    >
                      Follow
                    </Button>
                    <Button
                      id="btn"
                      className="button"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Unfollow
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
