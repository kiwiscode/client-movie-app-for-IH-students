import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import useFetch from "../hooks/useFetch";
import { MOVIE_DETAIL_API_URL, MOVIE_REVIEW_API_URL } from "../constants/env";
import { useEffect, useState } from "react";

function MovieDetail() {
  const { movieId } = useParams();

  const [reviewer, setReviewer] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data: movie, error, loading, fetchData } = useFetch(); // movie detail
  const { fetchData: postReview } = useFetch(); // review post

  useEffect(() => {
    fetchData({
      url: MOVIE_DETAIL_API_URL(movieId),
    });
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    await postReview({
      url: MOVIE_REVIEW_API_URL(movieId),
      method: "post",
      data: { reviewer, rating, comment },
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Refresh movie details after submitting the review
    fetchData({ url: MOVIE_DETAIL_API_URL(movieId) });

    // Clear the form fields
    setReviewer("");
    setRating(0);
    setComment("");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!movie) return <div>Movie not found!</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Movie Image */}
        <div className="md:w-1/2 w-full">
          <img
            src={movie.poster ? movie.poster : "https://placehold.co/300x400"}
            alt={movie.title}
            className="w-full object-cover rounded-lg"
          />
        </div>

        {/* Movie Info */}
        <div className="md:w-1/2 w-full p-4">
          <h2 className="text-2xl font-semibold mb-2">{movie.title}</h2>
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
            ⭐ {movie.rating}{" "}
            <span className="text-gray-500 text-xs">IMDB</span>
          </p>
          <div className="mt-2 text-sm">{movie.description}</div>

          <div className="flex items-center mt-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <p className="text-gray-600 text-sm ml-2">
              Average User Rating: {movie.averageUserRating}
            </p>
          </div>
        </div>
      </div>

      {/* Review Form */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
        <form onSubmit={handleReviewSubmit} className="space-y-4 max-w-md">
          <input
            type="text"
            placeholder="Your Name"
            value={reviewer}
            onChange={(e) => setReviewer(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            min="0"
            max="10"
            step="1"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            placeholder="Your Review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border p-2 rounded"
            rows={4}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>

      {/* Review List */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">User Reviews</h3>
        {movie.reviews && movie.reviews.length > 0 ? (
          <ul className="space-y-4">
            {movie.reviews.map((review, idx) => (
              <li
                key={idx}
                className="border p-4 rounded-lg shadow-sm bg-white"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-800">
                    {review.reviewer || "Anonymous"}
                  </span>
                  <span className="text-yellow-600 font-semibold flex items-center">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <p className="text-sm ml-2">{review.rating}/10</p>
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
