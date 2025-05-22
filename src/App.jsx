import { Routes, Route, useLocation } from "react-router-dom";
import Main from "./pages/Main";
import MovieDetail from "./pages/MovieDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import useFetch from "./hooks/useFetch";
import { useState } from "react";
import FilterBar from "./components/FilterBar";
import { MOVIES_API_URL_WITH_QUERIES } from "./constants/env";

function App() {
  const [baseFiltered, setBaseFiltered] = useState([]);
  const [genre, setGenre] = useState("All");
  const [sortOption, setSortOption] = useState({
    type: "",
    order: "",
  });

  const location = useLocation().pathname;
  const queryParams = new URLSearchParams();
  if (genre !== "All") {
    queryParams.append("genre", genre.toLowerCase());
  }

  if (sortOption.type && sortOption.order) {
    queryParams.append("sortBy", sortOption.type);
    queryParams.append("order", sortOption.order);
  }

  const { data, error, loading } = useFetch(
    MOVIES_API_URL_WITH_QUERIES(queryParams.toString())
  );

  // Get the filtered results coming from FilterBar
  const handleFilteredResults = (genre, sortOption) => {
    setGenre(genre);
    setSortOption(sortOption);
  };

  // Get the the search result

  const handleSearch = (searchTerm, result, error, loading) => {
    console.log("result:", result);
    console.log("error:", error);
    console.log("loading:", loading);

    if (!searchTerm) {
      setBaseFiltered(data);
    } else {
      setBaseFiltered(result);
    }
  };

  console.log("data:", data);

  return (
    <div className="App">
      <Navbar onSearch={handleSearch} />

      {location === "/" && (
        <h1 className="text-3xl font-bold mb-8 text-center mt-[40px]">
          🎬 Movie Gallery
        </h1>
      )}

      {/* Filter sadece anasayfa için gösteriliyor */}
      {data && location === "/" && (
        <FilterBar onFilter={handleFilteredResults} />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Main
              movies={baseFiltered || data || []}
              error={error}
              loading={loading}
            />
          }
        />
        <Route path="/movies/:movieId" element={<MovieDetail />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
