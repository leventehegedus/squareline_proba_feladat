import "./App.css";
import Menu from "./components/Menu/Menu";
import Releases from "./components/Releases/Releases";
import Search from "./components/Search/Search";
import { Route, Routes } from "react-router-dom";
import Banner from "./components/Banner/Banner";
import Favorites from "./components/Favorites/Favorites";

function App() {
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
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
