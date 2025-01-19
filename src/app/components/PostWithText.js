"use client";

import { useState, useEffect } from "react";
import { addCommentToPost } from "@/lib/contentful"; // Import the function
import PostHeader from "./PostHeader";
import Comments from "./Comments";

const PostWithText = ({ post }) => {
  const [commentsActive, setCommentsActive] = useState(false);
  const [newComment, setNewComment] = useState(""); // To hold the new comment text
  const [author, setAuthor] = useState(""); // To hold the author (could be the logged-in user)
  const [isModalOpen, setIsModalOpen] = useState(false); // To control the modal visibility
  const [comments, setComments] = useState(post.fields.comments || []); // Store comments in state

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
      <PostHeader post={post} image={false}></PostHeader>

      <div className="flex justify-end bg-pastelPink-darker rounded-b-lg">
        <div className="flex gap-2 bg-pastelPink-darker p-1 rounded-b-lg">
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
                alt="Add Comment Icon"
              />
            </button>
          </div>
        </div>
      </div>

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
                onClick={() => setIsModalOpen(false)} // Close the modal
                className="bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-400"
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

export default PostWithText;
