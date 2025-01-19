const AddingComment = ({
  isModalOpen,
  newComment,
  setNewComment,
  author,
  setAuthor,
  handleSubmitComment,
  setIsModalOpen,
}) => {
  return (
    <>
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
    </>
  );
};

export default AddingComment;
