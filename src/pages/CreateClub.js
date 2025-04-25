import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateClub.css";
import { useClubContext } from "../context/ClubContext";
 
const CreateClub = () => {
  const navigate = useNavigate();
  const { addNewClub } = useClubContext();
 
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "fiction",
    genres: [],
    image: "",
    customImage: "",
  });
 
  const [customGenre, setCustomGenre] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const genreOptions = [
    {
      label: "Contemporary Fiction",
      value: "Contemporary Fiction",
      category: "fiction",
    },
    {
      label: "Literary Fiction",
      value: "Literary Fiction",
      category: "fiction",
    },
    {
      label: "Historical Fiction",
      value: "Historical Fiction",
      category: "fiction",
    },
    { label: "Science Fiction", value: "Science Fiction", category: "fiction" },
    { label: "Fantasy", value: "Fantasy", category: "fiction" },
    { label: "Mystery", value: "Mystery", category: "fiction" },
    { label: "Thriller", value: "Thriller", category: "fiction" },
    { label: "Horror", value: "Horror", category: "fiction" },
    { label: "Romance", value: "Romance", category: "fiction" },
    { label: "Biography", value: "Biography", category: "non-fiction" },
    { label: "Autobiography", value: "Autobiography", category: "non-fiction" },
    { label: "Memoir", value: "Memoir", category: "non-fiction" },
    { label: "Self-Help", value: "Self-Help", category: "non-fiction" },
    { label: "Business", value: "Business", category: "non-fiction" },
    { label: "History", value: "History", category: "non-fiction" },
    { label: "Science", value: "Science", category: "non-fiction" },
    { label: "Philosophy", value: "Philosophy", category: "non-fiction" },
    { label: "Poetry", value: "Poetry", category: "other" },
    { label: "Drama", value: "Drama", category: "other" },
    { label: "Comics", value: "Comics", category: "other" },
  ];
 
  const backgroundImages = [
    {
      url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "fiction",
    },
    {
      url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "fiction",
    },
    {
      url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "fiction",
    },
    {
      url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "non-fiction",
    },
    {
      url: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "non-fiction",
    },
    {
      url: "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "other",
    },
  ];
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
 
    // Clear errors for the field being edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };
 
  const handleGenreChange = (genre) => {
    // Toggle genre selection
    if (formData.genres.includes(genre)) {
      setFormData({
        ...formData,
        genres: formData.genres.filter((g) => g !== genre),
      });
    } else {
      // Limit to 3 genres
      if (formData.genres.length < 3) {
        setFormData({
          ...formData,
          genres: [...formData.genres, genre],
        });
      }
    }
  };
 
  const handleAddCustomGenre = () => {
    if (
      customGenre &&
      !formData.genres.includes(customGenre) &&
      formData.genres.length < 3
    ) {
      setFormData({
        ...formData,
        genres: [...formData.genres, customGenre],
      });
      setCustomGenre("");
    }
  };
 
  const handleImageSelect = (imageUrl) => {
    setFormData({ ...formData, image: imageUrl });
  };
 
  const validateForm = () => {
    const newErrors = {};
 
    if (!formData.name.trim()) {
      newErrors.name = "Club name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Club name must be at least 3 characters";
    }
 
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }
 
    if (formData.genres.length === 0) {
      newErrors.genres = "Select at least one genre";
    }
 
    if (!formData.image && !formData.customImage) {
      newErrors.image = "Select an image for your club";
    }
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    if (validateForm()) {
      setIsSubmitting(true);
 
      // Generate a unique ID for the club
      const clubId = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
 
      // Create the new club object
      const newClub = {
        id: clubId,
        name: formData.name,
        description: formData.description,
        category: formData.category,
        genres: formData.genres,
        members: 1, // Start with the creator
        currentBook: "Not selected yet",
        booksRead: 0,
        foundedDate: new Date().toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
        image: formData.customImage || formData.image,
        isPopular: false,
        readingHistory: [],
      };
 
      // Add the club to context
      addNewClub(newClub);
 
      // Navigate to the new club page
      setTimeout(() => {
        navigate(`/clubs/${clubId}`);
      }, 1000);
    }
  };
 
  return (
    <div className="create-club-container">
      <h1>Create a New Book Club</h1>
      <p className="subtitle">
        Start your own reading community and connect with fellow book lovers
      </p>
 
      <form onSubmit={handleSubmit} className="create-club-form">
        <div className="form-section">
          <h2>Basic Information</h2>
 
          <div className="form-group">
            <label htmlFor="name">Club Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., The Page Turners"
              maxLength={50}
            />
            {errors.name && <span className="error">{errors.name}</span>}
            <div className="char-counter">{formData.name.length}/50</div>
          </div>
 
          <div className="form-group">
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell potential members about your club..."
              rows={5}
              maxLength={500}
            />
            {errors.description && (
              <span className="error">{errors.description}</span>
            )}
            <div className="char-counter">
              {formData.description.length}/500
            </div>
          </div>
 
          <div className="form-group">
            <label>Category*</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="category"
                  value="fiction"
                  checked={formData.category === "fiction"}
                  onChange={handleChange}
                />
                <span>Fiction</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="category"
                  value="non-fiction"
                  checked={formData.category === "non-fiction"}
                  onChange={handleChange}
                />
                <span>Non-Fiction</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="category"
                  value="other"
                  checked={formData.category === "other"}
                  onChange={handleChange}
                />
                <span>Other</span>
              </label>
            </div>
          </div>
        </div>
 
        <div className="form-section">
          <h2>Genres</h2>
          <p className="hint">
            Select up to 3 genres that your club will focus on
          </p>
 
          <div className="genres-selection">
            {genreOptions
              .filter((genre) => genre.category === formData.category)
              .map((genre) => (
                <label
                  key={genre.value}
                  className={`genre-checkbox ${
                    formData.genres.includes(genre.value) ? "selected" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.genres.includes(genre.value)}
                    onChange={() => handleGenreChange(genre.value)}
                  />
                  <span>{genre.label}</span>
                </label>
              ))}
          </div>
 
          <div className="custom-genre">
            <input
              type="text"
              value={customGenre}
              onChange={(e) => setCustomGenre(e.target.value)}
              placeholder="Add a custom genre"
              maxLength={30}
            />
            <button
              type="button"
              onClick={handleAddCustomGenre}
              disabled={formData.genres.length >= 3 || !customGenre.trim()}
            >
              Add
            </button>
          </div>
 
          {errors.genres && <span className="error">{errors.genres}</span>}
 
          {formData.genres.length > 0 && (
            <div className="selected-genres">
              <p>Selected genres:</p>
              <div className="genre-tags">
                {formData.genres.map((genre) => (
                  <span key={genre} className="genre-tag">
                    {genre}
                    <button
                      type="button"
                      onClick={() => handleGenreChange(genre)}
                      className="remove-genre"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
 
        <div className="form-section">
          <h2>Club Image</h2>
          <p className="hint">Choose an image that represents your club</p>
 
          <div className="image-selection">
            {backgroundImages
              .filter(
                (img) =>
                  img.category === formData.category || img.category === "all"
              )
              .map((image, index) => (
                <div
                  key={index}
                  className={`image-option ${
                    formData.image === image.url ? "selected" : ""
                  }`}
                  onClick={() => handleImageSelect(image.url)}
                >
                  <img src={image.url} alt={`Option ${index + 1}`} />
                  {formData.image === image.url && (
                    <div className="selected-overlay">
                      <span>✓</span>
                    </div>
                  )}
                </div>
              ))}
          </div>
 
          <div className="form-group">
            <label htmlFor="customImage">Or paste an image URL:</label>
            <input
              type="text"
              id="customImage"
              name="customImage"
              value={formData.customImage}
              onChange={handleChange}
              placeholder="https://example.com/your-image.jpg"
            />
          </div>
 
          {errors.image && <span className="error">{errors.image}</span>}
        </div>
 
        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/clubs")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Club"}
          </button>
        </div>
      </form>
    </div>
  );
};
 
export default CreateClub;