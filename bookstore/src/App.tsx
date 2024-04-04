import "./App.css";
import Menu from "./components/Menu/Menu";
import Releases from "./components/Releases/Releases";
import Search from "./components/Search/Search";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./hooks";
import Book from "./components/Book/Book";

function App() {
  const favorites = useAppSelector((state) => state.favoriteSlice);
  return (
    <>
      <Menu />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Releases />
              <Search />
            </>
          }
        />
        <Route
          path="/favorites"
          element={
            <div>
              {favorites.map((book) => (
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
          }
        />
      </Routes>
    </>
  );
}

export default App;
