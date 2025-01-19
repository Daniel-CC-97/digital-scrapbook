"use client";

import { useState, useEffect } from "react";
import { addCommentToPost } from "@/lib/contentful"; // Import the function
import PostHeader from "./PostHeader";
import Comments from "./Comments";

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
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add a Comment</h3>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here"
              className="w-full p-2 mt-2 border rounded-lg"
            />
            <div className="mt-2">
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700"
              >
                Author
              </label>
              <select
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full p-2 mt-2 border rounded-lg"
              >
                <option value="">Select Author</option>
                <option value="Daniel">Daniel</option>
                <option value="Tara">Tara</option>
              </select>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleSubmitComment}
                className="p-2 bg-pastelPink-dark text-white rounded-lg hover:bg-pastelPink"
              >
                Submit Comment
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Modal for Viewing Image */}
      {isModalOpen && clickedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={() => setIsModalOpen(false)} // Close modal when clicking outside
        >
          <img
            src={`http:${images[clickedImageIndex].fields.file.url}`}
            alt="Full-screen image"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking the image
          />
          {/* Close Button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute w-8 h-8 top-4 right-4 bg-white text-black rounded-full shadow-lg"
          >
            &times; {/* Close icon */}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostWithImage;
