"use client";

import PostWithImage from "./PostWithImage";
import PostWithText from "./PostWithText";

const Post = ({ post }) => {
  const hasImages = !!post.fields.images;

  return hasImages ? (
    <PostWithImage post={post} />
  ) : (
    <PostWithText post={post} />
  );
};

export default Post;
