import "./post.css";
import { MoreVert } from "@mui/icons-material";
// import { Users } from "../../dummyData";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { format } from "timeago.js";
import axios from "axios";

function Post({ postDetails, ids }) {
  const cookies = new Cookies();
  const userData = cookies.get("user_data");
  const [like, setLike] = useState(postDetails.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  // const imagePath = "localhost:8000/images/"

  useEffect(() => {
    console.log("userIddd--", postDetails.userId);
    const fetchUser = async () => {
      const res = await axios.get(`/users?id=${postDetails.userId}`);
      console.log("rsponse data---->", res);
      setUser(res.data);
    };
    fetchUser();
  }, [postDetails.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + postDetails._id + "/like", {
        userId: postDetails.userId,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={
                user && user.profilePicture
                  ? `http://localhost:8000/images/${user.profilePicture}`
                  : `http://localhost:8000/images/person/noAvatar.png`
              }
              alt=""
            />
            <span className="postUsername">
              {user && user.firstName + " " + user.lastName}
            </span>
            <span className="postDate">{format(postDetails.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{postDetails?.description}</span>
          <img
            className="postImg"
            src={`http://localhost:8000/images/${postDetails.img}`}
            alt=""
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="assets/like.jpg"
              onClick={likeHandler}
              alt=""
            />
            {/* <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" /> */}
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {postDetails.comment} comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
