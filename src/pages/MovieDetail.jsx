import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import useFetch from "../hooks/useFetch";
import { MOVIE_DETAIL_API_URL } from "../constants/env";

function MovieDetail() {
  const { movieId } = useParams();

  const { data, error, loading } = useFetch(MOVIE_DETAIL_API_URL(movieId));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Movie not found!</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Movie Image */}
        <div className="md:w-1/2 w-full">
          <img
            src={data.poster ? data.poster : "https://placehold.co/300x400"}
            alt={data.title}
            className="w-full object-cover rounded-lg"
          />
        </div>

        {/* Movie Info */}
        <div className="md:w-1/2 w-full p-4">
          <h2 className="text-2xl font-semibold mb-2">{data.title}</h2>
          <p className="text-gray-600 text-sm mb-2">
            <span className="font-medium">Year:</span> {data.year}
          </p>
          <p className="text-gray-600 text-sm mb-2">
            <span className="font-medium">Genre:</span> {data.genre.join(", ")}
          </p>
          <p className="text-gray-600 text-sm mb-2">
            <span className="font-medium">Director:</span> {data.director}
          </p>
          <p className="text-yellow-600 font-semibold text-sm">
            ⭐ {data.rating} <span className="text-gray-500 text-xs">IMDB</span>
          </p>
          <div className="mt-2 text-sm">{data.description}</div>

          <div className="flex items-center mt-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <p className="text-gray-600 text-sm ml-2">
              Average User Rating: {data.averageUserRating}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
