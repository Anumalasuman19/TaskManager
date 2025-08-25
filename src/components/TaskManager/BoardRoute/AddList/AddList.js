import {useState} from 'react'
import './AddList.css'

const AddList = ({onAddList, onClose}) => {
  const [listName, setListName] = useState('')

  const handleAdd = event => {
    event.preventDefault()
    if (listName.trim() === '') return
    onAddList(listName.trim())
    setListName('')
  }

  const onChangeListName = event => {
    setListName(event.target.value)
  }

  return (
    <form onSubmit={handleAdd} className="add-list-container">
      <input
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
        <button type="button" className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>
    </form>
  )
}

export default AddList
