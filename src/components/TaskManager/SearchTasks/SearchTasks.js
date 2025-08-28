import {useState} from 'react'
import TaskCard from '../BoardRoute/TaskCard/TaskCard'
import ApiStatus, {ApiKey} from '../CommonComponents/Constants'
import './SearchTasks.css'

const SearchTasks = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searchApiStatus, setSearchApiStatus] = useState(ApiStatus.initial)
  const [isInputFocused, setIsInputFocused] = useState(false)

  // API function
  const searchTasksApi = async () => {
    setSearchApiStatus(ApiStatus.loading)
    const token = localStorage.getItem('pa_token')

    const url = `https://api.trello.com/1/search?key=${ApiKey}&token=${token}&query=${encodeURIComponent(
      query,
    )}&modelTypes=cards&card_fields=id,name,desc,closed,pos,idList,idBoard,url`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    // Trello search returns an object with cards & boards
    const tasks = data.cards || []
    setResults(tasks)
    if (tasks) {
      setSearchApiStatus(ApiStatus.success)
    } else {
      setSearchApiStatus(ApiStatus.failure)
    }
  }

  const handleSearch = async e => {
    await setQuery(e.target.value)

    if (query.trim() !== '') {
      searchTasksApi()
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
          <ul>
            {results.map(task => (
              <TaskCard
                key={task.id}
                name={task.name}
                taskId={task.id}
                onDeleteTask={() => {}}
                description={task.desc}
              />
            ))}
          </ul>
        ) : (
          <p className="no-results">
            We couldn’t find any cards or boards that matched your search.
          </p>
        )
      case ApiStatus.failure:
        return (
          <p className="error-text">Something went wrong. Please try again.</p>
        )
      default:
        return null
    }
  }

  return (
    <div className="search-container">
      <input
        type="search"
        value={query}
        onChange={handleSearch}
        onFocus={onSearchFocus}
        onBlur={onSearchBlur}
        placeholder="Search"
        className="search-input"
      />
      <img
        src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755854561/search_p1o08q.png"
        className="search-icon"
        alt="search-icon"
      />

      {onSearchFocus && (
        <div className="results-container">{getResultView()}</div>
      )}
    </div>
  )
}

export default SearchTasks
