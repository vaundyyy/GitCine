import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import { Movie } from 'types/movie';
import { BASE_URL } from 'utils/requests';
import './styles.css';

type Props = {
  movieId: string;
};

type LocationState = {
  movie?: Movie;
};

function FormCard({ movieId }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, authenticated, userEmail } = useAuth();

  const stateMovie = (location.state as LocationState | null)?.movie;

  const [movie, setMovie] = useState<Movie | undefined>(stateMovie);
  const [title, setTitle] = useState(stateMovie?.title || '');
  const [image, setImage] = useState(stateMovie?.image || '');

  // Estado do fluxo de avaliação (usuário comum)
  const [score, setScore] = useState('5');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isAdmin && !authenticated) {
      setErrorMsg('É necessário estar logado para registrar uma avaliação.');
    } else {
      setErrorMsg('');
    }
  }, [authenticated, isAdmin]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movies/${movieId}`)
      .then((response) => {
        const data: Movie = response.data;
        setMovie(data);
        setTitle(data.title);
        setImage(data.image);
      })
      .catch(() => {});
  }, [movieId]);

  const handleAdminSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!title.trim() || !image.trim()) {
      setErrorMsg('Preencha o título e a imagem do filme.');
      return;
    }

    setSubmitting(true);

    const config: AxiosRequestConfig = {
      baseURL: BASE_URL,
      method: 'PUT',
      url: `/movies/${movieId}`,
      data: {
        title: title.trim(),
        image: image.trim(),
      },
    };

    axios(config)
      .then(() => {
        setSuccessMsg('Filme atualizado com sucesso!');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      })
      .catch(() => {
        setErrorMsg('Não foi possível salvar no backend (verifique o endpoint PUT /movies/{id} no Spring Boot).');
        setSubmitting(false);
      });
  };

  const handleScoreSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMsg('');

    if (!authenticated) {
      setErrorMsg('É necessário estar logado para registrar uma avaliação.');
      return;
    }

    setErrorMsg('');
    setSubmitting(true);

    const activeEmail = userEmail || 'usuario@gitcine.com';

    const config: AxiosRequestConfig = {
      baseURL: BASE_URL,
      method: 'PUT',
      url: '/scores',
      data: {
        email: activeEmail,
        movieId: movieId,
        score: Number(score),
      },
    };

    axios(config)
      .then(() => {
        setSuccessMsg('Avaliação registrada com sucesso!');
        setTimeout(() => {
          navigate('/');
        }, 500);
      })
      .catch((err) => {
        const backendMessage = err?.response?.data?.message;
        setErrorMsg(
          backendMessage || 'Erro ao registrar a avaliação. Tente novamente.'
        );
        setSubmitting(false);
      });
  };

  const displayImage = isAdmin ? image || movie?.image : movie?.image;
  const displayTitle = isAdmin ? title || movie?.title : movie?.title;

  return (
    <div className="gitcine-rate-card">
      {displayImage && (
        <div className="gitcine-rate-image-wrapper">
          <img
            className="gitcine-rate-image"
            src={displayImage}
            alt={displayTitle || 'Filme'}
          />
        </div>
      )}

      <div className="gitcine-rate-body">
        <span className="gitcine-rate-badge">
          {isAdmin ? 'Modo Admin • Edição' : 'Avaliação'}
        </span>

        <h3 className="gitcine-rate-title">
          {displayTitle || (isAdmin ? 'Editar Filme' : 'Avaliar Filme')}
        </h3>

        {authenticated && !isAdmin && userEmail && (
          <div className="gitcine-logged-notice">
            Avaliando como <strong>{userEmail}</strong>
          </div>
        )}

        {errorMsg && <div className="gitcine-rate-alert">{errorMsg}</div>}
        {successMsg && <div className="gitcine-rate-success">{successMsg}</div>}

        {isAdmin ? (
          <form className="gitcine-rate-form" onSubmit={handleAdminSubmit}>
            <div className="gitcine-rate-group">
              <label htmlFor="title">Nome do filme</label>
              <input
                id="title"
                type="text"
                className="gitcine-rate-input"
                placeholder="Digite o nome do filme"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="gitcine-rate-group">
              <label htmlFor="image">Imagem</label>
              <input
                id="image"
                type="text"
                className="gitcine-rate-input"
                placeholder="https://..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <div className="gitcine-rate-actions">
              <button
                type="submit"
                className="gitcine-rate-btn-primary"
                disabled={submitting}
              >
                {submitting ? 'Salvando...' : 'Salvar'}
              </button>

              <Link to="/" className="gitcine-rate-btn-secondary">
                Cancelar
              </Link>
            </div>
          </form>
        ) : (
          <form className="gitcine-rate-form" onSubmit={handleScoreSubmit}>
            <div className="gitcine-rate-group">
              <label htmlFor="score">Informe sua avaliação</label>
              <select
                id="score"
                className="gitcine-rate-input gitcine-rate-select"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                disabled={!authenticated || submitting}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div className="gitcine-rate-actions">
              <button
                type="submit"
                className="gitcine-rate-btn-primary"
                disabled={!authenticated || submitting}
              >
                {submitting ? 'Enviando...' : 'Salvar'}
              </button>

              <Link to="/" className="gitcine-rate-btn-secondary">
                Cancelar
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default FormCard;