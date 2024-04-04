import "./App.css";
import Menu from "./components/Menu/Menu";
import Releases from "./components/Releases/Releases";
import Search from "./components/Search/Search";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./hooks";
import Book from "./components/Book/Book";
import { IBook } from "./types/book";
import Banner from "./components/Banner/Banner";

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
            <div>
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
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
