import "./App.css";
import Menu from "./components/Menu/Menu";
import Releases from "./components/Releases/Releases";
import Search from "./components/Search/Search";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./hooks";
import Book from "./components/Book/Book";
import { IBook } from "./types/book";
import Banner from "./components/Banner/Banner";
import { Text, Box } from "@radix-ui/themes";

function App() {
  const favorites: IBook[] = useAppSelector((state) => state.favoriteSlice);

  return (
    <>
      <Menu />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Releases />
              <Search />
            </>
          }
        />
        <Route
          path="/favorites"
          element={
            <Box className="p-16 text-left w-full">
              <Text className="text-2xl uppercase text-orange-800 font-bold">
                Favorites
              </Text>

              <Box className="grid grid-cols-1 lg:grid-cols-5	gap-2">
                {favorites.map((book: IBook) => (
                  <Book
                    title={book.title}
                    subtitle={book.subtitle}
                    isbn13={book.isbn13}
                    price={book.price}
                    image={book.image}
                    url={book.url}
                    key={book.isbn13}
                  />
                ))}
              </Box>
            </Box>
          }
        />
      </Routes>
    </>
  );
}

export default App;
