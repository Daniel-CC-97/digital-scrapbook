"use client";

import { useState, useEffect } from "react";
import { addCommentToPost } from "@/lib/contentful"; // Import the function
import PostHeader from "./PostHeader";
import Comments from "./Comments";
import FullScreenModal from "./FullScreenModal";
import AddingComment from "./AddingComment";

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
      <div className="relative">
        {images.length > 0 && (
          <div>
            <img
              src={`http:${images[currentImageIndex].fields.file.url}`}
              alt="Post image"
              width={images[currentImageIndex].fields.file.details.image.width}
              height={
                images[currentImageIndex].fields.file.details.image.height
              }
              className="rounded-t-lg cursor-pointer" // Add cursor pointer for interactivity
              onClick={() => handleImageClick(currentImageIndex)} // Click to open the modal
            />
            {images.length > 1 && (
              <>
                <button
                  className="bg-black w-8 h-8 my-auto absolute top-0 left-2 bottom-0 bg-opacity-50 text-white rounded-full"
                  onClick={handlePrevImage}
                >
                  &#8249; {/* Left arrow */}
                </button>
                <button
                  className="bg-black w-8 h-8 my-auto absolute top-0 right-2 bottom-0 bg-opacity-50 text-white rounded-full"
                  onClick={handleNextImage}
                >
                  &#8250; {/* Right arrow */}
                </button>

                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {images.map((_, index) => (
                    <span
                      key={index}
                      className={`h-2 w-2 rounded-full ${
                        index === currentImageIndex
                          ? "bg-pastelPink-dark"
                          : "bg-white opacity-50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
        <div className="absolute z-10 bottom-2 right-2 flex gap-2">
          {comments.length > 0 && (
            <button
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => setCommentsActive(!commentsActive)}
            >
              <span className="text-white font-bold">{commentAmount}</span>
              <img
                className="w-8 h-8"
                src="/icons/comment-regular.svg"
                alt="Comments Icon"
              />
            </button>
          )}
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex gap-2 items-center cursor-pointer"
            >
              <img
                className="w-8 h-8"
                src="/icons/add-comment.svg"
                alt="Add Comments Icon"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <PostHeader post={post} image={true}></PostHeader>

      {/* Comments Section */}
      <Comments commentsActive={commentsActive} comments={comments}></Comments>

      {/* Modal for Adding Comment */}
      <AddingComment
        isModalOpen={isModalOpen}
        newComment={newComment}
        setNewComment={setNewComment}
        author={author}
        setAuthor={setAuthor}
        handleSubmitComment={handleSubmitComment}
        setIsModalOpen={setIsModalOpen}
      ></AddingComment>

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
