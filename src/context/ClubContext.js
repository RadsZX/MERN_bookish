import React, { createContext, useState, useContext, useEffect } from "react";
 
// Create context
const ClubContext = createContext();
 
// Create provider
export const ClubProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [joinedClubs, setJoinedClubs] = useState(() => {
    const savedClubs = localStorage.getItem("joinedClubs");
    return savedClubs ? JSON.parse(savedClubs) : [];
  });
 
  // Initialize clubs state with localStorage data if available
  const [clubs, setClubs] = useState(() => {
    const savedUserClubs = localStorage.getItem("userCreatedClubs");
    return savedUserClubs ? JSON.parse(savedUserClubs) : [];
  });
 
  // Save to localStorage whenever joinedClubs changes
  useEffect(() => {
    localStorage.setItem("joinedClubs", JSON.stringify(joinedClubs));
  }, [joinedClubs]);
 
  // Save clubs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("userCreatedClubs", JSON.stringify(clubs));
  }, [clubs]);
 
  // Join a club
  const joinClub = (clubId) => {
    if (!joinedClubs.includes(clubId)) {
      setJoinedClubs([...joinedClubs, clubId]);
    }
  };
 
  // Leave a club
  const leaveClub = (clubId) => {
    setJoinedClubs(joinedClubs.filter((id) => id !== clubId));
  };
 
  // Check if user is a member of a club
  const isClubMember = (clubId) => {
    return joinedClubs.includes(clubId);
  };
 
  // Add a new club
  const addNewClub = (newClub) => {
    setClubs([...clubs, newClub]);
    // Auto-join user to their created club
    joinClub(newClub.id);
  };
 
  // Update a club's books
  const updateClubBooks = (clubId, bookToAdd, bookType) => {
    setClubs(
      clubs.map((club) => {
        if (club.id === clubId) {
          const updatedClub = { ...club };
 
          // Update the appropriate book section based on bookType
          if (bookType === "current") {
            updatedClub.currentBook = bookToAdd;
            // If it's a current book, increment booksRead if not already there
            if (
              !updatedClub.previousBooks ||
              !updatedClub.previousBooks.some(
                (book) =>
                  book.title === bookToAdd.title &&
                  book.author === bookToAdd.author
              )
            ) {
              updatedClub.booksRead = (updatedClub.booksRead || 0) + 1;
            }
          } else if (bookType === "upcoming") {
            // Initialize upcomingBooks array if it doesn't exist
            if (!updatedClub.upcomingBooks) {
              updatedClub.upcomingBooks = [];
            }
            updatedClub.upcomingBooks = [
              bookToAdd,
              ...(updatedClub.upcomingBooks || []),
            ];
          } else if (bookType === "previous") {
            // Initialize previousBooks array if it doesn't exist
            if (!updatedClub.previousBooks) {
              updatedClub.previousBooks = [];
            }
            updatedClub.previousBooks = [
              bookToAdd,
              ...(updatedClub.previousBooks || []),
            ];
 
            // Update booksRead count if not already counted
            if (
              !updatedClub.previousBooks.some(
                (book) =>
                  book.title === bookToAdd.title &&
                  book.author === bookToAdd.author
              )
            ) {
              updatedClub.booksRead = (updatedClub.booksRead || 0) + 1;
            }
          }
 
          return updatedClub;
        }
        return club;
      })
    );
  };
 
  return (
    <ClubContext.Provider
      value={{
        joinedClubs,
        joinClub,
        leaveClub,
        isClubMember,
        clubs,
        addNewClub,
        updateClubBooks,
      }}
    >
      {children}
    </ClubContext.Provider>
  );
};
 
// Custom hook to use the club context
export const useClubContext = () => {
  const context = useContext(ClubContext);
  if (!context) {
    throw new Error("useClubContext must be used within a ClubProvider");
  }
  return context;
};