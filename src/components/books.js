const books = [
  {
    title: "The Silent Patient",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg",
    isbn: "9781250301697",
  },
  {
    title: "These Violent Delights",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781534457720-L.jpg",
    isbn: "9781534457720",
  },
  {
    title: "Normal People",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780571334650-L.jpg",
    isbn: "9780571334650",
  },
  {
    title: "The Vanishing Half",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780525536291-L.jpg",
    isbn: "9780525536291",

  },
  {
    title: "Black Sun",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781534437678-L.jpg",
    isbn: "9781534437678",
  },

  {
    title: "Matilda",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780140328721-L.jpg",
    isbn: "9780140328721",
  },
  {
    title: "The Midnight Library",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg",
    isbn: "9780525559474",
  },
  {
    title: "It Ends with Us",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg",
    isbn: "9781501110368",
  },
  {
    title: "Where the Crawdads Sing",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780735219106-L.jpg",
    isbn: "9780735219106",
  },
  {
    title: "Verity",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781538724736-L.jpg",
    isbn: "9781538724736",
  },
  {
    title: "The Alchemist",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg",
    isbn: "9780061122415",
  },
  {
    title: "Educated",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg",
    isbn: "9780399590504",
  },
  {
    title: "The Book Thief",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780375842207-L.jpg",
    isbn: "9780375842207",
  },
  {
    title: "Circe",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780316556347-L.jpg",
    isbn: "9780316556347",
  },
  {
    title: "Little Women",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780147514011-L.jpg",
    isbn: "9780147514011",
  },
  {
    title: "A Man Called Ove",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781476738024-L.jpg",
    isbn: "9781476738024",
  },
  {
    title: "The Great Gatsby",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
    isbn: "9780743273565",
  },
  {
    title: "1984",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
    isbn: "9780451524935",
  },
  {
    title: "Deep Work",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
    isbn: "9781455586691",
  },
  {
    title: "Make Your Bed",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781455570249-L.jpg",
    isbn: "9781455570249",
  },
  {
    title: "The Hobbit",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780345339683-L.jpg",
    isbn: "9780345339683",
  },
  {
    title: "The Catcher in the Rye",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780316769488-L.jpg",
    isbn: "9780316769488",
  },
  {
    title: "Local Woman Missing",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780778333166-L.jpg",
    isbn: "9780778333166",
  },
  {
    title: "Home Before Dark",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781524745172-L.jpg",
    isbn: "9781524745172",
  },
  {
    title: "The Chain",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780316531269-L.jpg",
    isbn: "9780316531269",
  },
  {
    title: "Atomic Habits",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    isbn: "9780735211292",
  },
  {
    title: "The Power of Now",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781577314806-L.jpg",
    isbn: "9781577314806",
  },
  {
    title: "The 7 Habits of Highly Effective People",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780743269513-L.jpg",
    isbn: "9780743269513",
  },
  {
    title: "Lock Every Door",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781524745141-L.jpg",
    isbn: "9781524745141",
  },
  {
    title: "The Reversal (Mickey Haller)",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780316069489-L.jpg",
    isbn: "9780316069489",
  },
  {
    title: "I Am Watching You",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781542046596-L.jpg",
    isbn: "9781542046596",
  },
  {
    title: "The Housemaid",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781538725160-L.jpg",
    isbn: "9781538725160",
  },
  {
    title: "Think and Grow Rich",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781585424337-L.jpg",
    isbn: "9781585424337",
  },
  {
    title: "How to Win Friends and Influence People",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780671027032-L.jpg",
    isbn: "9780671027032",
  },
  {
    title: "You Are a Badass",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780762447695-L.jpg",
    isbn: "9780762447695",
  },
  {
    title: "Then She Was Gone",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781501154652-L.jpg",
    isbn: "9781501154652",
  },
  {
    title: "To Kill a Mockingbird",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
    isbn: "9780061120084",
  },
  {
    title: "The Woman in the Window",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780062678416-L.jpg",
    isbn: "9780062678416",
  },
  {
    title: "The Couple Next Door",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780735221086-L.jpg",
    isbn: "9780735221086",
  },
  {
    title: "Before I Go to Sleep",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780062060563-L.jpg",
    isbn: "9780062060563",
  },
  {
    title: "The Girl with the Dragon Tattoo",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780307454546-L.jpg",
    isbn: "9780307454546",
  },
  {
    title: "Behind Closed Doors",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781250122353-L.jpg",
    isbn: "9781250122353",
  },
  {
    title: "Gone Girl",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780307588371-L.jpg",
    isbn: "9780307588371",
  },
  {
    title: "The Girl on the Train",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781594634024-L.jpg",
    isbn: "9781594634024",
  },
  {
    title: "Ego Is the Enemy",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9781591847816-L.jpg",
    isbn: "9781591847816",
  },
  {
    title: "Ikigai",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg",
    isbn: "9780143130727",
  },
  {
    title: "The Fault in Our Stars",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780525478812-L.jpg",
    isbn: "9780525478812",
  }
];
module.exports = { books };