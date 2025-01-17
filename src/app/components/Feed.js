"use client";
import { getPosts } from "@/lib/contentful";
import { useEffect, useState } from "react";
import Post from "./Post";
import Header from "./Header";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col items-center overflow-scroll h-screen">
      <Header />
      <div className="w-100% mx-4 md:w-2/5 md:mx-0">
        {posts.map((post, index) => (
          <Post post={post} key={index}></Post>
        ))}
      </div>
    </div>
  );
};

export default Feed;
