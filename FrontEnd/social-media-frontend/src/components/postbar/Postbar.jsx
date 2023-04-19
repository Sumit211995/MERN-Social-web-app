import "./postbar.css";
import { PermMedia, Cancel } from "@mui/icons-material";
import axios from "axios";
import { useRef, useState } from "react";
import Cookies from "universal-cookie";

export default function Postbar() {
  const desc = useRef();
  const [file, setFile] = useState(null);
  const cookies = new Cookies();
  const userData = cookies.get("user_data");
  const id = userData ? userData._id : "";

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: id,
      description: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      console.log("desc--->", newPost);
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };
  return (
    <div className="share">
      <div className="postWrapper">
        <div className="postTop">
          <img
            className="shareProfileImg"
            src={
              userData && userData.profilePicture
                ? `http://localhost:8000/images/${userData.profilePicture}`
                : `http://localhost:8000/images/person/noAvatar.png`
            }
            alt=""
          />
          <input
            placeholder="What's in your mind?"
            className="postInput"
            ref={desc}
          />
        </div>
        <hr className="postHr" />
        {file && (
          <div className="postImgContainer">
            <img className="postImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="postCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="postBottom" onSubmit={submitHandler}>
          <div className="postOptions">
            <label htmlFor="file" className="postOption">
              <PermMedia htmlColor="tomato" className="postIcon" />
              <span className="postOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
          <button className="postButton">Share</button>
        </form>
      </div>
    </div>
  );
}
