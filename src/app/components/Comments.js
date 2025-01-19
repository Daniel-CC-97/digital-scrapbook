const Comments = ({ commentsActive, comments }) => {
  return (
    <>
      {commentsActive && comments.length > 0 && (
        <div className="mt-2 bg-pastelBlue-light p-1 px-2 rounded-lg">
          {comments.map((comment, index) => (
            <p key={index} className="my-1 text-pastelPink-darker">
              <strong>{comment.fields.author}:</strong> {comment.fields.comment}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
