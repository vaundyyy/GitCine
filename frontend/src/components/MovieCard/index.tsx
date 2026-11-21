import { Link } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import MovieScore from '../MovieScore';
import { Movie } from 'types/movie';
import './styles.css';

type Props = {
  movie: Movie;
};

function MovieCard({ movie }: Props) {
  const { isAdmin } = useAuth();

  return (
    <div className="gitcine-movie-card">
      <div className="gitcine-card-image-wrapper">
        <img
          className="gitcine-movie-card-image"
          src={movie.image}
          alt={movie.title}
        />
      </div>

      <div className="gitcine-card-bottom-container">
        <h3 className="gitcine-movie-title">{movie.title}</h3>

        <div className="gitcine-card-footer">
          <MovieScore count={movie.count} score={movie.score} />

          <Link
            to={`/movies/${movie.id}/rate`}
            state={{ movie }}
            className="gitcine-card-link"
          >
            <button type="button" className="gitcine-card-btn">
              {isAdmin ? 'Editar' : 'Avaliar'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;