import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const fileInputRef = useRef();
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [readBooks, setReadBooks] = useState([]);
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [toRead, setToRead] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const { userId } = useParams();

  const fetchBookshelves = async () => {
    const res = await fetch(`http://localhost:5000/api/users/${userId}/bookshelves`);
    const data = await res.json();
    if (res.ok) {
      setReadBooks(data.read);
      setCurrentlyReading(data.currentlyReading);
      setToRead(data.toRead);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${userId}`);
        const data = await res.json();

        if (res.ok && data.profilePic) {
          setImage(`http://localhost:5000/${data.profilePic}`);
          if (data.username) {
            setUsername(data.username);
          }
        }
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    const fetchAllBooks = async () => {
      const res = await fetch("http://localhost:5000/api/library");
      const data = await res.json();
      setAllBooks(data);
    };

    fetchUserProfile();
    fetchBookshelves();
    fetchAllBooks();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}/profile-pic`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        const uploadedUrl = `http://localhost:5000/${data.filePath}`;
        setImage(uploadedUrl);
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      alert("An error occurred while uploading the image.");
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleUsernameSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}/username`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      if (response.ok) {
        setIsEditing(false);
        alert("Username updated successfully");
      } else {
        alert(data.message || "Failed to update username");
      }
    } catch (err) {
      alert("An error occurred while updating the username.");
    }
  };

  const moveBook = async (bookId, fromShelf, toShelf) => {
    await fetch(`http://localhost:5000/api/users/${userId}/move-book`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId, fromShelf, toShelf }),
    });
    fetchBookshelves();
  };

  const addBookToShelf = async (bookId, shelf) => {
    await fetch(`http://localhost:5000/api/users/${userId}/add-book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId, shelf }),
    });
    fetchBookshelves();
  };

  return (
    <div className="container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-pic" onClick={() => fileInputRef.current.click()}>
          {image ? (
            <img src={image} alt="Profile" className="uploaded-pic" />
          ) : (
            <span className="plus">+</span>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
        <div>
          <h1 className="username">
            {isEditing ? (
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="username-input"
                autoFocus
              />
            ) : (
              username || "Loading..."
            )}
          </h1>
          <p className="joined">Joined in April 2025</p>
          {isEditing ? (
            <button onClick={handleUsernameSave}>Save</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>
      </div>

      {/* Bookshelves */}
      <div className="section">
        <h2>Your Bookshelves</h2>

        {["Read", "Currently Reading", "To-Read"].map((shelf, idx) => {
          const books = [readBooks, currentlyReading, toRead][idx];
          const shelfKey = ["read", "currentlyReading", "toRead"][idx];
          return (
            <div className="shelf" key={shelf}>
              <h3>
                {shelf} ({books.length})
              </h3>
              {books.map((book) => (
                <div key={book._id}>
                  <img src={book.imageUrl} alt={book.title} className="book-cover" />
                  <p>{book.title}</p>
                  {["read", "currentlyReading", "toRead"]
                    .filter((s) => s !== shelfKey)
                    .map((targetShelf) => (
                      <button
                        key={targetShelf}
                        onClick={() => moveBook(book._id, shelfKey, targetShelf)}
                      >
                        Move to {targetShelf}
                      </button>
                    ))}
                </div>
              ))}

              {/* Only for To-Read shelf, show book dropdown */}
              {shelf === "To-Read" && (
                <div style={{ marginTop: "10px" }}>
                  <h4>Add a new book to To-Read:</h4>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        addBookToShelf(e.target.value, "toRead");
                        e.target.value = "";
                      }
                    }}
                  >
                    <option value="">Select a book</option>
                    {allBooks.map((book) => (
                      <option key={book._id} value={book._id}>
                        {book.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Friends */}
      <div className="section">
        <h2>{username}'s Friends</h2>
        <p className="link">Invite your friends »</p>
      </div>

      {/* Year in Books */}
      <div className="year-in-books">
        <h2>Your 2024 Year in Books</h2>
        <p>Enjoy a look back at the books you read this year, including some fun facts about your reading.</p>
        <p className="link">Go to Your 2024 Year in Books »</p>
      </div>
    </div>
  );
};

export default Profile;
