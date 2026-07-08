import '../styles/FavoritesList.css'

export const FavoritesList = ({ characters, favorites, onRemoveFavorite }) => {
  const favoriteCharacters = characters.filter((char) => favorites.includes(char.id))

  return (
    <aside className="favorites-panel">
      <h2>Favoritos ({favorites.length})</h2>
      <div className="favorites-list">
        {favoriteCharacters.length === 0 ? (
          <p className="empty-message">No hay favoritos aún</p>
        ) : (
          favoriteCharacters.map((character) => (
            <div key={character.id} className="favorite-item">
              <img src={character.image} alt={character.name} className="favorite-image" />
              <div className="favorite-info">
                <h4>{character.name}</h4>
                <button
                  className="remove-btn"
                  onClick={() => onRemoveFavorite(character.id)}
                  title="Quitar de favoritos"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  )
}
