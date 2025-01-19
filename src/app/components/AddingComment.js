const AddingComment = ({
  comments,
  setCommentsActive,
  commentsActive,
  setIsModalOpen,
  commentAmount,
}) => {
  return (
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
  );
};

export default AddingComment;
