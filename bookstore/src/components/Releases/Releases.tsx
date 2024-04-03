import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";

// Define interface for book data
interface Book {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}

const Releases: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.itbook.store/1.0/new");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setBooks(data.books);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>New Books</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {books.map((book, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <img
                    src={book.image}
                    alt={book.title}
                    style={{ maxWidth: "100px" }}
                  />
                  <div>
                    <h3>{book.title}</h3>
                    <p>{book.subtitle}</p>
                    <p>Price: {book.price}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
};

export default Releases;
