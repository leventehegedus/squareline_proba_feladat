import React, { useState, useEffect } from "react";
import Book from "../Book/Book";
import { IBook } from "@/types/book";
import { Text, Box, Flex } from "@radix-ui/themes";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
      <Flex justify={"between"} align={"center"}>
        <Text className="text-2xl uppercase text-orange-800 font-bold">
          Find your books
        </Text>
        <Input
          type="text"
          className="w-60"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="find your books"
        />
      </Flex>

      {loading ? (
        <Box>Loading...</Box>
      ) : (
        <div>
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
          {books.length > 0 && (
            <Flex justify={"center"}>
              <Box>
                <Box className="m-2">
                  {currentPage > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="m-2"
                    >
                      Previous
                    </Button>
                  )}
                  {currentPage < totalPages && (
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="m-2"
                    >
                      Next
                    </Button>
                  )}
                </Box>
                <Text as="div" align="center">
                  Page {currentPage} of {totalPages}
                </Text>
              </Box>
            </Flex>
          )}
        </div>
      )}
    </Box>
  );
};

export default FindYourBooks;
