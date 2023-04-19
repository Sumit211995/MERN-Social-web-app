import React from "react";
import Post from "./Post";
import axios from "axios";
// import { Posts } from "../../dummyData";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./feed.css";
// import { post } from "../../../../../BackEnd/Routes/auth";

function Feed({ id }) {
  const [posts, setPosts] = useState([]);
  // const [allUserPost, setAllUserPost] = useState([]);
  const allUserPost = [];
  useEffect(() => {
    const fetchPosts = async () => {
      const ids = await axios.get("posts/");
      console.log("iddddddddddd", ids);
      const allPosts = await Promise.all(
        ids.data.map((friendId) => {
          return axios.get("posts/timeline/" + friendId);
        })
      );
      console.log("all posts--->", allPosts);
      // eslint-disable-next-line array-callback-return
      allPosts.map((data) => {
        const dataArray = data.data;
        dataArray.map((list) => {
          allUserPost.push(list);
        });
      });
      console.log("all User Post--->", allUserPost);

      // ids.map((id)=>{
      //   return   axios.get("posts/timeline/" + id);
      // });

      setPosts(
        allUserPost.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      console.log("post===>", posts);
    };
    fetchPosts();
  }, [id]);
  return (
    <div>
      {posts.map((createPost) => (
        <Post key={createPost.id} postDetails={createPost} />
      ))}
    </div>
  );
}

export default Feed;
