import {useState} from 'react'
import './EditListName.css'

const EditListName = ({onEditListName}) => {
  const [listName, setListName] = useState('')

  const onEditName = event => {
    event.preventDefault()
    if (listName.trim() === '') return
    onEditListName(listName.trim())
    setListName('')
  }

  const onChangeListName = event => {
    setListName(event.target.value)
  }

  return (
    <form onSubmit={onEditName} className="edit-list-container">
      <input
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
