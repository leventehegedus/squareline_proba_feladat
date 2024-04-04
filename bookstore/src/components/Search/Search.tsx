import React, { useState, useEffect } from "react";
import Book from "../Book/Book";
import { IBook } from "@/types/book";
import { Text, Box } from "@radix-ui/themes";

const FindYourBooks: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.itbook.store/1.0/search/${searchText}/${currentPage}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setBooks(data.books);
      setTotalPages(Math.ceil(data.total / 10));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [searchText, currentPage]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box className="p-16 text-left w-full">
      <Text className="text-2xl uppercase text-orange-800 font-bold">
        New releases
      </Text>

      <h1>
        Find Your Books - {searchText} (Page {currentPage} of {totalPages})
      </h1>
      <input type="text" value={searchText} onChange={handleSearchChange} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div>
            {currentPage > 1 && (
              <button onClick={() => handlePageChange(currentPage - 1)}>
                Previous
              </button>
            )}
            {currentPage < totalPages && (
              <button onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5	gap-2">
            {books.map((book: IBook) => (
              <Book
                title={book.title}
                subtitle={book.subtitle}
                isbn13={book.isbn13}
                price={book.price}
                image={book.image}
                url={book.url}
              />
            ))}
          </div>
        </div>
      )}
    </Box>
  );
};

export default FindYourBooks;
