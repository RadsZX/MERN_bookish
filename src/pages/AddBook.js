import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useClubContext } from "../context/ClubContext";
import "./AddBook.css";
 
const AddBook = () => {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const { clubs, updateClubBooks } = useClubContext();
 
  const [club, setClub] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookType, setBookType] = useState("current"); // current, upcoming, or previous
  const [errors, setErrors] = useState({});
 
  // Find the club when component mounts
  useEffect(() => {
    const foundClub = clubs.find((c) => c.id === clubId);
    setClub(foundClub);
    setIsLoading(false);
  }, [clubId, clubs]);
 
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setErrors({});
  };
 
  // Perform book search
  const searchBooks = async () => {
    if (!searchTerm.trim()) {
      setErrors({ search: "Please enter a book title or author" });
      return;
    }
 
    setIsSearching(true);
    setSearchResults([]);
 
    try {
      // Check if search term looks like an author name (contains a space and no special characters except hyphen)
      const isLikelyAuthor =
        /^[A-Za-z\s-]+$/.test(searchTerm) && searchTerm.includes(" ");
 
      // Construct the URL based on search type
      let searchUrl;
      if (isLikelyAuthor) {
        // Search by author
        searchUrl = `https://openlibrary.org/search.json?author=${encodeURIComponent(
          searchTerm
        )}&limit=10`;
      } else {
        // Try both fields
        searchUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(
          searchTerm
        )}&limit=10`;
      }
 
      const response = await fetch(searchUrl);
      const data = await response.json();
 
      if (data.docs && data.docs.length > 0) {
        // Format the search results
        const formattedResults = data.docs.map((book) => ({
          title: book.title,
          author: book.author_name ? book.author_name[0] : "Unknown Author",
          cover: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "https://via.placeholder.com/150x220?text=No+Cover",
          year: book.first_publish_year || "Unknown",
          isbn: book.isbn ? book.isbn[0] : null,
        }));
 
        setSearchResults(formattedResults);
      } else {
        // If no results found and we didn't try a general search yet, try again with the general search
        if (isLikelyAuthor) {
          const backupResponse = await fetch(
            `https://openlibrary.org/search.json?q=${encodeURIComponent(
              searchTerm
            )}&limit=10`
          );
          const backupData = await backupResponse.json();
 
          if (backupData.docs && backupData.docs.length > 0) {
            const formattedResults = backupData.docs.map((book) => ({
              title: book.title,
              author: book.author_name ? book.author_name[0] : "Unknown Author",
              cover: book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : "https://via.placeholder.com/150x220?text=No+Cover",
              year: book.first_publish_year || "Unknown",
              isbn: book.isbn ? book.isbn[0] : null,
            }));
 
            setSearchResults(formattedResults);
          } else {
            setSearchResults([]);
          }
        } else {
          setSearchResults([]);
        }
      }
    } catch (error) {
      console.error("Error searching books:", error);
      setErrors({ search: "Error searching books. Please try again." });
    } finally {
      setIsSearching(false);
    }
  };
 
  // Handle book selection
  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setErrors({});
  };
 
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
 
    if (!selectedBook) {
      setErrors({ book: "Please select a book" });
      return;
    }
 
    // Prepare the book object
    const bookToAdd = {
      ...selectedBook,
      progress: bookType === "current" ? 0 : null,
      meetingDate: bookType === "current" ? getDefaultMeetingDate() : null,
      addedDate: new Date().toLocaleDateString(),
    };
 
    // Update the club with the new book
    updateClubBooks(clubId, bookToAdd, bookType);
 
    // Navigate back to the club detail page
    navigate(`/clubs/${clubId}`);
  };
 
  // Generate a default meeting date (2 weeks from now)
  const getDefaultMeetingDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };
 
  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchBooks();
  };
 
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
 
  if (!club) {
    return (
      <div className="add-book-container not-found">
        <h2>Club Not Found</h2>
        <p>
          The club you're looking for doesn't exist or you don't have permission
          to add books.
        </p>
        <button onClick={() => navigate("/clubs")}>Back to Clubs</button>
      </div>
    );
  }
 
  return (
    <div className="add-book-container">
      <div className="add-book-header">
        <button
          className="back-button"
          onClick={() => navigate(`/clubs/${clubId}`)}
        >
          ← Back to Club
        </button>
        <h1>Add a Book to {club.name}</h1>
      </div>
 
      <div className="add-book-content">
        <div className="book-type-selection">
          <h2>What type of book are you adding?</h2>
          <div className="book-type-options">
            <label
              className={`book-type-option ${
                bookType === "current" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="bookType"
                value="current"
                checked={bookType === "current"}
                onChange={() => setBookType("current")}
              />
              <div className="option-content">
                <h3>Currently Reading</h3>
                <p>The book your club is reading now</p>
              </div>
            </label>
 
            <label
              className={`book-type-option ${
                bookType === "upcoming" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="bookType"
                value="upcoming"
                checked={bookType === "upcoming"}
                onChange={() => setBookType("upcoming")}
              />
              <div className="option-content">
                <h3>Upcoming Book</h3>
                <p>A book your club plans to read next</p>
              </div>
            </label>
 
            <label
              className={`book-type-option ${
                bookType === "previous" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="bookType"
                value="previous"
                checked={bookType === "previous"}
                onChange={() => setBookType("previous")}
              />
              <div className="option-content">
                <h3>Previously Read</h3>
                <p>A book your club has already finished</p>
              </div>
            </label>
          </div>
        </div>
 
        <div className="book-search-section">
          <h2>Search for a Book</h2>
          <p className="search-guidance">
            Enter a book title or author name (e.g., "Stephen King" or "The
            Shining")
          </p>
          <form onSubmit={handleSearchSubmit} className="search-form">
            <div className="search-input-group">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by title or author name..."
                className="search-input"
              />
              <button
                type="submit"
                className="search-button"
                disabled={isSearching}
              >
                {isSearching ? "Searching..." : "Search"}
              </button>
            </div>
            {errors.search && <p className="error-message">{errors.search}</p>}
          </form>
 
          <div className="search-results">
            {isSearching ? (
              <div className="searching-indicator">Searching for books...</div>
            ) : searchResults.length > 0 ? (
              <div className="results-grid">
                {searchResults.map((book, index) => (
                  <div
                    key={index}
                    className={`book-result ${
                      selectedBook === book ? "selected" : ""
                    }`}
                    onClick={() => handleSelectBook(book)}
                  >
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="book-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/150x220?text=No+Cover";
                      }}
                    />
                    <div className="book-info">
                      <h3>{book.title}</h3>
                      <p>by {book.author}</p>
                      <p className="book-year">{book.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchTerm && !isSearching ? (
              <div className="no-results">
                No books found. Try a different search term.
              </div>
            ) : null}
          </div>
        </div>
 
        {selectedBook && (
          <div className="selected-book-section">
            <h2>Selected Book</h2>
            <div className="selected-book-display">
              <img
                src={selectedBook.cover}
                alt={selectedBook.title}
                className="selected-book-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/150x220?text=No+Cover";
                }}
              />
              <div className="selected-book-details">
                <h3>{selectedBook.title}</h3>
                <p className="selected-book-author">by {selectedBook.author}</p>
                {bookType === "current" && (
                  <div className="meeting-date-field">
                    <label>Discussion Date (Optional)</label>
                    <input
                      type="text"
                      placeholder={getDefaultMeetingDate()}
                      className="meeting-date-input"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
 
        {errors.book && <p className="error-message center">{errors.book}</p>}
 
        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate(`/clubs/${clubId}`)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="submit-button"
            onClick={handleSubmit}
            disabled={!selectedBook}
          >
            Add Book to Club
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default AddBook;
 