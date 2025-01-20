"use client";

import { useState } from "react";
import { addCommentToPost } from "@/lib/contentful"; // Import the function
import PostHeader from "./PostHeader";
import Comments from "./Comments";
import FullScreenModal from "./FullScreenModal";
import AddingCommentModal from "./AddingCommentModal";
import Images from "./Images";

const PostWithImage = ({ post, setPosts }) => {
  const [commentsActive, setCommentsActive] = useState(false);
  const [newComment, setNewComment] = useState(""); // For the new comment text
  const [author, setAuthor] = useState(""); // For the comment author
  const [isModalOpen, setIsModalOpen] = useState(false); // To control the modal visibility
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track the current image index
  const [clickedImageIndex, setClickedImageIndex] = useState(null); // For modal image index

  const images = post.fields.images || []; // Get all images
  const commentAmount = post.fields.comments?.length || 0; // Use comments directly from parent state

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleImageClick = (index) => {
    setClickedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleSubmitComment = () => {
    if (newComment && author) {
      const newCommentObj = {
        fields: {
          comment: newComment,
          author: author,
        },
      };

      // Update posts state in parent
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.sys.id === post.sys.id
            ? {
                ...p,
                fields: {
                  ...p.fields,
                  comments: [...(p.fields.comments || []), newCommentObj],
                },
              }
            : p
        )
      );

      // Send comment to Contentful
      addCommentToPost(post.sys.id, newComment, author)
        .then(() => {
          setNewComment("");
          setAuthor("");
          setIsModalOpen(false);
        })
        .catch((err) => {
          console.error("Error adding comment:", err);
          // Optionally revert state changes on error
        });
    }
  };

  return (
    <div className="my-4 shadow-md border-solid border-2 rounded-lg overflow-hidden border-pastelPink-light">
      {/* Image Carousel */}
      <Images
        images={images}
        handleImageClick={handleImageClick}
        currentImageIndex={currentImageIndex}
        handlePrevImage={handlePrevImage}
        handleNextImage={handleNextImage}
        comments={post.fields.comments || []} // Pass comments directly
        setCommentsActive={setCommentsActive}
        commentsActive={commentsActive}
        commentAmount={commentAmount}
        setIsModalOpen={setIsModalOpen}
      ></Images>

      {/* Post Content */}
      <PostHeader post={post} image={true}></PostHeader>

      {/* Comments Section */}
      <Comments
        commentsActive={commentsActive}
        comments={post.fields.comments} // Pass comments directly
      ></Comments>

      {/* Modal for Adding Comment */}
      <AddingCommentModal
        isModalOpen={isModalOpen}
        newComment={newComment}
        setNewComment={setNewComment}
        author={author}
        setAuthor={setAuthor}
        handleSubmitComment={handleSubmitComment}
        setIsModalOpen={setIsModalOpen}
      ></AddingCommentModal>

      {/* Full-Screen Modal for Viewing Image */}
      <FullScreenModal
        isModalOpen={isModalOpen}
        clickedImageIndex={clickedImageIndex}
        setIsModalOpen={setIsModalOpen}
        images={images}
      ></FullScreenModal>
    </div>
  );
};

export default PostWithImage;
