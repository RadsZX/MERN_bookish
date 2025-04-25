import React, { useState } from "react";
import "./Home.css";
import { books } from "../components/books";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookDescription, setBookDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchBookDetails = async (isbn) => {
    if (!isbn) {
      setBookDescription("No ISBN provided.");
      return;
    }

    try {
      const response = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
      const data = await response.json();

      if (data.description) {
        const description =
          typeof data.description === "string"
            ? data.description
            : data.description.value;
        setBookDescription(description);
      } else if (data.notes) {
        setBookDescription(data.notes);
      } else if (data.works && data.works.length > 0) {
        const workRes = await fetch(`https://openlibrary.org${data.works[0].key}.json`);
        const workData = await workRes.json();
        if (workData.description) {
          const workDescription =
            typeof workData.description === "string"
              ? workData.description
              : workData.description.value;
          setBookDescription(workDescription);
        } else {
          setBookDescription("No description available.");
        }
      } else {
        setBookDescription("No description available.");
      }
    } catch (error) {
      console.error("Failed to fetch book details", error);
      setBookDescription("Failed to fetch book description.");
    }
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
    fetchBookDetails(book.isbn);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
    setBookDescription("");
  };

  const addToLibrary = async () => {
    if (!selectedBook) return;

    try {
      const res = await fetch("http://localhost:5000/api/library", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: selectedBook.title,
          imageUrl: selectedBook.imageUrl,
          isbn: selectedBook.isbn,
        }),
      });

      const data = await res.json();
      if (res.status === 201) {
        alert("Book added to your library!");
      } else if (res.status === 409) {
        alert("This book is already in your library.");
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      console.error("Error adding book to library:", error);
      alert("Error adding book to library.");
    }
  };

  return (
    <div className="home-container">
      <h2>Welcome to the Bookish!</h2>
      <p>Join a club, track reading progress & connect with book lovers!</p>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search books"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="featured-books">
        <h3>Featured Books</h3>
        <div className="book-list">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <div key={index} className="book-item" onClick={() => handleBookClick(book)}>
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="book-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150x220?text=No+Cover";
                  }}
                />
                <p>{book.title}</p>
              </div>
            ))
          ) : (
            <p>No books found for "{searchQuery}"</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedBook && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              X
            </button>
            <h2>{selectedBook.title}</h2>
            <img src={selectedBook.imageUrl} alt={selectedBook.title} className="book-cover" />
            <p className="description">
              {typeof bookDescription === "string"
                ? bookDescription
                : "No description available."}
            </p>
            <button className="add-button" onClick={addToLibrary}>
              Add to Library
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
