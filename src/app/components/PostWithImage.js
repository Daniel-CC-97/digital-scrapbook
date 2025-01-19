"use client";

import { useState, useEffect } from "react";
import { addCommentToPost } from "@/lib/contentful"; // Import the function
import PostHeader from "./PostHeader";
import Comments from "./Comments";
import FullScreenModal from "./FullScreenModal";
import AddingCommentModal from "./AddingCommentModal";
import Images from "./Images";

const PostWithImage = ({ post }) => {
  const [commentsActive, setCommentsActive] = useState(false);
  const [newComment, setNewComment] = useState(""); // To hold the new comment text
  const [author, setAuthor] = useState(""); // To hold the author
  const [isModalOpen, setIsModalOpen] = useState(false); // To control the modal visibility
  const [comments, setComments] = useState(post.fields.comments || []); // Store comments in state
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track the current image index
  const [clickedImageIndex, setClickedImageIndex] = useState(null); // Track the clicked image index for modal

  const images = post.fields.images || []; // Get all images
  const commentAmount = comments ? comments.length : 0;

  // Fetch comments again on component mount in case they are updated
  useEffect(() => {
    if (post.fields.comments) {
      setComments(post.fields.comments);
    }
  }, [post.fields.comments]);

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

  // Handle click on the image to open the modal
  const handleImageClick = (index) => {
    setClickedImageIndex(index); // Set clicked image index for modal
    setIsModalOpen(true); // Open the modal
  };

  const handleSubmitComment = () => {
    if (newComment && author) {
      addCommentToPost(post.sys.id, newComment, author)
        .then(() => {
          // Update the local state with the new comment
          setComments((prevComments) => [
            ...prevComments,
            { fields: { comment: newComment, author } },
          ]);
          // Clear the input after successful submission
          setNewComment("");
          setAuthor("");
          setIsModalOpen(false); // Close the modal after submission
        })
        .catch((err) => {
          console.error("Error adding comment:", err);
          // Handle the error here if needed
        });
    }
  };

  return (
    <div className="my-4">
      {/* Image Carousel */}
      <Images
        images={images}
        handleImageClick={handleImageClick}
        currentImageIndex={currentImageIndex}
        handlePrevImage={handlePrevImage}
        handleNextImage={handleNextImage}
        comments={comments}
        setCommentsActive={setCommentsActive}
        commentsActive={commentsActive}
        commentAmount={commentAmount}
        setIsModalOpen={setIsModalOpen}
      ></Images>

      {/* Post Content */}
      <PostHeader post={post} image={true}></PostHeader>

      {/* Comments Section */}
      <Comments commentsActive={commentsActive} comments={comments}></Comments>

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
