import React from 'react';

function BlockedPanel({ blockedItems, onUnblock }) {
  return (
    <aside className="blocked-panel">
      <h3>Bloqueados ({blockedItems.length})</h3>
      {blockedItems.length === 0 ? (
        <p className="empty">No hay elementos bloqueados.</p>
      ) : (
        <ul>
          {blockedItems.map((b) => (
            <li key={b.id} className="blocked-item">
              <img src={b.image} alt={b.name} />
              <div className="blocked-meta">
                <div className="blocked-name">{b.name}</div>
                <button className="unblock-btn" onClick={() => onUnblock(b.id)} aria-label={`Desbloquear ${b.name}`}>
                  Desbloquear
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default BlockedPanel;
