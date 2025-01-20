const FullScreenModal = ({
  setIsModalOpen,
  isModalOpen,
  clickedImageIndex,
  setClickedImageIndex, // Added to update the index
  images,
}) => {
  const handleNextImage = (e) => {
    e.stopPropagation(); // Prevent closing the modal when clicking the button
    setClickedImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = (e) => {
    e.stopPropagation(); // Prevent closing the modal when clicking the button
    setClickedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      {isModalOpen && clickedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex gap-2 justify-center items-center z-50"
          onClick={() => setIsModalOpen(false)} // Close modal when clicking outside
        >
          {images.length > 1 && (
            <button
              className="bg-pastelPink-light/50 backdrop-blur-sm flex justify-center items-center w-10 h-10 bg-opacity-50 rounded-full rotate-180"
              onClick={handlePrevImage}
            >
              <img
                className="w-8 h-8"
                src="/icons/chevron-right.svg"
                alt="Add Comments Icon"
              />
            </button>
          )}
          <img
            src={`http:${images[clickedImageIndex].fields.file.url}`}
            alt="Full-screen image"
            className="max-w-full max-h-full object-contain relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking the image
          />

          {/* Close Button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute w-10 h-10 top-4 right-4 bg-pastelPink-light/50 backdrop-blur-sm rounded-full shadow-lg flex justify-center items-center w-10 h-10 bg-opacity-50"
          >
            <img
              className="w-8 h-8"
              src="/icons/close.svg"
              alt="Add Comments Icon"
            />
          </button>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <button
              className="bg-pastelPink-light/50 backdrop-blur-sm flex justify-center items-center w-10 h-10 bg-opacity-50 rounded-full"
              onClick={handleNextImage}
            >
              <img
                className="w-8 h-8"
                src="/icons/chevron-right.svg"
                alt="Add Comments Icon"
              />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default FullScreenModal;
