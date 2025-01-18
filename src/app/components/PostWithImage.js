"use client";

import { useState, useEffect } from "react";
import FormatText from "./FormatText";
import { addCommentToPost } from "@/lib/contentful"; // Import the function

const PostWithImage = ({ post }) => {
  const [commentsActive, setCommentsActive] = useState(false);
  const [newComment, setNewComment] = useState(""); // To hold the new comment text
  const [author, setAuthor] = useState(""); // To hold the author (could be the logged-in user)
  const [isModalOpen, setIsModalOpen] = useState(false); // To control the modal visibility
  const [comments, setComments] = useState(post.fields.comments || []); // Store comments in state

  const imageUrl = `http:${post.fields.image.fields.file.url}`;
  const imageWidth = post.fields.image.fields.file.details.image.width;
  const imageHeight = post.fields.image.fields.file.details.image.height;

  const commentAmount = comments ? comments.length : 0;

  // Fetch comments again on component mount in case they are updated
  useEffect(() => {
    if (post.fields.comments) {
      setComments(post.fields.comments);
    }
  }, [post.fields.comments]);

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
    } else {
      // Handle error (if any)
    }
  };

  return (
    <div className="my-4">
      <div className="relative">
        <img
          src={imageUrl}
          alt="Hero Image"
          width={imageWidth}
          height={imageHeight}
          className="rounded-t-lg"
        />
        <div className="absolute bottom-2 right-2 flex gap-2">
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
          {/* Button to open the Modal */}
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
      <div className="p-1 px-2 rounded-b-lg bg-pastelPink-light text-pastelBlue-dark">
        <h4 className="font-bold text-lg text-pastelBlue-dark">
          {post.fields.title}
        </h4>
        {post.fields.text && <FormatText text={post.fields.text} />}
      </div>

      {commentsActive && comments.length > 0 && (
        <div className="mt-2 bg-pastelBlue-light p-1 px-2 rounded-lg">
          {comments.map((comment, index) => (
            <p key={index} className="my-1 text-pastelPink-darker">
              <strong>{comment.fields.author}:</strong> {comment.fields.comment}
            </p>
          ))}
        </div>
      )}

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
                className="p-2 bg-pastelPink-light text-white rounded-lg"
              >
                Submit Comment
              </button>
              <button
                onClick={() => setIsModalOpen(false)} // Close the modal
                className="p-2 bg-gray-500 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostWithImage;
