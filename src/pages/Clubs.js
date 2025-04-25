import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import "./Clubs.css";
import { useClubContext } from "../context/ClubContext";
 
const Clubs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const {
    joinClub,
    leaveClub,
    isClubMember,
    clubs: userCreatedClubs,
  } = useClubContext();
 
  const defaultClubs = [
    {
      id: "fiction-lovers",
      name: "Fiction Lovers",
      description: "For fans of storytelling and immersive plots.",
      members: 342,
      category: "fiction",
      genres: [
        "Contemporary Fiction",
        "Literary Fiction",
        "Historical Fiction",
      ],
      currentBook: "The Silent Patient",
      booksRead: 14,
      foundedDate: "March 2023",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      isPopular: true,
    },
    {
      id: "science-fiction-enthusiasts",
      name: "Science Fiction Enthusiasts",
      description: "Explore futuristic worlds and advanced technologies.",
      members: 218,
      category: "fiction",
      genres: ["Science Fiction", "Space Opera", "Cyberpunk"],
      currentBook: "Project Hail Mary",
      booksRead: 9,
      foundedDate: "January 2023",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      isPopular: true,
    },
    {
      id: "non-fiction-buffs",
      name: "Non-Fiction Buffs",
      description:
        "For those who love real-life stories and learning new things.",
      members: 156,
      category: "non-fiction",
      genres: ["Self-Help", "Biography", "Popular Science"],
      currentBook: "Atomic Habits",
      booksRead: 7,
      foundedDate: "February 2023",
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      isPopular: false,
    },
    {
      id: "fantasy-addicts",
      name: "Fantasy Addicts",
      description: "Dive into magical worlds of fantasy and adventure.",
      members: 289,
      category: "fiction",
      genres: ["Epic Fantasy", "Urban Fantasy", "Dark Fantasy"],
      currentBook: "The Name of the Wind",
      booksRead: 12,
      foundedDate: "December 2022",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      isPopular: true,
    },
    {
      id: "mystery-and-thrillers",
      name: "Mystery and Thrillers",
      description: "If you enjoy suspenseful books that keep you guessing.",
      members: 176,
      category: "fiction",
      genres: ["Crime", "Psychological Thriller", "Mystery"],
      currentBook: "The Guest List",
      booksRead: 8,
      foundedDate: "February 2023",
      image:
        "https://images.unsplash.com/photo-1553617753-705c651cc564?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      isPopular: false,
    },
    {
      id: "history-buffs",
      name: "History Buffs",
      description: "For those who love history and learning about the past.",
      members: 134,
      category: "non-fiction",
      genres: ["World History", "Ancient History", "Military History"],
      currentBook: "Sapiens: A Brief History of Humankind",
      booksRead: 6,
      foundedDate: "March 2023",
      image:
        "https://images.unsplash.com/photo-1461360228754-6e81c478b882?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      isPopular: false,
    },
    {
      id: "self-improvement",
      name: "Self Improvement",
      description: "Focus on personal growth and development.",
      members: 201,
      category: "non-fiction",
      genres: ["Self-Help", "Psychology", "Business"],
      currentBook: "Thinking, Fast and Slow",
      booksRead: 10,
      foundedDate: "January 2023",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      isPopular: true,
    },
    {
      id: "poetry-circle",
      name: "Poetry Circle",
      description:
        "Explore and discuss beautiful poetry from around the world.",
      members: 98,
      category: "other",
      genres: ["Poetry", "Classics", "Contemporary Poetry"],
      currentBook: "Milk and Honey",
      booksRead: 5,
      foundedDate: "April 2023",
      image:
        "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      isPopular: false,
    },
  ];
 
  // Combine default clubs with user-created clubs
  const bookClubs = [...defaultClubs, ...userCreatedClubs];
 
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
 
  // Filter clubs based on search query and category filter
  const filteredClubs = bookClubs
    .filter(
      (club) =>
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((club) => {
      if (filter === "all") return true;
      if (filter === "popular") return club.isPopular;
      return club.category === filter;
    });
 
  const handleClubClick = (clubId) => {
    navigate(`/clubs/${clubId}`);
  };
 
  // Function to handle join/leave club button click
  const handleJoinClick = (e, clubId) => {
    e.stopPropagation(); // Prevent navigation to club detail page
 
    if (isClubMember(clubId)) {
      leaveClub(clubId);
    } else {
      joinClub(clubId);
    }
  };
 
  const handleCreateClubClick = () => {
    navigate("/clubs/create");
  };
 
  return (
    <div className="clubs-container">
      <div className="clubs-header">
        <h2>Explore Book Clubs</h2>
        <p>
          Find your literary community and join discussions with fellow readers
        </p>
      </div>
 
      <div className="clubs-filters">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search Book Clubs"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>
 
        <div className="category-filters">
          <button
            className={`filter-button ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All Clubs
          </button>
          <button
            className={`filter-button ${filter === "popular" ? "active" : ""}`}
            onClick={() => setFilter("popular")}
          >
            Popular
          </button>
          <button
            className={`filter-button ${filter === "fiction" ? "active" : ""}`}
            onClick={() => setFilter("fiction")}
          >
            Fiction
          </button>
          <button
            className={`filter-button ${
              filter === "non-fiction" ? "active" : ""
            }`}
            onClick={() => setFilter("non-fiction")}
          >
            Non-Fiction
          </button>
          <button
            className={`filter-button ${filter === "other" ? "active" : ""}`}
            onClick={() => setFilter("other")}
          >
            Other
          </button>
        </div>
      </div>
 
      <div className="book-club-grid">
        {filteredClubs.length > 0 ? (
          filteredClubs.map((club) => (
            <div
              key={club.id}
              className="club-card"
              onClick={() => handleClubClick(club.id)}
            >
              <div
                className="club-card-image"
                style={{ backgroundImage: `url(${club.image})` }}
              >
                {club.isPopular && (
                  <span className="popular-badge">Popular</span>
                )}
                {isClubMember(club.id) && (
                  <span className="member-badge">Member</span>
                )}
              </div>
              <div className="club-card-content">
                <h3>{club.name}</h3>
                <p className="club-description">{club.description}</p>
                <div className="club-meta">
                  <span className="members-count">{club.members} members</span>
                  <span className="dot-separator">•</span>
                  <span className="current-book">
                    Reading: {typeof club.currentBook === 'object' ? club.currentBook.title : club.currentBook}
                  </span>
                </div>
                <div className="club-stats">
                  <span className="books-read">
                    <i className="books-icon">📚</i> {club.booksRead} books read
                  </span>
                  <span className="dot-separator">•</span>
                  <span className="founded-date">Since {club.foundedDate}</span>
                </div>
                <div className="genre-tags">
                  {club.genres.slice(0, 2).map((genre, index) => (
                    <span key={index} className="genre-tag">
                      {genre}
                    </span>
                  ))}
                  {club.genres.length > 2 && (
                    <span className="more-genres">
                      +{club.genres.length - 2}
                    </span>
                  )}
                </div>
                <button
                  className={
                    isClubMember(club.id) ? "leave-button" : "join-button"
                  }
                  onClick={(e) => handleJoinClick(e, club.id)}
                >
                  {isClubMember(club.id) ? "Leave Club" : "Join Club"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No book clubs found based on your search.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilter("all");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
 
      <div className="create-club-section">
        <h3>Don't see a club you like?</h3>
        <p>Create your own book club and invite others to join!</p>
        <button className="create-club-button" onClick={handleCreateClubClick}>
          Create a Club
        </button>
      </div>
    </div>
  );
};
 
export default Clubs;