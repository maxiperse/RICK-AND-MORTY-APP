function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Buscar personajes..."
        aria-label="Buscar personajes"
      />
    </div>
  );
}

export default SearchBar;
