"use client";
import { getPosts } from "@/lib/contentful";
import { useEffect, useState } from "react";
import Post from "./Post.js";
import AddPostButton from "./AddPostButton.js";
import Masonry from "react-masonry-css"; // Import Masonry

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [reRender, setReRender] = useState(false);

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
  }, [reRender]);

  const masonryBreakpoints = {
    default: 4, // Number of columns for large screens
    1100: 3, // Number of columns for screens smaller than 1100px
    768: 2, // Number of columns for screens smaller than 768px
    480: 1, // Number of columns for screens smaller than 480px
  };

  return (
    <div className="relative overflow-scroll h-screen p-4">
      {/* Masonry Layout */}
      <Masonry
        breakpointCols={masonryBreakpoints}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {posts.map((post, index) => (
          <div key={index} className="mb-4">
            <Post post={post} />
          </div>
        ))}
      </Masonry>
      {/* Add Post Button */}
      <AddPostButton setReRender={setReRender} reRender={reRender} />
    </div>
  );
};

export default Feed;
