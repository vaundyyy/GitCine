import { ReactComponent as GithubIcon } from '../../assets/img/github.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import './styles.css';

function Navbar() {
    const navigate = useNavigate();
    const { authenticated, isAdmin, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="gitcine-header">
            <nav className="container">
                <div className="gitcine-nav-content">
                    <Link to="/" className="gitcine-brand">
                        <h1>GitCine</h1>
                    </Link>

                    <div className="gitcine-nav-actions">
                        {authenticated ? (
                            <>
                                {isAdmin ? (
                                    <Link to="/admin" className="gitcine-nav-link gitcine-admin-badge">
                                        Painel Admin
                                    </Link>
                                ) : (
                                    <>
                                        <Link to="/suggest" className="gitcine-nav-link">
                                            Indicar Filme
                                        </Link>
                                        <Link to="/profile" className="gitcine-profile-btn">
                                            Meu Perfil
                                        </Link>
                                    </>
                                )} 
                                <button onClick={handleLogout} className="gitcine-logout-btn">
                                    Sair
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="gitcine-login-btn">
                                Entrar
                            </Link>
                        )}

                        <div className="gitcine-nav-divider" />

                        <a href="https://github.com/devsuperior" target="_blank" rel="noreferrer" className="gitcine-github-link">
                            <GithubIcon className="gitcine-contact-icon" />
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;