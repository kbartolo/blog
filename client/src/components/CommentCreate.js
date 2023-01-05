import axios from "axios";
import React, { useState } from "react";

function CommentCreate({ postId }) {
  const [comment, setComment] = useState("");
  const onCreateComment = async (event) => {
    event.preventDefault();
    const url = `http://posts.com/posts/${postId}/comments`;
    await axios.post(url, { content: comment });
  };

  return (
    <>
      <div className="mt-3 form-group">Comment</div>
      <textarea
        rows="3"
        type="text"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        className="form-control"
      />
      <div className="mt-3">
        <input
          type="button"
          className="btn btn-success"
          value="Submit Comment"
          onClick={onCreateComment}
        />
      </div>
    </>
  );
}

export default CommentCreate;
