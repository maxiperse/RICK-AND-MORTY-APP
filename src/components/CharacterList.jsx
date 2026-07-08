import { CharacterCard } from './CharacterCard'
import '../styles/CharacterList.css'

export const CharacterList = ({
  characters,
  onFavorite,
  onBlock,
  favorites,
  blocked,
  loading,
  error,
}) {
  if (loading) {
    return <div className="loading">Cargando personajes...</div>
  }

  if (error) {
    return <div className="error">Error al cargar los datos: {error}</div>
  }

  if (!characters || characters.length === 0) {
    return <div className="empty">No se encontraron personajes</div>
  }

  return (
    <div className="character-list">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          onFavorite={onFavorite}
          onBlock={onBlock}
          isFavorite={favorites.includes(character.id)}
          isBlocked={blocked.includes(character.id)}
        />
      ))}
    </div>
  )
}
