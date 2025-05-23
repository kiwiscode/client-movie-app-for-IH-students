import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { MOVIES_API_URL } from "../constants/env";

function FilterBar({ onFilter }) {
  const [genre, setGenre] = useState("All");
  const [sortOption, setSortOption] = useState({ type: "", order: "" });

  const { data, fetchData } = useFetch();

  useEffect(() => {
    fetchData({
      url: MOVIES_API_URL,
    });
  }, []);

  const genres = [
    "All",
    ...new Set(data?.flatMap((movie) => movie.genre) || []),
  ];

  useEffect(() => {
    onFilter(genre, sortOption);
  }, [sortOption, genre, onFilter]);

  return (
    <div className="filter-bar-container p-[20px] text-sm">
      {/* Genre Dropdown */}
      <div className="filter-item mb-4 md:mb-0">
        <div className="filter-title">Genre</div>
        <select
          className="filter-select w-full"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Release Year Dropdown */}
      <div className="filter-item mb-4 md:mb-0 md:ml-4">
        <div className="filter-title">Release Year</div>
        <select
          className="filter-select w-full"
          value={sortOption.type === "releaseDate" ? sortOption.order : ""}
          onChange={(e) =>
            setSortOption({
              ...sortOption,
              type: "releaseDate",
              order: e.target.value,
            })
          }
        >
          <option value="">Select Year</option>
          <option value="desc">Highest → Lowest</option>
          <option value="asc">Lowest → Highest</option>
        </select>
      </div>

      {/* IMDb Rating Dropdown */}
      <div className="filter-item mb-4 md:mb-0 md:ml-4">
        <div className="filter-title">IMDb Rating</div>
        <select
          className="filter-select w-full"
          value={sortOption.type === "rating" ? sortOption.order : ""}
          onChange={(e) =>
            setSortOption({
              ...sortOption,
              type: "rating",
              order: e.target.value,
            })
          }
        >
          <option value="">Select Rating</option>
          <option value="desc">Highest → Lowest</option>
          <option value="asc">Lowest → Highest</option>
        </select>
      </div>

      {/* User Rating Dropdown */}
      <div className="filter-item mb-4 md:mb-0 md:ml-4">
        <div className="filter-title">User Rating</div>
        <select
          className="filter-select w-full"
          value={sortOption.type === "userRating" ? sortOption.order : ""}
          onChange={(e) =>
            setSortOption({
              ...sortOption,
              type: "userRating",
              order: e.target.value,
            })
          }
        >
          <option value="">Select Rating</option>
          <option value="desc">Highest → Lowest</option>
          <option value="asc">Lowest → Highest</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
