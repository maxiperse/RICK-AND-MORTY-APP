import useFetch from './hooks/useFetch';
import './App.css';

function App() {
  const { data, loading, error } = useFetch('https://rickandmortyapi.com/api/character');

  return (
    <div className="app-container">
      <header>
        <h1>Rick and Morty Characters</h1>
        <p>Listado inicial</p>
      </header>

      {loading && <div className="status-message">Cargando personajes...</div>}
      {error && <div className="status-message error">Error: {error}</div>}

      {data && data.results && (
        <div className="cards-grid">
          {data.results.map((character) => (
            <article key={character.id} className="character-card">
              <img src={character.image} alt={character.name} />
              <div className="character-info">
                <h2>{character.name}</h2>
                <p>{character.species}</p>
                <p>Estado: {character.status}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;