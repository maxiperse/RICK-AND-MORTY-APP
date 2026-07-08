import { useState } from 'react';
import useFetch from './hooks/useFetch';
import SearchBar from './components/SearchBar';
import FavoritesPanel from './components/FavoritesPanel';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading, error } = useFetch('https://rickandmortyapi.com/api/character');

  const filteredCharacters = data?.results?.filter((character) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return character.name.toLowerCase().includes(term);
  }) ?? [];

  const [favorites, setFavorites] = useState([]);

  function isFavorite(id) {
    return favorites.some((f) => f.id === id);
  }

  function toggleFavorite(character) {
    if (isFavorite(character.id)) {
      setFavorites((prev) => prev.filter((f) => f.id !== character.id));
    } else {
      setFavorites((prev) => [...prev, { id: character.id, name: character.name, image: character.image }]);
    }
  }

  return (
    <div className="app-container">
      <header>
        <h1>Rick and Morty Characters</h1>
        <p>Listado inicial</p>
      </header>

      <SearchBar value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />

      {loading && <div className="status-message">Cargando personajes...</div>}
      {error && <div className="status-message error">Error: {error}</div>}

      <div className="main-and-sidebar">
        <main className="main">
          {data && data.results && (
            <div className="cards-grid">
              {filteredCharacters.map((character) => (
                <article key={character.id} className="character-card">
                  <img src={character.image} alt={character.name} />
                  <div className="character-info">
                    <h2>{character.name}</h2>
                    <p>{character.species}</p>
                    <p>Estado: {character.status}</p>
                  </div>
                  <button
                    className={`favorite-btn ${isFavorite(character.id) ? 'fav' : ''}`}
                    onClick={() => toggleFavorite(character)}
                    aria-label={isFavorite(character.id) ? `Quitar ${character.name} de favoritos` : `Agregar ${character.name} a favoritos`}
                  >
                    {isFavorite(character.id) ? '★' : '☆'}
                  </button>
                </article>
              ))}
            </div>
          )}
        </main>

        <FavoritesPanel favorites={favorites} onRemove={(id) => setFavorites((prev) => prev.filter((f) => f.id !== id))} />
      </div>
    </div>
  );
}

export default App;