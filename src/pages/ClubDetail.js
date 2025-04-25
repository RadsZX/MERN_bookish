import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ClubDetail.css";
import { useClubContext } from "../context/ClubContext";
 
const defaultClubData = {
  "fiction-lovers": {
    name: "Fiction Lovers",
    description:
      "A vibrant community for fans of storytelling and immersive plots. We explore various fiction genres together, from contemporary to historical fiction and everything in between.",
    banner:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    logo: "https://cdn-icons-png.flaticon.com/512/29/29302.png",
    members: 342,
    founded: "March 12, 2023",
    admin: "Jennifer Lawrence",
    booksRead: 14,
    genres: ["Contemporary Fiction", "Literary Fiction", "Historical Fiction"],
    readingHistory: [
      { month: "January", books: 2 },
      { month: "February", books: 1 },
      { month: "March", books: 2 },
      { month: "April", books: 3 },
      { month: "May", books: 2 },
      { month: "June", books: 1 },
    ],
    currentBook: {
      title: "The Silent Patient",
      author: "Alex Michaelides",
      cover: "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg",
      progress: 68, // percentage
      meetingDate: "June 15, 2023",
    },
    previousBooks: [
      {
        title: "Where the Crawdads Sing",
        author: "Delia Owens",
        cover: "https://covers.openlibrary.org/b/isbn/9780735219106-L.jpg",
      },
      {
        title: "The Midnight Library",
        author: "Matt Haig",
        cover: "https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg",
      },
    ],
    upcomingBooks: [
      {
        title: "The Vanishing Half",
        author: "Brit Bennett",
        cover: "https://covers.openlibrary.org/b/isbn/9780525536291-L.jpg",
      },
    ],
    discussions: [
      {
        id: 1,
        title: "Did anyone else find the ending surprising?",
        author: "Michelle R.",
        date: "May 28, 2023",
        replies: 24,
        content:
          "I was completely shocked by the twist ending. I'd love to hear others' thoughts on it.",
      },
      {
        id: 2,
        title: "Character development in chapter 8",
        author: "David K.",
        date: "May 25, 2023",
        replies: 16,
        content:
          "The way the protagonist evolved in chapter 8 was fascinating. What did you all think about this transformation?",
      },
    ],
    recentMembers: [
      {
        name: "Sara J.",
        avatar: "https://i.pravatar.cc/150?img=1",
        joinDate: "2 days ago",
      },
      {
        name: "Kevin M.",
        avatar: "https://i.pravatar.cc/150?img=2",
        joinDate: "5 days ago",
      },
      {
        name: "Lisa T.",
        avatar: "https://i.pravatar.cc/150?img=3",
        joinDate: "1 week ago",
      },
    ],
  },
  "science-fiction-enthusiasts": {
    name: "Science Fiction Enthusiasts",
    description:
      "Explore futuristic worlds, advanced technologies, and mind-bending concepts. Our club dives deep into the realm of science fiction, from classic works to cutting-edge releases.",
    banner:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    logo: "https://cdn-icons-png.flaticon.com/512/3261/3261330.png",
    members: 218,
    founded: "January 5, 2023",
    admin: "Robert Chen",
    booksRead: 9,
    genres: ["Science Fiction", "Space Opera", "Cyberpunk"],
    readingHistory: [
      { month: "January", books: 1 },
      { month: "February", books: 2 },
      { month: "March", books: 1 },
      { month: "April", books: 2 },
      { month: "May", books: 2 },
      { month: "June", books: 1 },
    ],
    currentBook: {
      title: "Project Hail Mary",
      author: "Andy Weir",
      cover: "https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg",
      progress: 42, // percentage
      meetingDate: "June 22, 2023",
    },
    previousBooks: [
      {
        title: "Dune",
        author: "Frank Herbert",
        cover: "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg",
      },
      {
        title: "The Three-Body Problem",
        author: "Liu Cixin",
        cover: "https://covers.openlibrary.org/b/isbn/9780765382030-L.jpg",
      },
    ],
    upcomingBooks: [
      {
        title: "Children of Time",
        author: "Adrian Tchaikovsky",
        cover: "https://covers.openlibrary.org/b/isbn/9781447273288-L.jpg",
      },
    ],
    discussions: [
      {
        id: 1,
        title: "Scientific accuracy in the novel",
        author: "Emma L.",
        date: "June 1, 2023",
        replies: 31,
        content:
          "I'm impressed by how well-researched the scientific concepts in this book are. Let's discuss what the author got right.",
      },
      {
        id: 2,
        title: "Character motivations and ethical dilemmas",
        author: "James P.",
        date: "May 29, 2023",
        replies: 18,
        content:
          "The main character faces several ethical dilemmas throughout the story. How would you have handled these situations?",
      },
    ],
    recentMembers: [
      {
        name: "Terry Z.",
        avatar: "https://i.pravatar.cc/150?img=4",
        joinDate: "1 day ago",
      },
      {
        name: "Nicole W.",
        avatar: "https://i.pravatar.cc/150?img=5",
        joinDate: "3 days ago",
      },
      {
        name: "Ryan B.",
        avatar: "https://i.pravatar.cc/150?img=6",
        joinDate: "1 week ago",
      },
    ],
  },
  "non-fiction-buffs": {
    name: "Non-Fiction Buffs",
    description:
      "For those who love real-life stories and learning new things. We explore memoirs, biographies, history books, and other non-fiction genres that expand our understanding of the world.",
    banner:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    logo: "https://cdn-icons-png.flaticon.com/512/3145/3145765.png",
    members: 156,
    founded: "February 20, 2023",
    admin: "Michael Stevens",
    booksRead: 7,
    genres: ["Self-Help", "Biography", "Popular Science"],
    readingHistory: [
      { month: "February", books: 1 },
      { month: "March", books: 2 },
      { month: "April", books: 1 },
      { month: "May", books: 2 },
      { month: "June", books: 1 },
    ],
    currentBook: {
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
      progress: 75, // percentage
      meetingDate: "June 18, 2023",
    },
    previousBooks: [
      {
        title: "Sapiens",
        author: "Yuval Noah Harari",
        cover: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
      },
      {
        title: "Educated",
        author: "Tara Westover",
        cover: "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg",
      },
    ],
    upcomingBooks: [
      {
        title: "The Code Breaker",
        author: "Walter Isaacson",
        cover: "https://covers.openlibrary.org/b/isbn/9781982115852-L.jpg",
      },
    ],
    discussions: [
      {
        id: 1,
        title: "Applying the 1% improvement concept",
        author: "Diana F.",
        date: "June 5, 2023",
        replies: 12,
        content:
          "I've started implementing the 1% improvement idea from chapter 3. Has anyone else tried this approach?",
      },
      {
        id: 2,
        title: "Habit stacking techniques",
        author: "Paul R.",
        date: "June 2, 2023",
        replies: 8,
        content:
          "The habit stacking concept has been revolutionary for my morning routine. Let's share some success stories!",
      },
    ],
    recentMembers: [
      {
        name: "Olivia M.",
        avatar: "https://i.pravatar.cc/150?img=7",
        joinDate: "4 days ago",
      },
      {
        name: "Christopher L.",
        avatar: "https://i.pravatar.cc/150?img=8",
        joinDate: "1 week ago",
      },
      {
        name: "Hannah D.",
        avatar: "https://i.pravatar.cc/150?img=9",
        joinDate: "2 weeks ago",
      },
    ],
  },
  "fantasy-addicts": {
    name: "Fantasy Addicts",
    description:
      "Dive into magical worlds of fantasy and adventure. From epic high fantasy to urban fantasy, we explore extraordinary realms together.",
    banner:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    logo: "https://cdn-icons-png.flaticon.com/512/1134/1134661.png",
    members: 289,
    founded: "December 15, 2022",
    admin: "Elena Rodriguez",
    booksRead: 12,
    genres: ["Epic Fantasy", "Urban Fantasy", "Dark Fantasy"],
    readingHistory: [
      { month: "December", books: 1 },
      { month: "January", books: 2 },
      { month: "February", books: 2 },
      { month: "March", books: 3 },
      { month: "April", books: 2 },
      { month: "May", books: 1 },
      { month: "June", books: 1 },
    ],
    currentBook: {
      title: "The Name of the Wind",
      author: "Patrick Rothfuss",
      cover: "https://covers.openlibrary.org/b/isbn/9780756404741-L.jpg",
      progress: 51, // percentage
      meetingDate: "June 25, 2023",
    },
    previousBooks: [
      {
        title: "The Fifth Season",
        author: "N.K. Jemisin",
        cover: "https://covers.openlibrary.org/b/isbn/9780316229296-L.jpg",
      },
      {
        title: "Mistborn",
        author: "Brandon Sanderson",
        cover: "https://covers.openlibrary.org/b/isbn/9780765350381-L.jpg",
      },
    ],
    upcomingBooks: [
      {
        title: "The Priory of the Orange Tree",
        author: "Samantha Shannon",
        cover: "https://covers.openlibrary.org/b/isbn/9781635570298-L.jpg",
      },
    ],
    discussions: [
      {
        id: 1,
        title: "Magic system analysis",
        author: "Tyler J.",
        date: "June 4, 2023",
        replies: 27,
        content:
          "The magic system in this book is one of the most detailed I've ever read. Let's break down how it works and what makes it special.",
      },
      {
        id: 2,
        title: "Character archetypes discussion",
        author: "Sophia K.",
        date: "May 30, 2023",
        replies: 19,
        content:
          "I noticed several interesting character archetypes in this story. How do they compare to other fantasy novels you've read?",
      },
    ],
    recentMembers: [
      {
        name: "Marcus D.",
        avatar: "https://i.pravatar.cc/150?img=10",
        joinDate: "2 days ago",
      },
      {
        name: "Kimberly F.",
        avatar: "https://i.pravatar.cc/150?img=11",
        joinDate: "6 days ago",
      },
      {
        name: "Jason T.",
        avatar: "https://i.pravatar.cc/150?img=12",
        joinDate: "1 week ago",
      },
    ],
  },
  "mystery-and-thrillers": {
    name: "Mystery and Thrillers",
    description: "A community for fans of suspenseful books that keep you guessing. We explore crime, psychological thrillers, and mysteries that will keep you on the edge of your seat.",
    banner: "https://images.unsplash.com/photo-1553617753-705c651cc564?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    logo: "https://cdn-icons-png.flaticon.com/512/29/29302.png",
    members: 176,
    founded: "February 15, 2023",
    admin: "Sarah Johnson",
    booksRead: 8,
    genres: ["Crime", "Psychological Thriller", "Mystery"],
    readingHistory: [
      { month: "February", books: 1 },
      { month: "March", books: 2 },
      { month: "April", books: 2 },
      { month: "May", books: 2 },
      { month: "June", books: 1 }
    ],
    currentBook: {
      title: "The Guest List",
      author: "Lucy Foley",
      cover: "https://covers.openlibrary.org/b/isbn/9780062868930-L.jpg",
      progress: 45,
      meetingDate: "June 20, 2023"
    },
    previousBooks: [
      {
        title: "Gone Girl",
        author: "Gillian Flynn",
        cover: "https://covers.openlibrary.org/b/isbn/9780307588371-L.jpg"
      },
      {
        title: "The Girl on the Train",
        author: "Paula Hawkins",
        cover: "https://covers.openlibrary.org/b/isbn/9781594634024-L.jpg"
      }
    ],
    upcomingBooks: [
      {
        title: "The Silent Patient",
        author: "Alex Michaelides",
        cover: "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg"
      }
    ],
    discussions: [
      {
        id: 1,
        title: "Plot twists and red herrings",
        author: "Lisa M.",
        date: "June 5, 2023",
        replies: 28,
        content: "The way the author misled us with those red herrings was brilliant. Did anyone see the twist coming?"
      },
      {
        id: 2,
        title: "Character motivations",
        author: "Tom R.",
        date: "June 2, 2023",
        replies: 15,
        content: "What do you think drove the main character to make that decision in chapter 7?"
      }
    ],
    recentMembers: [
      {
        name: "Anna K.",
        avatar: "https://i.pravatar.cc/150?img=7",
        joinDate: "2 days ago"
      },
      {
        name: "Mark S.",
        avatar: "https://i.pravatar.cc/150?img=8",
        joinDate: "4 days ago"
      },
      {
        name: "Rachel L.",
        avatar: "https://i.pravatar.cc/150?img=9",
        joinDate: "1 week ago"
      }
    ]
  },
  "history-buffs": {
    name: "History Buffs",
    description: "For those who love history and learning about the past. We explore world history, ancient civilizations, and military history through engaging discussions.",
    banner: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    logo: "https://cdn-icons-png.flaticon.com/512/29/29302.png",
    members: 134,
    founded: "March 1, 2023",
    admin: "David Wilson",
    booksRead: 6,
    genres: ["World History", "Ancient History", "Military History"],
    readingHistory: [
      { month: "March", books: 1 },
      { month: "April", books: 2 },
      { month: "May", books: 2 },
      { month: "June", books: 1 }
    ],
    currentBook: {
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      cover: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
      progress: 60,
      meetingDate: "June 25, 2023"
    },
    previousBooks: [
      {
        title: "Guns, Germs, and Steel",
        author: "Jared Diamond",
        cover: "https://covers.openlibrary.org/b/isbn/9780393317558-L.jpg"
      },
      {
        title: "The Silk Roads",
        author: "Peter Frankopan",
        cover: "https://covers.openlibrary.org/b/isbn/9781101912379-L.jpg"
      }
    ],
    upcomingBooks: [
      {
        title: "The History of the Ancient World",
        author: "Susan Wise Bauer",
        cover: "https://covers.openlibrary.org/b/isbn/9780393059748-L.jpg"
      }
    ],
    discussions: [
      {
        id: 1,
        title: "Impact of geography on civilization",
        author: "Paul H.",
        date: "June 8, 2023",
        replies: 22,
        content: "How do you think geography shaped the development of early civilizations?"
      },
      {
        id: 2,
        title: "Historical accuracy",
        author: "Emma W.",
        date: "June 4, 2023",
        replies: 17,
        content: "What aspects of the book's historical narrative did you find most accurate or surprising?"
      }
    ],
    recentMembers: [
      {
        name: "John D.",
        avatar: "https://i.pravatar.cc/150?img=10",
        joinDate: "3 days ago"
      },
      {
        name: "Sarah M.",
        avatar: "https://i.pravatar.cc/150?img=11",
        joinDate: "5 days ago"
      },
      {
        name: "Chris R.",
        avatar: "https://i.pravatar.cc/150?img=12",
        joinDate: "1 week ago"
      }
    ]
  },
  "self-improvement": {
    name: "Self Improvement",
    description: "A community focused on personal growth and development. We explore books about psychology, business, and self-help to help each other become better versions of ourselves.",
    banner: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    logo: "https://cdn-icons-png.flaticon.com/512/29/29302.png",
    members: 201,
    founded: "January 10, 2023",
    admin: "Michael Chen",
    booksRead: 10,
    genres: ["Self-Help", "Psychology", "Business"],
    readingHistory: [
      { month: "January", books: 2 },
      { month: "February", books: 2 },
      { month: "March", books: 2 },
      { month: "April", books: 2 },
      { month: "May", books: 1 },
      { month: "June", books: 1 }
    ],
    currentBook: {
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      cover: "https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg",
      progress: 55,
      meetingDate: "June 22, 2023"
    },
    previousBooks: [
      {
        title: "Atomic Habits",
        author: "James Clear",
        cover: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg"
      },
      {
        title: "The Power of Now",
        author: "Eckhart Tolle",
        cover: "https://covers.openlibrary.org/b/isbn/9781577314806-L.jpg"
      }
    ],
    upcomingBooks: [
      {
        title: "Deep Work",
        author: "Cal Newport",
        cover: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg"
      }
    ],
    discussions: [
      {
        id: 1,
        title: "Applying the concepts in daily life",
        author: "Sophie L.",
        date: "June 7, 2023",
        replies: 35,
        content: "How have you implemented the book's strategies in your daily routine?"
      },
      {
        id: 2,
        title: "Cognitive biases",
        author: "Alex K.",
        date: "June 3, 2023",
        replies: 21,
        content: "Which cognitive biases discussed in the book have you noticed in your own thinking?"
      }
    ],
    recentMembers: [
      {
        name: "Daniel P.",
        avatar: "https://i.pravatar.cc/150?img=13",
        joinDate: "1 day ago"
      },
      {
        name: "Laura B.",
        avatar: "https://i.pravatar.cc/150?img=14",
        joinDate: "3 days ago"
      },
      {
        name: "Kevin M.",
        avatar: "https://i.pravatar.cc/150?img=15",
        joinDate: "1 week ago"
      }
    ]
  },
  "poetry-circle": {
    name: "Poetry Circle",
    description: "A community for poetry lovers to explore and discuss beautiful poetry from around the world. We read and analyze both classic and contemporary poetry.",
    banner: "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    logo: "https://cdn-icons-png.flaticon.com/512/29/29302.png",
    members: 98,
    founded: "April 5, 2023",
    admin: "Emily Parker",
    booksRead: 5,
    genres: ["Poetry", "Classics", "Contemporary Poetry"],
    readingHistory: [
      { month: "April", books: 1 },
      { month: "May", books: 2 },
      { month: "June", books: 2 }
    ],
    currentBook: {
      title: "Milk and Honey",
      author: "Rupi Kaur",
      cover: "https://covers.openlibrary.org/b/isbn/9781449496364-L.jpg",
      progress: 40,
      meetingDate: "June 28, 2023"
    },
    previousBooks: [
      {
        title: "The Sun and Her Flowers",
        author: "Rupi Kaur",
        cover: "https://covers.openlibrary.org/b/isbn/9781449486792-L.jpg"
      },
      {
        title: "Leaves of Grass",
        author: "Walt Whitman",
        cover: "https://covers.openlibrary.org/b/isbn/9780140421996-L.jpg"
      }
    ],
    upcomingBooks: [
      {
        title: "Ariel",
        author: "Sylvia Plath",
        cover: "https://covers.openlibrary.org/b/isbn/9780571086268-L.jpg"
      }
    ],
    discussions: [
      {
        id: 1,
        title: "Poetic devices and imagery",
        author: "Maria S.",
        date: "June 6, 2023",
        replies: 19,
        content: "What poetic devices did you find most effective in this collection?"
      },
      {
        id: 2,
        title: "Emotional impact",
        author: "David L.",
        date: "June 2, 2023",
        replies: 14,
        content: "Which poems resonated with you the most emotionally?"
      }
    ],
    recentMembers: [
      {
        name: "Olivia T.",
        avatar: "https://i.pravatar.cc/150?img=16",
        joinDate: "2 days ago"
      },
      {
        name: "Peter W.",
        avatar: "https://i.pravatar.cc/150?img=17",
        joinDate: "4 days ago"
      },
      {
        name: "Grace H.",
        avatar: "https://i.pravatar.cc/150?img=18",
        joinDate: "1 week ago"
      }
    ]
  }
};
 
