"use client";
import { useState } from "react";
import { createPost } from "@/lib/contentful"; // Import the createPost logic

const AddPostForm = ({ closeModal, setReRender, reRender }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    text: "",
    author: "Daniel", // Default value
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Call the createPost logic
      await createPost({
        title: formData.title,
        image: formData.image,
        text: formData.text,
        author: formData.author,
      });

      setSuccessMessage("Post created successfully!");
      setFormData({
        title: "",
        image: null,
        text: "",
        author: "Daniel",
      });

      setReRender(!reRender);

      // Close the modal after successful submission
      closeModal();
    } catch (error) {
      console.error("Error creating post:", error);
      setErrorMessage("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-md shadow-md"
    >
      <h2 className="text-xl font-bold mb-4">Add a New Post</h2>
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}

      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full border rounded-md p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Image</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Text</label>
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          className="mt-1 block w-full border rounded-md p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Author</label>
        <select
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          className="mt-1 block w-full border rounded-md p-2"
        >
          <option value="Daniel">Daniel</option>
          <option value="Tara">Tara</option>
        </select>
      </div>

      <div className="flex gap-2 mt-4">
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-pastelPink-dark text-white font-medium py-2 px-4 rounded-md hover:bg-pastelPink disabled:bg-gray-400"
        >
          {isSubmitting ? "Submitting..." : "Submit Post"}
        </button>

        {/* Cancel Button */}
        <button
          type="button"
          onClick={closeModal}
          className="bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddPostForm;
