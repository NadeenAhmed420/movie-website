function MovieCard({
  movie: { title, poster_path, release_date, vote_average, original_language },
}) {
  return (
    <div className="movie-card">
      <img
  
        src={
          poster_path
            ? `http://image.tmdb.org/t/p/w500/${poster_path}`
            : "/No-Poster.svg"
        }
        alt={title}
      />
      <div className="mt-3">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="stR-icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
            <span>•</span>
            <p className="lang">{original_language}</p>
            <span>•</span>
            <p className="year">
              {release_date ? release_date.split("-")[0] : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