const ClubDetail = () => {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const {
    joinClub,
    leaveClub,
    isClubMember,
    clubs: userCreatedClubs,
  } = useClubContext();
 
  // Find the club - either from default data or user created clubs
  const userClub = userCreatedClubs.find((club) => club.id === clubId);
  const club = userClub || defaultClubData[clubId];
 
  // Check if user is joined when component mounts
  const joined = isClubMember(clubId);
 
  if (!club) {
    return (
      <div className="club-detail not-found">
        <h2>Club Not Found</h2>
        <p>
          The book club you're looking for doesn't exist or has been removed.
        </p>
        <button onClick={() => navigate("/clubs")}>Back to All Clubs</button>
      </div>
    );
  }
 
  // Handle join club button click
  const handleJoinClick = () => {
    joinClub(clubId);
  };
 
  // Handle leave club button click
  const handleLeaveClick = () => {
    leaveClub(clubId);
  };
 
  // Helper function to render the banner - handles both default clubs and user-created clubs
  const renderBanner = () => {
    // If it's a user-created club, the banner might just be an image URL
    const bannerUrl = club.banner || club.image;
 
    return (
      <div className="banner" style={{ backgroundImage: `url(${bannerUrl})` }}>
        <div className="banner-overlay">
          <div className="club-info">
            <img
              src={
                club.logo ||
                "https://cdn-icons-png.flaticon.com/512/29/29302.png"
              }
              alt={`${club.name} Logo`}
              className="club-logo"
            />
            <div>
              <h1>{club.name}</h1>
              <p className="club-meta">
                {club.members} members • Founded{" "}
                {club.founded || club.foundedDate} •
                <span className="books-read-badge">
                  <i className="books-icon">📚</i> {club.booksRead} books read
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
 
  return (
    <div className="club-detail-container">
      <button className="back-button" onClick={() => navigate("/clubs")}>
        ← Back to Clubs
      </button>
 
      <div className="club-header">
        {renderBanner()}
 
        <div className="club-actions">
          {!joined ? (
            <button className="join-club-button" onClick={handleJoinClick}>
              Join Club
            </button>
          ) : (
            <button className="leave-club-button" onClick={handleLeaveClick}>
              Leave Club
            </button>
          )}
          <button className="share-button">Share</button>
        </div>
      </div>
 
      <div className="club-tabs">
        <button
          className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`tab-button ${
            activeTab === "discussions" ? "active" : ""
          }`}
          onClick={() => setActiveTab("discussions")}
        >
          Discussions
        </button>
        <button
          className={`tab-button ${activeTab === "books" ? "active" : ""}`}
          onClick={() => setActiveTab("books")}
        >
          Books
        </button>
        <button
          className={`tab-button ${activeTab === "members" ? "active" : ""}`}
          onClick={() => setActiveTab("members")}
        >
          Members
        </button>
      </div>
 
      <div className="club-content">
        {activeTab === "overview" && (
          <div className="overview-tab">
            <div className="about-section">
              <h2>About this Club</h2>
              <p className="club-description">{club.description}</p>
 
              <div className="club-genres">
                <h3>Genres</h3>
                <div className="genre-tags">
                  {(club.genres || []).map((genre, index) => (
                    <span key={index} className="genre-tag">
                      {genre}
                    </span>
                  ))}
                  {(!club.genres || club.genres.length === 0) && (
                    <span className="no-genres">No genres specified</span>
                  )}
                </div>
              </div>
 
              <div className="club-stats-grid">
                <div className="club-stat">
                  <span className="stat-number">{club.members}</span>
                  <span className="stat-label">Members</span>
                </div>
                <div className="club-stat">
                  <span className="stat-number">{club.booksRead}</span>
                  <span className="stat-label">Books Read</span>
                </div>
                <div className="club-stat">
                  <span className="stat-number">
                    {(club.founded || club.foundedDate || "").split(" ")[0]}
                  </span>
                  <span className="stat-label">Founded</span>
                </div>
              </div>
              <p className="club-admin">
                Managed by: {club.admin || "Club Creator"}
              </p>
            </div>
 
            <div className="current-read-section">
              <h2>Currently Reading</h2>
              {typeof club.currentBook === 'object' ? (
                <div className="current-book">
                  <img
                    src={club.currentBook.cover || "https://via.placeholder.com/150x220?text=No+Cover"}
                    alt={club.currentBook.title || "Current Book"}
                    className="book-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150x220?text=No+Cover";
                    }}
                  />
                  <div className="book-details">
                    <h3>{club.currentBook.title || "No Title Available"}</h3>
                    <p className="book-author">by {club.currentBook.author || "Unknown Author"}</p>
                    <div className="reading-progress">
                      <div className="progress-label">
                        <span>Club Progress</span>
                        <span>{club.currentBook.progress || 0}%</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${club.currentBook.progress || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="meeting-date">
                      Next Discussion: {club.currentBook.meetingDate || "Not scheduled yet"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="no-book-selected">
                  <p>No book currently selected</p>
                  <p className="book-title">
                    {typeof club.currentBook === 'string' ? club.currentBook : "Select a book for your club to read"}
                  </p>
                  <button
                    className="select-book-button"
                    onClick={() => navigate(`/clubs/${clubId}/add-book`)}
                  >
                    Select a Book
                  </button>
                </div>
              )}
            </div>
 
            <div className="recent-discussions">
              <div className="section-header">
                <h2>Recent Discussions</h2>
                <button onClick={() => setActiveTab("discussions")}>
                  View All
                </button>
              </div>
              {club.discussions && club.discussions.length > 0 ? (
                club.discussions.map((discussion) => (
                  <div key={discussion.id} className="discussion-card">
                    <h3>{discussion.title}</h3>
                    <p className="discussion-content">{discussion.content}</p>
                    <div className="discussion-meta">
                      <span>Started by {discussion.author}</span>
                      <span>•</span>
                      <span>{discussion.date}</span>
                      <span>•</span>
                      <span>{discussion.replies} replies</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-discussions">
                  <p>No discussions started yet</p>
                  <button className="start-discussion-button">
                    Start a Discussion
                  </button>
                </div>
              )}
            </div>
 
            <div className="new-members">
              <h2>New Members</h2>
              {club.recentMembers && club.recentMembers.length > 0 ? (
                <div className="members-list">
                  {club.recentMembers.map((member, index) => (
                    <div key={index} className="member-card">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="member-avatar"
                      />
                      <div className="member-info">
                        <h4>{member.name}</h4>
                        <p>Joined {member.joinDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-members">No members have joined recently</p>
              )}
            </div>
          </div>
        )}
 
        {activeTab === "discussions" && (
          <div className="discussions-tab">
            <div className="section-header">
              <h2>Club Discussions</h2>
              <button className="new-discussion-button">
                Start New Discussion
              </button>
            </div>
 
            {club.discussions.map((discussion) => (
              <div key={discussion.id} className="discussion-card detailed">
                <h3>{discussion.title}</h3>
                <p className="discussion-content">{discussion.content}</p>
                <div className="discussion-meta">
                  <span>Started by {discussion.author}</span>
                  <span>•</span>
                  <span>{discussion.date}</span>
                  <span>•</span>
                  <span>{discussion.replies} replies</span>
                </div>
                <button className="view-discussion-button">
                  View Discussion
                </button>
              </div>
            ))}
          </div>
        )}
 
        {activeTab === "books" && (
          <div className="books-tab">
            <div className="reading-history-summary">
              <h2>Reading History</h2>
              <div className="section-header">
                <button
                  className="add-book-button"
                  onClick={() => navigate(`/clubs/${clubId}/add-book`)}
                >
                  Add Book
                </button>
              </div>
              <div className="history-stats">
                <div className="history-stat">
                  <span className="history-number">{club.booksRead}</span>
                  <span className="history-label">Books read</span>
                </div>
                <div className="history-stat">
                  <span className="history-number">
                    {club.previousBooks.length}
                  </span>
                  <span className="history-label">This year</span>
                </div>
                <div className="history-progress">
                  <div className="current-progress">
                    <h4>Current Progress</h4>
                    <div className="reading-progress">
                      <div className="progress-label">
                        <span>{club.currentBook.title}</span>
                        <span>{club.currentBook.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${club.currentBook.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
 
export default ClubDetail;