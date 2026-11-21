import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Login/styles.css';

function SuggestMovie() {
  const [userName, setUserName] = useState('');
  const [movieTitle, setMovieTitle] = useState('');
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName.trim() || !movieTitle.trim()) {
      setError('Preencha o seu nome e o nome do filme.');
      setInfoMessage('');
      return;
    }

    setError('');
    setInfoMessage(
      `Sugestão de "${movieTitle.trim()}" preparada. O envio direto por e-mail para o admin estará disponível no próximo lançamento!`
    );
  };

  return (
    <div className="gitcine-auth-container">
      <div className="gitcine-auth-card">
        <div className="gitcine-auth-header">
          <span className="gitcine-rate-badge">Próximo lançamento</span>
          <h2>Indicar um Filme</h2>
          <p>
            Envie sua indicação direto para o admin por e-mail — esse envio direto chega no próximo lançamento do GitCine.
          </p>
        </div>

        {error && <div className="gitcine-auth-alert">{error}</div>}
        {infoMessage && <div className="gitcine-auth-success">{infoMessage}</div>}

        <form onSubmit={handleSubmit} className="gitcine-auth-form">
          <div className="gitcine-form-group">
            <label htmlFor="userName">Seu nome</label>
            <input
              id="userName"
              type="text"
              placeholder="Ex: Maria Silva"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="gitcine-input"
            />
          </div>

          <div className="gitcine-form-group">
            <label htmlFor="movieTitle">Nome do filme</label>
            <input
              id="movieTitle"
              type="text"
              placeholder="Ex: Interestelar"
              value={movieTitle}
              onChange={(e) => setMovieTitle(e.target.value)}
              className="gitcine-input"
            />
          </div>

          <button type="submit" className="gitcine-btn-primary">
            Enviar direto por e-mail (Em breve)
          </button>
        </form>

        <div className="gitcine-auth-footer">
          <Link to="/" className="gitcine-auth-link">
            Voltar para o catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SuggestMovie;