import React from "react";
import CommentList from "./CommentList";
import CommentCreate from "./CommentCreate";

export const PostCard = ({ post }) => {
  const { title, id, comments } = post;
  return (
    <div className="mr-4">
      <h2>{title}</h2>
      <CommentList comments={comments} />
      <CommentCreate postId={id} />
    </div>
  );
};
