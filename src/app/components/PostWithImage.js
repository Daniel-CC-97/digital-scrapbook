"use client";

import { useState } from "react";
import { addCommentToPost } from "@/lib/contentful";
import PostHeader from "./PostHeader";
import Comments from "./Comments";
import FullScreenModal from "./FullScreenModal";
import AddingCommentModal from "./AddingCommentModal";
import Images from "./Images";

const PostWithImage = ({ post, setPosts }) => {
  const [commentsActive, setCommentsActive] = useState(false);
  const [newComment, setNewComment] = useState(""); // For the new comment text
  const [author, setAuthor] = useState(""); // For the comment author
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false); // Comment modal state
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // Image modal state
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track the current image index
  const [clickedImageIndex, setClickedImageIndex] = useState(null); // For modal image index

  const images = post.fields.images || [];
  const commentAmount = post.fields.comments?.length || 0;

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
    setIsImageModalOpen(true);
  };

  const handleSubmitComment = () => {
    if (newComment && author) {
      const newCommentObj = {
        fields: {
          comment: newComment,
          author: author,
        },
      };

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

      addCommentToPost(post.sys.id, newComment, author)
        .then(() => {
          setNewComment("");
          setAuthor("");
          setIsCommentModalOpen(false); // Close the comment modal
        })
        .catch((err) => {
          console.error("Error adding comment:", err);
        });
    }
  };

  return (
    <div className="my-4">
      <div className="shadow-md border-solid border-2 rounded-lg overflow-hidden border-pastelPink-light">
        {/* Image Carousel */}
        <Images
          images={images}
          handleImageClick={handleImageClick}
          currentImageIndex={currentImageIndex}
          handlePrevImage={handlePrevImage}
          handleNextImage={handleNextImage}
          comments={post.fields.comments || []}
          setCommentsActive={setCommentsActive}
          commentsActive={commentsActive}
          commentAmount={commentAmount}
          setIsCommentModalOpen={setIsCommentModalOpen}
        ></Images>

        {/* Post Content */}
        <PostHeader post={post} image={true}></PostHeader>
      </div>

      {/* Comments Section */}
      <Comments
        commentsActive={commentsActive}
        comments={post.fields.comments}
      ></Comments>

      {/* Modal for Adding Comment */}
      <AddingCommentModal
        isModalOpen={isCommentModalOpen}
        newComment={newComment}
        setNewComment={setNewComment}
        author={author}
        setAuthor={setAuthor}
        handleSubmitComment={handleSubmitComment}
        setIsModalOpen={setIsCommentModalOpen}
      ></AddingCommentModal>

      {/* Full-Screen Modal for Viewing Image */}
      <FullScreenModal
        isModalOpen={isImageModalOpen}
        clickedImageIndex={clickedImageIndex}
        setIsModalOpen={setIsImageModalOpen}
        images={images}
        setClickedImageIndex={setClickedImageIndex}
      ></FullScreenModal>
    </div>
  );
};

export default PostWithImage;
