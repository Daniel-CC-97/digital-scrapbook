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
    <div className="flex flex-col items-center mt-4">
      <div className="w-2/5">
        {posts.map((post, index) => (
          <Post post={post} key={index}></Post>
        ))}
      </div>
    </div>
  );
};

export default Feed;
