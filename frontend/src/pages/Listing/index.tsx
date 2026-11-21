import axios from "axios";
import MovieCard from "components/MovieCard";
import Pagination from "components/Pagination";
import { useEffect, useState, useMemo, useRef } from "react";
import { Movie, MoviePage } from "types/movie";
import { BASE_URL } from "utils/requests";
import "./styles.css";

function Listing() {
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [allMovies, setAllMovies] = useState<Movie[]>([]);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [page, setPage] = useState<MoviePage>({
    content: [],
    last: true,
    totalPages: 0,
    totalElements: 0,
    size: 12,
    number: 0,
    first: true,
    numberOfElements: 0,
    empty: true,
  });

  useEffect(() => {
    setLoading(true);
    setErrorMsg("");

    const term = searchTerm.trim();

    if (term) {
      axios
        .get(`${BASE_URL}/movies?page=0&size=1000`)
        .then((response) => {
          const data = response.data as MoviePage;
          setAllMovies(data.content);
        })
        .catch(() => {
          setErrorMsg("Não foi possível buscar os filmes. Verifique se o backend está rodando na porta 8080.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      axios
        .get(`${BASE_URL}/movies?page=${pageNumber}&size=12`)
        .then((response) => {
          const data = response.data as MoviePage;
          setPage(data);
        })
        .catch(() => {
          setErrorMsg("Não foi possível carregar os filmes. Verifique se o backend está rodando na porta 8080.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [pageNumber, searchTerm]);

  const handleOpenSearch = () => {
    setSearchOpen(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 50);
  };

  const handleCloseSearch = () => {
    setSearchTerm("");
    setSearchOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleCloseSearch();
    }
  };

  const handlePageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  const filteredMovies = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return page.content;
    }
    return allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(term)
    );
  }, [allMovies, page.content, searchTerm]);

  return (
    <main className="gitcine-listing-page">
      <div className="container">
        {/* Cabeçalho com Título à Esquerda e Lupa Expansível à Direita */}
        <div className="gitcine-listing-topbar">
          <div className="gitcine-listing-title-group">
            <h2>Catálogo de Filmes</h2>
            <p>Explore os títulos disponíveis e deixe a sua avaliação.</p>
          </div>

          <div className={`gitcine-expandable-search ${searchOpen ? "is-open" : ""}`}>
            <button
              type="button"
              onClick={searchOpen ? () => searchInputRef.current?.focus() : handleOpenSearch}
              className="gitcine-search-icon-btn"
              title="Pesquisar filme"
              aria-label="Pesquisar filme"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="gitcine-expandable-input"
            />

            {searchOpen && (
              <button
                type="button"
                onClick={handleCloseSearch}
                className="gitcine-search-close-btn"
                title="Fechar busca"
                aria-label="Fechar busca"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="gitcine-state-box">
            <span>Carregando catálogo...</span>
          </div>
        ) : errorMsg ? (
          <div className="gitcine-state-box">
            <span>{errorMsg}</span>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="gitcine-state-box">
            <span>
              {searchTerm
                ? `Nenhum filme encontrado com "${searchTerm}".`
                : "Nenhum filme encontrado no catálogo."}
            </span>
          </div>
        ) : (
          <div className="row">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}

        {!searchTerm.trim() && (
          <div className="gitcine-pagination-wrapper">
            <Pagination page={page} onChange={handlePageChange} />
          </div>
        )}
      </div>
    </main>
  );
}

export default Listing;