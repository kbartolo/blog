import React, { useState } from "react";
import axios from "axios";

function PostCreate() {
  const [title, setTitle] = useState("");

  const onCreate = async (event) => {
    event.preventDefault();
    if (!title) return;
    const url = "http://posts.com/posts/create";
    await axios.post(url, { title });
  };

  return (
    <form>
      <h1>Create a Post</h1>
      <div style={{ marginTop: 10 }}>Title</div>
      <div style={{ marginTop: 10 }}>
        <input
          className="form-control"
          type="text"
          value={title}
          style={{ width: 380 }}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <button className="btn btn-primary" onClick={onCreate}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default PostCreate;
