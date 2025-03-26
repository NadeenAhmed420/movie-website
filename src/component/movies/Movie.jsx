import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const formatTitle = (title) => title.toLowerCase().replace(/\s+/g, "-");

function Movie() {
  const { title } = useParams();
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState(null); // Store video key

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/discover/movie?api_key=${API_KEY}`,
          API_OPTIONS
        );

        if (!response.ok) throw new Error("Failed to fetch movie details");

        const data = await response.json();

        const foundMovie = data.results.find(
          (movie) => formatTitle(movie.title) === title
        );

        if (!foundMovie) throw new Error("Movie not found");

        setMovie(foundMovie);

        // Fetch movie trailer
        const videoResponse = await fetch(
          `${API_BASE_URL}/movie/${foundMovie.id}/videos?api_key=${API_KEY}`,
          API_OPTIONS
        );

        if (!videoResponse.ok) throw new Error("Failed to fetch videos");

        const videoData = await videoResponse.json();

        const trailer = videoData.results.find((vid) => vid.type === "Trailer");
        if (trailer) {
          setVideoKey(trailer.key); // Store the video key
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [title]);

  if (!movie)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );

  return (
    <div className="movie-details">
      <div className="flex justify-between items-center">
        <h3>{movie.title}</h3>
        <div className="rating">
          <img src="/star.svg" alt="star-icon" />
          <p>
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} / 10
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 my-5">
        <img
          src={
            movie.poster_path
              ? `http://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : "/No-Poster.svg"
          }
          alt={movie.title}
        />

        {videoKey ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="Movie Trailer"
            allowFullScreen
            className="video"
          ></iframe>
        ) : (
          <p className="no-trailer">No Trailer Available</p>
        )}
      </div>

      <div className="content">
        <div className="rating justify-start ps-5">
          <p className="year">
            {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
          </p>
          <span>-</span>

          <p className="lang">{movie.original_language}</p>
        </div>
      </div>
      <hr className="text-gray-800" />

      <div className="details">
        <span>Overview</span>
        <p className="overview">{movie.overview}</p>
      </div>

      <div className="details">
        <span>Release Date</span>
        <p className="release-date">
          {movie.release_date ? movie.release_date : "N/A"}
        </p>
      </div>
    </div>
  );
}

export default Movie;
