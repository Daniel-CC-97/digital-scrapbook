"use client";

import FormatText from "./FormatText";
import { useState } from "react";

const PostWithText = ({ post }) => {
  const [commentsActive, setCommentsActive] = useState(false);

  const comments = post.fields.comments;
  const commentAmount = comments ? comments.length : null;

  return (
    <div className="my-4">
      <div className="p-1 px-2 rounded-lg bg-pastelPink-darker text-pastelBlue-light">
        <h4 className="font-bold text-lg text-pastelBlue-light">
          {post.fields.title}
        </h4>
        {post.fields.text && <FormatText text={post.fields.text} />}
      </div>
      {comments && (
        <div
          className="mt-2 flex items-center gap-2 cursor-pointer"
          onClick={() => setCommentsActive(!commentsActive)}
        >
          <span className="text-pastelBlue-light font-bold">
            {commentAmount}
          </span>
          <img
            className="w-8 h-8"
            src="/icons/comment-regular.svg"
            alt="Comments Icon"
          />
        </div>
      )}
      {commentsActive && comments && (
        <div className="mt-2 bg-pastelBlue-light p-3 rounded-lg">
          {comments.map((comment) => (
            <p key={comment.sys.id} className="mb-2 text-pastelPink-darker">
              {comment.fields.comment}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostWithText;
