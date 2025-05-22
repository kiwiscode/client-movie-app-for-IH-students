import { useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

function MovieCard({ movie }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const maxDescriptionLength = 120;

  const toggleDescription = (e) => {
    e.stopPropagation(); // Prevent Link navigation
    setShowFullDescription((prev) => !prev);
  };

  const renderDescription = () => {
    if (!movie.description) return null;

    const isLong = movie.description.length > maxDescriptionLength;

    if (showFullDescription || !isLong) {
      return (
        <>
          <p className="text-gray-700 text-sm mb-2">{movie.description}</p>
          {isLong && (
            <button
              onClick={toggleDescription}
              className="text-blue-600 text-sm hover:underline cursor-pointer"
            >
              See Less
            </button>
          )}
        </>
      );
    } else {
      return (
        <>
          <p className="text-gray-700 text-sm mb-2">
            {movie.description.slice(0, maxDescriptionLength)}...
          </p>
          <button
            onClick={toggleDescription}
            className="text-blue-600 text-sm hover:underline cursor-pointer"
          >
            See More
          </button>
        </>
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/movies/${movie._id}`}>
        <img
          src={movie.poster ? movie.poster : "https://placehold.co/300x400"}
          alt={movie.title}
          className="w-full object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/movies/${movie.id}`}>
          <h2 className="text-xl font-semibold mb-1 hover:underline">
            {movie.title}
          </h2>
        </Link>
        <p className="text-gray-600 text-sm mb-2">
          <span className="font-medium">Year:</span> {movie.year}
        </p>
        <p className="text-gray-600 text-sm mb-2">
          <span className="font-medium">Genre:</span> {movie.genre.join(", ")}
        </p>
        <p className="text-gray-600 text-sm mb-2">
          <span className="font-medium">Director:</span> {movie.director}
        </p>
        <p className="text-yellow-600 font-semibold text-sm">
          ⭐ {movie.rating} <span className="text-gray-500 text-xs">IMDB</span>
        </p>

        {/* Description */}
        <div className="mt-2">{renderDescription()}</div>

        <div className="flex items-center mt-2">
          <Star className="h-5 w-5 text-yellow-400" />
          <p className="text-gray-600 text-sm ml-2">
            Average User Rating: {movie.averageUserRating}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
