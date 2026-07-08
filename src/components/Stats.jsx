import '../styles/Stats.css'

export const Stats = ({ total, favorites, blocked, filtered }) => {
  return (
    <div className="stats-container">
      <div className="stat-item">
        <span className="stat-label">Total:</span>
        <span className="stat-value">{total}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Favoritos:</span>
        <span className="stat-value">{favorites}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Bloqueados:</span>
        <span className="stat-value">{blocked}</span>
      </div>
      {filtered !== total && (
        <div className="stat-item">
          <span className="stat-label">Mostrados:</span>
          <span className="stat-value">{filtered}</span>
        </div>
      )}
    </div>
  )
}
