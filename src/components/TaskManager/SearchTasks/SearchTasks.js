import {useState, useEffect} from 'react'
import TaskCard from '../BoardRoute/TaskCard/TaskCard'
import ApiStatus, {
  ApiKey,
  GetToken,
  NavBarActivePopup,
} from '../CommonComponents/Constants'
import useApi from '../CommonComponents/UseApi/UseApi'
import './SearchTasks.css'

const SearchTasks = ({setActivePopup, activePopup}) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isInputFocused, setIsInputFocused] = useState(false)

  const {refetch: searchTasksApi, status: searchApiStatus} = useApi(
    null,
    {method: 'GET'},
    false,
  )

  useEffect(() => {
    if (activePopup !== NavBarActivePopup.desktopSearchSection) {
      setQuery('')
      setResults([])
    }
  }, [activePopup])

  const performSearch = async searchQuery => {
    const url = `https://api.trello.com/1/search?key=${ApiKey}&token=${GetToken()}&query=${encodeURIComponent(
      searchQuery,
    )}&modelTypes=cards&card_fields=id,name,desc,closed,pos,idList,idBoard,url`

    try {
      const data = await searchTasksApi({url})
      const tasks = data.cards || []
      setResults(tasks)
    } catch (err) {
      setResults([])
    }
  }

  const handleSearch = e => {
    const newQuery = e.target.value
    setQuery(newQuery)

    if (newQuery.trim() !== '') {
      performSearch(newQuery)
    } else {
      setResults([])
    }
  }

  const onSearchFocus = () => {
    if (setActivePopup) {
      setActivePopup(NavBarActivePopup.desktopSearchSection)
    }
    setIsInputFocused(true)
  }

  const onSearchBlur = () => {
    setIsInputFocused(false)
  }

  const getResultView = () => {
    switch (searchApiStatus) {
      case ApiStatus.inProgress:
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
                  isDeleteRequired={false}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-results">
            We couldn’t find any cards that matched your search.
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
        {isInputFocused ? null : (
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755854561/search_p1o08q.png"
            className="search-input-icon"
            alt="search-icon"
          />
        )}
      </div>

      {query !== '' ? (
        <div className="results-container">{getResultView()}</div>
      ) : null}
    </div>
  )
}

export default SearchTasks
