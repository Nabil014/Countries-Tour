import { useEffect, useRef, useContext } from 'react'
import searchIcon from '../assets/search.svg'
import countriesStore from '../store/countriesStore'
import useDebounce from '../hooks/useDebounce'
import { SearchContext } from '../context/searchContext'

export default function SearchBar () {
  const { searchFetch } = countriesStore();
  const { search, setSearch } = useContext(SearchContext)
  const debouncedSearch = useDebounce(search, 400)

  const prevSearch = useRef(search)

  useEffect(() => {
    if (prevSearch.current === search) return

    searchFetch(debouncedSearch);
  }, [debouncedSearch, searchFetch])

  const handleChange = (e) => {
    setSearch(e.target.value)
    prevSearch.current = search
  }

  return (
    <form className="relative z-20 w-72" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Argentina, France ..."
        className="w-full h-10 pl-10 pr-20 text-gray-900 bg-gray-200 rounded-full focus:outline-none"
        value={search}
        onChange={handleChange}
      />
      <button className="absolute right-6 top-2">
        <img src={searchIcon} alt="search icon" />
      </button>
    </form>
  );
}