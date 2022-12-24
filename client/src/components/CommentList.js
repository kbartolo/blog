import React from "react";

function CommentList({ comments }) {
  const renderComment = (comment) => {
    if (comment.status === "pending")
      return <li key={comment.id}>Awaiting for moderation</li>;
    if (comment.status === "rejected")
      return <li key={comment.id}>The comment was rejected</li>;

    return <li key={comment.id}>{comment.content}</li>;
  };

  return comments && comments.map((comment) => renderComment(comment));
}

export default CommentList;
