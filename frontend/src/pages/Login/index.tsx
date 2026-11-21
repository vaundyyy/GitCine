import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import './styles.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Por favor, preencha seu usuário/e-mail e senha.');
      return;
    }

    setErrorMessage('');

    if (email.trim().toLowerCase() === 'admin@admin.com' && password === 'admin') {
      login('token-admin-gitcine', 'admin');
      navigate('/');
      return;
    }

    login('token-user-gitcine', 'user', email.trim().toLowerCase());
    navigate('/');
  };

  return (
    <div className="gitcine-auth-container">
      <div className="gitcine-auth-card">
        <div className="gitcine-auth-header">
          <h2>Entrar no GitCine</h2>
          <p>Insira suas credenciais para avaliar filmes e acessar seu perfil.</p>
        </div>

        {errorMessage && (
          <div className="gitcine-auth-alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="gitcine-auth-form">
          <div className="gitcine-form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="nome@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="gitcine-input"
            />
          </div>

          <div className="gitcine-form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="gitcine-input"
            />
          </div>

          <button type="submit" className="gitcine-btn-primary">
            Continuar
          </button>
        </form>

        <div className="gitcine-auth-footer">
          <span>Ainda não tem uma conta? </span>
          <Link to="/register" className="gitcine-auth-link">
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;