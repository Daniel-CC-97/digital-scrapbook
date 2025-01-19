const FullScreenModal = ({
  setIsModalOpen,
  isModalOpen,
  clickedImageIndex,
  images,
}) => {
  return (
    <>
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
    </>
  );
};

export default FullScreenModal;
