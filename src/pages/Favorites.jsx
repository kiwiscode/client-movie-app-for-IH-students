import { useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { FAVORITE_MOVIES_API_URL } from "../constants/env";
import useFetch from "../hooks/useFetch";

function Favorites() {
  const { data, error, loading, fetchData } = useFetch();

  useEffect(() => {
    const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favoriteIds.length > 0) {
      const queryParam = favoriteIds.join(",");
      fetchData({
        url: `${FAVORITE_MOVIES_API_URL()}?ids=${queryParam}`,
      });
    }
  }, []);

  console.log(FAVORITE_MOVIES_API_URL());

  return (
    <div className=" text-black p-6">
      {loading && <p className="text-center text-lg">Loading...</p>}
      {error && (
        <p className="text-red-600 text-center">Error: {error.message}</p>
      )}

      {!loading && (!data || data.length === 0) && (
        <p className="text-center text-gray-600 text-lg">
          No favorite movies added yet.
        </p>
      )}

      {data && data.length && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
