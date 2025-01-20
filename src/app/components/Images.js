const Images = ({
  images,
  handleImageClick,
  currentImageIndex,
  handlePrevImage,
  handleNextImage,
  comments,
  setCommentsActive,
  commentsActive,
  commentAmount,
  setIsModalOpen,
}) => {
  return (
    <div className="relative">
      {images.length > 0 && (
        <div>
          <img
            src={`http:${images[currentImageIndex].fields.file.url}`}
            alt="Post image"
            width={images[currentImageIndex].fields.file.details.image.width}
            height={images[currentImageIndex].fields.file.details.image.height}
            className=" w-full cursor-pointer" // Add cursor pointer for interactivity
            onClick={() => handleImageClick(currentImageIndex)} // Click to open the modal
          />
          {images.length > 1 && (
            <>
              <button
                className="bg-pastelPink-light/50 backdrop-blur-sm w-8 h-8 my-auto absolute top-0 left-2 bottom-0 bg-opacity-50 text-white rounded-full"
                onClick={handlePrevImage}
              >
                &#8249; {/* Left arrow */}
              </button>
              <button
                className="bg-pastelPink-light/50 backdrop-blur-sm w-8 h-8 my-auto absolute top-0 right-2 bottom-0 bg-opacity-50 text-white rounded-full"
                onClick={handleNextImage}
              >
                &#8250; {/* Right arrow */}
              </button>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {images.map((_, index) => (
                  <span
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                      index === currentImageIndex
                        ? "bg-pastelPink-dark"
                        : "bg-white opacity-50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
      <div className="absolute z-10 bg-pastelPink-light/50 backdrop-blur-sm p-2 rounded-tl-lg bottom-0 right-0 flex gap-2">
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
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex gap-2 items-center cursor-pointer"
          >
            <img
              className="w-8 h-8"
              src="/icons/add-comment.svg"
              alt="Add Comments Icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Images;
