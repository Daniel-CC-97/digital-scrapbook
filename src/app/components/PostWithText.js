"use client";

import { useState, useEffect } from "react";
import { addCommentToPost } from "@/lib/contentful"; // Import the function
import PostHeader from "./PostHeader";
import Comments from "./Comments";
import AddingCommentModal from "./AddingCommentModal";
import AddingComment from "./AddingComment";

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
    <div className="my-4 shadow-md">
      <PostHeader post={post} image={false}></PostHeader>

      <AddingComment
        comments={comments}
        setCommentsActive={setCommentsActive}
        commentsActive={commentsActive}
        setIsModalOpen={setIsModalOpen}
        commentAmount={commentAmount}
      ></AddingComment>

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
    </div>
  );
};

export default PostWithText;
