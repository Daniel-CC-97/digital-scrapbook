"use client";

import Image from "next/image";
import FormatText from "./FormatText";
import { useState } from "react";

const PostWithImage = ({ post }) => {
  const [commentsActive, setCommentsActive] = useState(false);

  const imageUrl = `http:${post.fields.image.fields.file.url}`;
  const imageWidth = post.fields.image.fields.file.details.image.width;
  const imageHeight = post.fields.image.fields.file.details.image.height;

  const comments = post.fields.comments;
  const commentAmount = comments ? comments.length : null;

  return (
    <div className="my-4">
      <div className="relative">
        <Image
          src={imageUrl}
          alt="Hero Image"
          quality={100}
          width={imageWidth}
          height={imageHeight}
          priority={true}
          placeholder="empty"
          layout="responsive"
          className="rounded-t-lg"
        />
        {comments && (
          <div
            className="absolute bottom-2 right-2 flex gap-2 items-center cursor-pointer"
            onClick={() => setCommentsActive(!commentsActive)}
          >
            <span className="text-white font-bold">{commentAmount}</span>
            <img
              className="w-8 h-8"
              src="/icons/comment-regular.svg"
              alt="Comments Icon"
            />
          </div>
        )}
      </div>
      <div className="p-1 px-2 rounded-b-lg bg-pastelPink-light text-pastelBlue-dark">
        <h4 className="font-bold text-lg text-pastelBlue-dark">
          {post.fields.title}
        </h4>
        {post.fields.text && <FormatText text={post.fields.text} />}
      </div>
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

export default PostWithImage;
