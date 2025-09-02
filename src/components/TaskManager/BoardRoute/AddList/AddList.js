import {useState, useRef, useEffect} from 'react'
import './AddList.css'

const AddList = ({onAddList, onClose}) => {
  const [listName, setListName] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleAdd = event => {
    event.preventDefault()
    if (listName.trim() === '') return
    onAddList(listName.trim())
  }

  const onChangeListName = event => {
    setListName(event.target.value)
  }

  return (
    <form onSubmit={handleAdd} className="add-list-container">
      <input
        ref={inputRef}
        type="text"
        value={listName}
        placeholder="Enter list name..."
        onChange={onChangeListName}
        className="add-list-input"
      />

      <div className="add-list-actions">
        <button type="submit" className="add-list-btn">
          Add List
        </button>
        <button type="button" className="add-list-close-btn" onClick={onClose}>
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755864143/close_oyomr8.png"
            alt="close-icon"
            className="add-list-close-icon"
          />
        </button>
      </div>
    </form>
  )
}

export default AddList
