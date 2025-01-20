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
              onClick={handlePrevImage}
              className=" w-8 h-8 bg-pastelPink-light text-pastelPink-darker rounded-full shadow-lg left-4"
            >
              &#8249; {/* Left arrow */}
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
            className="absolute w-8 h-8 top-4 right-4 bg-pastelPink-light text-pastelPink-darker rounded-full shadow-lg"
          >
            &times; {/* Close icon */}
          </button>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <button
              onClick={handleNextImage}
              className=" w-8 h-8 bg-pastelPink-light text-pastelPink-darker rounded-full shadow-lg right-4"
            >
              &#8250; {/* Right arrow */}
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default FullScreenModal;
