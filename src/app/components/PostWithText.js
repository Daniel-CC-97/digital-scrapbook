"use client";

import { useState } from "react";
import { addCommentToPost } from "@/lib/contentful"; // Import the function
import PostHeader from "./PostHeader";
import Comments from "./Comments";
import AddingCommentModal from "./AddingCommentModal";
import AddingComment from "./AddingComment";

const PostWithText = ({ post, setPosts }) => {
  const [commentsActive, setCommentsActive] = useState(false);
  const [newComment, setNewComment] = useState(""); // To hold the new comment text
  const [author, setAuthor] = useState(""); // To hold the author (could be the logged-in user)
  const [isModalOpen, setIsModalOpen] = useState(false); // To control the modal visibility

  const commentAmount = post.fields.comments?.length || 0; // Use comments directly from the parent

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
        });
    }
  };

  return (
    <div className="my-4 shadow-md border-solid border-2 rounded-lg overflow-hidden border-pastelPink-light">
      <PostHeader post={post} image={false}></PostHeader>

      <AddingComment
        comments={post.fields.comments || []} // Pass comments directly
        setCommentsActive={setCommentsActive}
        commentsActive={commentsActive}
        setIsModalOpen={setIsModalOpen}
        commentAmount={commentAmount}
      ></AddingComment>

      <Comments
        commentsActive={commentsActive}
        comments={post.fields.comments}
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
    </div>
  );
};

export default PostWithText;
