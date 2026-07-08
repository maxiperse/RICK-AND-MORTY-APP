import '../styles/BlockedList.css'

export const BlockedList = ({ characters, blocked, onUnblock }) => {
  const blockedCharacters = characters.filter((char) => blocked.includes(char.id))

  return (
    <aside className="blocked-panel">
      <h2>Bloqueados ({blocked.length})</h2>
      <div className="blocked-list">
        {blockedCharacters.length === 0 ? (
          <p className="empty-message">No hay bloqueados</p>
        ) : (
          blockedCharacters.map((character) => (
            <div key={character.id} className="blocked-item">
              <div className="blocked-info">
                <h4>{character.name}</h4>
                <button
                  className="unblock-btn"
                  onClick={() => onUnblock(character.id)}
                  title="Desbloquear"
                >
                  Desbloquear
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  )
}
