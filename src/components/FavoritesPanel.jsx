import React from 'react';

function FavoritesPanel({ favorites, onRemove }) {
  return (
    <aside className="favorites-panel">
      <h3>Favoritos ({favorites.length})</h3>
      {favorites.length === 0 ? (
        <p className="empty">No hay favoritos aún.</p>
      ) : (
        <ul>
          {favorites.map((f) => (
            <li key={f.id} className="favorite-item">
              <img src={f.image} alt={f.name} />
              <div className="fav-meta">
                <div className="fav-name">{f.name}</div>
                <button className="remove-fav" onClick={() => onRemove(f.id)} aria-label={`Quitar ${f.name} de favoritos`}>
                  Quitar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default FavoritesPanel;
