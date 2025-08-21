import {useState} from 'react'
import './AddList.css'

const AddList = ({onAddList, onClose}) => {
  const [listName, setListName] = useState('')

  const handleAdd = () => {
    if (listName.trim() === '') return
    onAddList(listName.trim())
    setListName('') // reset input after adding
  }

  return (
    <div className="add-list-container">
      <input
        type="text"
        value={listName}
        placeholder="Enter list name..."
        onChange={e => setListName(e.target.value)}
        className="add-list-input"
      />

      <div className="add-list-actions">
        <button type="button" className="add-list-btn" onClick={handleAdd}>
          Add List
        </button>
        <button type="button" className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  )
}

export default AddList
