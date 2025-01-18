"use client";

import PostWithImage from "./PostWithImage";
import PostWithText from "./PostWithText";

const Post = ({ post }) => {
  const hasImage = !!post.fields.image;

  return hasImage ? (
    <PostWithImage post={post} />
  ) : (
    <PostWithText post={post} />
  );
};

export default Post;
