"use client";
import { useState } from "react";
import AddPostForm from "./AddPostForm"; // Ensure this imports the form

const AddPostButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Button to open the modal */}
      <button
        onClick={openModal}
        className="bg-pastelPink-dark fixed bottom-2 right-2 text-white font-medium py-2 px-4 rounded-md hover:bg-pastelPink-light"
      >
        Add Post
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-lg w-full relative">
            {/* Pass closeModal as a prop to AddPostForm */}
            <AddPostForm closeModal={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default AddPostButton;
