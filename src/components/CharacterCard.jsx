import '../styles/CharacterCard.css'

export const CharacterCard = ({ character, onFavorite, onBlock, isFavorite, isBlocked }) => {
  return (
    <div className="character-card">
      <div className="character-image-container">
        <img src={character.image} alt={character.name} className="character-image" />
        {isBlocked && <div className="blocked-overlay">BLOQUEADO</div>}
      </div>
      <div className="character-info">
        <h3 className="character-name">{character.name}</h3>
        <p className="character-status">
          <span className={`status-badge ${character.status.toLowerCase()}`}>
            {character.status}
          </span>
        </p>
        <p className="character-species">{character.species}</p>
        <div className="character-actions">
          <button
            className={`btn btn-favorite ${isFavorite ? 'active' : ''}`}
            onClick={() => onFavorite(character.id)}
            title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
          <button
            className={`btn btn-block ${isBlocked ? 'active' : ''}`}
            onClick={() => onBlock(character.id)}
            title={isBlocked ? 'Desbloquear' : 'Bloquear'}
          >
            {isBlocked ? '🚫' : '⛔'}
          </button>
        </div>
      </div>
    </div>
  )
}
