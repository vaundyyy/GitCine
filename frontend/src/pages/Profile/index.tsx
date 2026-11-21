import { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import { getToken } from 'utils/auth';
import './styles.css';

type UserEvaluation = {
  id: number;
  movieTitle: string;
  movieImage: string;
  score: number;
  date?: string;
};

function Profile() {
  const navigate = useNavigate();
  const { isAdmin, logout } = useAuth();

  const [evaluations, setEvaluations] = useState<UserEvaluation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = getToken();

  useEffect(() => {
    if (isAdmin) {
      return;
    }

    const timer = setTimeout(() => {
      setEvaluations([
        {
          id: 1,
          movieTitle: "O Poderoso Chefão",
          movieImage: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
          score: 5
        }
      ]);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [token, isAdmin]);

  // Admin não possui tela de perfil de avaliações (sempre após os Hooks)
  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <main className="gitcine-profile-page">
      <div className="container">
        <div className="gitcine-profile-header-card">
          <div className="gitcine-profile-avatar">
            <span>GC</span>
          </div>
          <div className="gitcine-profile-info">
            <h2>Minha Conta</h2>
            <p>Gerencie suas atividades e histórico de avaliações no GitCine.</p>
          </div>
          <button type="button" onClick={handleLogout} className="gitcine-btn-logout">
            Sair da Conta
          </button>
        </div>

        {/* Histórico de Avaliações */}
        <div className="gitcine-evaluations-section">
          <h3>Minhas Avaliações</h3>

          {isLoading ? (
            <div className="gitcine-state-box">
              <div className="spinner-border text-primary" role="status" />
              <p>Carregando seu histórico...</p>
            </div>
          ) : evaluations.length === 0 ? (
            <div className="gitcine-state-box">
              <p>Você ainda não avaliou nenhum filme.</p>
              <Link to="/" className="gitcine-explore-link">
                Explorar catálogo de filmes
              </Link>
            </div>
          ) : (
            <div className="gitcine-evaluations-grid">
              {evaluations.map((item) => (
                <div key={item.id} className="gitcine-evaluation-card">
                  <img src={item.movieImage} alt={item.movieTitle} className="gitcine-eval-image" />
                  <div className="gitcine-eval-content">
                    <h4>{item.movieTitle}</h4>
                    <div className="gitcine-eval-score-badge">
                      ★ Nota atribuída: <strong>{item.score} / 5</strong>
                    </div>
                  </div>
                  <Link to={`/movies/${item.id}/rate`} className="gitcine-eval-edit-btn">
                    Alterar Nota
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Profile;