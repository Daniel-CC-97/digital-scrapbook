"use client";
import { getPosts } from "@/lib/contentful";
import { useEffect, useState } from "react";
import Post from "./Post.js";
import AddPostButton from "./AddPostButton.js";
import FilterUI from "./FilterUI.js";
import Masonry from "react-masonry-css";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filters, setFilters] = useState({
    author: "",
    type: "",
    dateRange: { start: null, end: null },
    keyword: "",
  });
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

  useEffect(() => {
    const applyFilters = () => {
      let filtered = posts;

      // Filter by author
      if (filters.author) {
        filtered = filtered.filter(
          (post) => post.fields.author === filters.author
        );
      }

      // Filter by post type
      if (filters.type) {
        filtered = filtered.filter((post) => {
          const hasImages = !!post.fields.images;
          return (
            (filters.type === "TextPost" && !hasImages) ||
            (filters.type === "ImagePost" && hasImages)
          );
        });
      }

      // Filter by date range
      if (filters.dateRange.start || filters.dateRange.end) {
        filtered = filtered.filter((post) => {
          const postDate = new Date(post.fields.date);
          const startDate = filters.dateRange.start
            ? new Date(filters.dateRange.start)
            : null;
          const endDate = filters.dateRange.end
            ? new Date(filters.dateRange.end)
            : null;

          return (
            (!startDate || postDate >= startDate) &&
            (!endDate || postDate <= endDate)
          );
        });
      }

      // Filter by keyword
      if (filters.keyword) {
        filtered = filtered.filter(
          (post) =>
            post.fields.title
              ?.toLowerCase()
              .includes(filters.keyword.toLowerCase()) ||
            post.fields.text
              ?.toLowerCase()
              .includes(filters.keyword.toLowerCase())
        );
      }

      setFilteredPosts(filtered);
    };

    applyFilters();
  }, [filters, posts]);

  const masonryBreakpoints = {
    default: 4,
    1100: 3,
    768: 2,
    480: 1,
  };

  return (
    <div className="relative overflow-scroll h-screen p-4">
      {/* Filter UI */}
      <FilterUI filters={filters} setFilters={setFilters} />

      {/* Masonry Layout */}
      <Masonry
        breakpointCols={masonryBreakpoints}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {filteredPosts.map((post, index) => (
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
