import {useState, useRef, useEffect} from 'react'
import './EditListName.css'

const EditListName = ({onEditListName, previousListName}) => {
  const [listName, setListName] = useState(previousListName)
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const onEditName = event => {
    event.preventDefault()
    if (listName.trim() === '') return
    onEditListName(listName.trim())
  }

  const onChangeListName = event => {
    setListName(event.target.value)
  }

  return (
    <form onSubmit={onEditName} className="edit-list-container">
      <input
        ref={inputRef}
        type="text"
        value={listName}
        placeholder="Enter list name..."
        onChange={onChangeListName}
        className="edit-list-input"
      />
    </form>
  )
}

export default EditListName
