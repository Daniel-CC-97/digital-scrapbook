"use client";
import { getPosts } from "@/lib/contentful";
import { useEffect, useState } from "react";
import Post from "./Post";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getPosts();
        console.log("allPosts: ", allPosts);
        setPosts(allPosts);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Feed</h1>
      {posts.map((post, index) => (
        <Post post={post} key={index}></Post>
      ))}
    </div>
  );
};

export default Feed;
