import React, { useState, useEffect } from "react";

interface Book {
  title: string;
  image: string;
  price: string;
}

const FindYourBooks: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [books, setBooks] = useState<Book[]>([]);
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
      setTotalPages(Math.ceil(data.total / 25)); // Assuming 25 books per page
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [searchText]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "10px",
            }}
          >
            {books.map((book, index) => (
              <div key={index}>
                <img
                  src={book.image}
                  alt={book.title}
                  style={{ maxWidth: "100px" }}
                />
                <h3>{book.title}</h3>
                <p>{book.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FindYourBooks;
