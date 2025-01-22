import { useState } from "react";

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
  setIsCommentModalOpen,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const imageUrl = images[currentImageIndex].fields.file.url;

  // Generate low-quality placeholder URL
  const lowQualityUrl = `http:${imageUrl}?w=20&h=20&fm=jpg&q=10`;

  // Full-quality URL
  const fullQualityUrl = `http:${imageUrl}`;

  return (
    <div className="relative">
      <div className={images.length > 1 ? "h-96" : ""}>
        {/* Low-Quality Placeholder Image */}
        <img
          src={lowQualityUrl}
          alt="Low-quality placeholder"
          className={`w-full h-full object-cover ${
            !isLoaded ? "blur-sm scale-110" : "hidden"
          } transition-all duration-300`}
        />

        {/* Full-Quality Image */}
        <img
          src={fullQualityUrl}
          alt="Post image"
          loading="lazy"
          width={images[currentImageIndex].fields.file.details.image.width}
          height={images[currentImageIndex].fields.file.details.image.height}
          className={`w-full h-full object-cover cursor-pointer ${
            isLoaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
          onLoad={() => setIsLoaded(true)}
          onClick={() => handleImageClick(currentImageIndex)}
        />
      </div>

      {/* Navigation Buttons (if multiple images) */}
      {images.length > 1 && (
        <>
          <button
            className="bg-pastelPink-light/50 backdrop-blur-sm flex justify-center items-center w-10 h-10 my-auto absolute top-1/2 left-2 transform -translate-y-1/2 bg-opacity-50 rounded-full rotate-180"
            onClick={handlePrevImage}
          >
            <img
              className="w-8 h-8"
              src="/icons/chevron-right.svg"
              alt="Previous Image"
            />
          </button>
          <button
            className="bg-pastelPink-light/50 backdrop-blur-sm flex justify-center items-center w-10 h-10 my-auto absolute top-1/2 right-2 transform -translate-y-1/2 bg-opacity-50 rounded-full"
            onClick={handleNextImage}
          >
            <img
              className="w-8 h-8"
              src="/icons/chevron-right.svg"
              alt="Next Image"
            />
          </button>
        </>
      )}

      {/* Comments Section */}
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
            onClick={() => setIsCommentModalOpen(true)}
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
