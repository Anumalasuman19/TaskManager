import {useState} from 'react'
import TaskCard from '../BoardRoute/TaskCard/TaskCard'
import ApiStatus, {ApiKey} from '../CommonComponents/Constants'
import './SearchTasks.css'

const SearchTasks = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searchApiStatus, setSearchApiStatus] = useState(ApiStatus.initial)
  const [isInputFocused, setIsInputFocused] = useState(false)

  const searchTasksApi = async searchQuery => {
    setSearchApiStatus(ApiStatus.loading)
    const token = localStorage.getItem('pa_token')

    const url = `https://api.trello.com/1/search?key=${ApiKey}&token=${token}&query=${encodeURIComponent(
      searchQuery,
    )}&modelTypes=cards&card_fields=id,name,desc,closed,pos,idList,idBoard,url`

    const response = await fetch(url)
    const data = await response.json()
    const tasks = data.cards || []
    setResults(tasks)
    if (response.ok) {
      setSearchApiStatus(ApiStatus.success)
    } else {
      setSearchApiStatus(ApiStatus.failure)
    }
  }

  const handleSearch = e => {
    const newQuery = e.target.value
    setQuery(newQuery)

    if (newQuery.trim() !== '') {
      searchTasksApi(newQuery)
    } else {
      setResults([])
      setSearchApiStatus(ApiStatus.initial)
    }
  }

  const onSearchFocus = () => {
    setIsInputFocused(true)
  }

  const onSearchBlur = () => {
    setIsInputFocused(false)
  }

  const getResultView = () => {
    switch (searchApiStatus) {
      case ApiStatus.loading:
        return <p className="loading-text">Searching...</p>
      case ApiStatus.success:
        return results.length > 0 ? (
          <ul className="search-result-list">
            {results.map(task => (
              <li className="search-result-item" key={task.id}>
                <TaskCard
                  name={task.name}
                  taskId={task.id}
                  onDeleteTask={() => {}}
                  description={task.desc}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-results">
            We couldn’t find any cards or boards that matched your search.
          </p>
        )
      case ApiStatus.failure:
        return (
          <p className="no-results">Something went wrong. Please try again.</p>
        )
      default:
        return null
    }
  }

  return (
    <div className="search-container">
      <div className="search-input-container">
        <input
          type="search"
          value={query}
          onChange={handleSearch}
          onFocus={onSearchFocus}
          onBlur={onSearchBlur}
          placeholder="Search"
          className="search-input"
        />
        {isInputFocused ? (
          <></>
        ) : (
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755854561/search_p1o08q.png"
            className="search-input-icon"
            alt="search-icon"
          />
        )}
      </div>

      {isInputFocused && query !== '' ? (
        <div className="results-container">{getResultView()}</div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default SearchTasks
