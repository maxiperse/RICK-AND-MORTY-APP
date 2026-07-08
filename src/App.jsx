import { useState, useMemo, useEffect } from 'react'
import { useFetch } from './hooks/useFetch'
import { useLocalStorage } from './hooks/useLocalStorage'
import { Header } from './components/Header'
import { SearchBar } from './components/SearchBar'
import { CharacterList } from './components/CharacterList'
import { FavoritesList } from './components/FavoritesList'
import { BlockedList } from './components/BlockedList'
import { Stats } from './components/Stats'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [favorites, setFavorites] = useLocalStorage('favorites', [])
  const [blocked, setBlocked] = useLocalStorage('blocked', [])
  const [allCharacters, setAllCharacters] = useState([])

  const { data, loading, error } = useFetch('https://rickandmortyapi.com/api/character')

  useEffect(() => {
    if (data && data.results) {
      setAllCharacters(data.results)
    }
  }, [data])

  const filteredCharacters = useMemo(() => {
    return allCharacters.filter(
      (character) =>
        !blocked.includes(character.id) &&
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [allCharacters, blocked, searchTerm])

  const handleFavorite = (characterId) => {
    setFavorites((prev) =>
      prev.includes(characterId) ? prev.filter((id) => id !== characterId) : [...prev, characterId]
    )
  }

  const handleBlock = (characterId) => {
    setBlocked((prev) => {
      const newBlocked = prev.includes(characterId)
        ? prev.filter((id) => id !== characterId)
        : [...prev, characterId]

      if (!prev.includes(characterId)) {
        setFavorites((prevFav) => prevFav.filter((id) => id !== characterId))
      }

      return newBlocked
    })
  }

  return (
    <div className="app">
      <Header />
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <Stats
        total={allCharacters.length}
        favorites={favorites.length}
        blocked={blocked.length}
        filtered={filteredCharacters.length}
      />

      <div className="main-container">
        <div className="content-area">
          <CharacterList
            characters={filteredCharacters}
            onFavorite={handleFavorite}
            onBlock={handleBlock}
            favorites={favorites}
            blocked={blocked}
            loading={loading}
            error={error}
          />
        </div>

        <div className="sidebar">
          <FavoritesList
            characters={allCharacters}
            favorites={favorites}
            onRemoveFavorite={handleFavorite}
          />
          <BlockedList
            characters={allCharacters}
            blocked={blocked}
            onUnblock={handleBlock}
          />
        </div>
      </div>

      <footer className="footer">
        <p>© 2026 Rick and Morty App - Desarrollado con React + Vite</p>
      </footer>
    </div>
  )
}

export default App