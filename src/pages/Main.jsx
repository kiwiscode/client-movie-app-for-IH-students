import MovieCard from "../components/MovieCard";

function Main({ movies, error, loading }) {
  return (
    <div className=" text-black p-6">
      {loading && <p className="text-center text-lg">Loading...</p>}
      {error && (
        <p className="text-red-600 text-center">Error: {error.message}</p>
      )}

      {movies && movies.length && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Main;
