import '../styles/SearchBar.css'

export const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Buscar personaje por nombre..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      {searchTerm && (
        <button className="clear-btn" onClick={() => onSearchChange('')}>
          ✕
        </button>
      )}
    </div>
  )
}
