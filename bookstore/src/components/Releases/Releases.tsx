import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Book } from "@/types/book";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { updateFavorite } from "@/features/favorites/favoriteSlice";

const Releases: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state);

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

  const addFav = (book: Book) => {
    console.log(book);
    dispatch(updateFavorite(book));
  };

  return (
    <div>
      {JSON.stringify(favorites)}
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
                    onClick={() => addFav(book)}
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
