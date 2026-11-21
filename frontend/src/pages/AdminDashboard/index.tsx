import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from 'utils/requests';
import '../Login/styles.css';
import './styles.css';

function AdminDashboard() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const handleAddMovie = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !image.trim()) {
      setFeedback({ type: 'error', text: 'Preencha o título e a URL da imagem do filme.' });
      return;
    }

    axios.post(`${BASE_URL}/movies`, {
      title: title.trim(),
      image: image.trim(),
      score: 0,
      count: 0
    })
      .then(() => {
        setFeedback({ type: 'success', text: 'Filme cadastrado com sucesso no catálogo!' });
        setTitle('');
        setImage('');
      })
      .catch(() => {
        setFeedback({
          type: 'warning',
          text: 'Dados validados! Crie o endpoint POST /movies no Spring Boot para salvar no banco.'
        });
      });
  };

  return (
    <div className="gitcine-auth-container">
      <div className="gitcine-auth-card">
        <div className="gitcine-auth-header">
          <span className="gitcine-rate-badge">Painel Admin</span>
          <h2>Adicionar Novo Filme</h2>
          <p>Cadastre um título no catálogo oficial do GitCine.</p>
        </div>

        {feedback.text && (
          <div className={`gitcine-feedback-${feedback.type}`}>
            {feedback.text}
          </div>
        )}

        <form onSubmit={handleAddMovie} className="gitcine-auth-form">
          <div className="gitcine-form-group">
            <label htmlFor="movieTitle">Título do Filme</label>
            <input
              id="movieTitle"
              type="text"
              className="gitcine-input"
              placeholder="Ex: Clube da Luta"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="gitcine-form-group">
            <label htmlFor="movieImage">URL da Capa (16:9)</label>
            <input
              id="movieImage"
              type="text"
              className="gitcine-input"
              placeholder="https://..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <button type="submit" className="gitcine-btn-primary">
            Cadastrar Filme
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

export default AdminDashboard;