"use client";

import PostWithImage from "./PostWithImage";
import PostWithText from "./PostWithText";

const Post = ({ post, setPosts }) => {
  const hasImages = !!post.fields.images;

  return hasImages ? (
    <PostWithImage post={post} setPosts={setPosts} />
  ) : (
    <PostWithText post={post} setPosts={setPosts} />
  );
};

export default Post;
