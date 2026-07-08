import { useState } from 'react';
import useFetch from './hooks/useFetch';
import useLocalStorage from './hooks/useLocalStorage';
import SearchBar from './components/SearchBar';
import FavoritesPanel from './components/FavoritesPanel';
import BlockedPanel from './components/BlockedPanel';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading, error } = useFetch('https://rickandmortyapi.com/api/character');

  const filteredCharacters = data?.results?.filter((character) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return character.name.toLowerCase().includes(term);
  }) ?? [];

  const [favorites, setFavorites] = useLocalStorage('ram_favorites', []);
  const [blockedIds, setBlockedIds] = useLocalStorage('ram_blocked', []);

  function isBlocked(id) {
    return blockedIds.includes(id);
  }

  function toggleBlock(character) {
    if (isBlocked(character.id)) {
      setBlockedIds((prev) => prev.filter((x) => x !== character.id));
    } else {
      setBlockedIds((prev) => [...prev, character.id]);
      // If blocked, also remove from favorites
      setFavorites((prev) => prev.filter((f) => f.id !== character.id));
    }
  }

  function handleUnblock(id) {
    setBlockedIds((prev) => prev.filter((x) => x !== id));
  }

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

  const totalCount = data?.info?.count ?? data?.results?.length ?? 0;

  return (
    <div className="app-container">
      <header>
        <h1>Rick and Morty Characters</h1>
        <p>Listado inicial</p>
        <div className="stats">
          <span>Total: {totalCount}</span>
          <span>Favoritos: {favorites.length}</span>
          <span>Bloqueados: {blockedIds.length}</span>
        </div>
      </header>

      <SearchBar value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />

      {loading && <div className="status-message">Cargando personajes...</div>}
      {error && <div className="status-message error">Error: {error}</div>}

      <div className="main-and-sidebar">
        <main className="main">
          {data && data.results && (
            <div className="cards-grid">
                  {filteredCharacters
                    .filter((c) => !isBlocked(c.id))
                    .map((character) => (
                <article key={character.id} className="character-card">
                  <img src={character.image} alt={character.name} />
                  <div className="character-info">
                    <h2>{character.name}</h2>
                    <p>{character.species}</p>
                    <p>Estado: {character.status}</p>
                  </div>
                      <div className="card-actions">
                        <button
                          className={`favorite-btn ${isFavorite(character.id) ? 'fav' : ''}`}
                          onClick={() => toggleFavorite(character)}
                          aria-label={isFavorite(character.id) ? `Quitar ${character.name} de favoritos` : `Agregar ${character.name} a favoritos`}
                        >
                          {isFavorite(character.id) ? '★' : '☆'}
                        </button>

                        <button
                          className={`block-btn ${isBlocked(character.id) ? 'blocked' : ''}`}
                          onClick={() => toggleBlock(character)}
                          aria-label={isBlocked(character.id) ? `Desbloquear ${character.name}` : `Bloquear ${character.name}`}
                        >
                          {isBlocked(character.id) ? 'Desbloquear' : 'Bloquear'}
                        </button>
                      </div>
                </article>
                  ))}
            </div>
          )}
        </main>

        <div className="sidebars">
          <FavoritesPanel favorites={favorites} onRemove={(id) => setFavorites((prev) => prev.filter((f) => f.id !== id))} />
          <BlockedPanel
            blockedItems={data?.results?.filter((c) => blockedIds.includes(c.id)) ?? []}
            onUnblock={handleUnblock}
          />
        </div>
      </div>
      <footer className="app-footer">
        <p><strong>Integrantes:</strong> [Maximiliano Robles]</p>
      </footer>
    </div>
  );
}

export default App;