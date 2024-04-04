import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { IBook } from "@/types/book";
import Book from "../Book/Book";
import { Text, Box } from "@radix-ui/themes";

const Releases: React.FC = () => {
  const [books, setBooks] = useState<IBook[]>([]);
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
    <Box className="p-16 text-left w-full">
      <Text className="text-2xl uppercase text-orange-800 font-bold">
        New releases
      </Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Carousel className="w-full">
          <CarouselContent>
            {books.map((book, index) => (
              <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/5 ">
                <Book
                  title={book.title}
                  subtitle={book.subtitle}
                  isbn13={book.isbn13}
                  price={book.price}
                  image={book.image}
                  url={book.url}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </Box>
  );
};

export default Releases;
