import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

function FavoriteButton({ movie, padding }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e, movieId) => {
    e.stopPropagation();

    setIsFavorite((prev) => !prev);

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    let updatedFavorites;
    if (favorites.includes(movieId)) {
      // Remove if exist
      updatedFavorites = favorites.filter((id) => id !== movieId);
    } else {
      // Add if not exist
      updatedFavorites = [...favorites, movieId];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(movie._id));
  }, [movie._id]);

  return (
    <button
      onClick={(e) => toggleFavorite(e, movie._id)}
      className={`${padding} w-full text-right`}
    >
      <Heart
        className={`h-6 w-6 transition-all duration-300 ${
          isFavorite ? "fill-red-500 text-red-500 heart-pulse" : "text-gray-400"
        }`}
        strokeWidth={1.5}
      />
    </button>
  );
}

export default FavoriteButton;
