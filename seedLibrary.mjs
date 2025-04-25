import axios from "axios";
import { books } from "./src/components/books.js"; // ES Module import

const seedLibrary = async () => {
  for (const book of books) {
    try {
      const res = await axios.post("http://localhost:5000/api/library", book);
      console.log(`✅ Added: ${book.title}`);
    } catch (err) {
      console.error(`❌ Failed to add ${book.title}:`, err.response?.data?.message || err.message);
    }
  }
};

seedLibrary();
