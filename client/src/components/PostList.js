import React, { useEffect, useState } from "react";
import axios from "axios";
import { PostCard } from "./PostCard";

function PostList() {
  const [posts, setPosts] = useState({});

  const getPosts = async () => {
    const res = await axios.get("http://localhost:4500/posts");
    console.log(res.data);
    setPosts(res.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="d-flex flex-row">
      {posts &&
        Object.values(posts).map((post, key) => (
          <PostCard post={post} key={key} />
        ))}
    </div>
  );
}

export default PostList;
