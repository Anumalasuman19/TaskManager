import {useState} from 'react'
import './CreateBoardPopUp.css'

const CreateBoardPopUp = props => {
  const {onCreateBoard, organizationName, onCreateBoardPopUpClose} = props
  const [title, setTitle] = useState('')

  const handleCreate = () => {
    if (title.trim() === '') return
    onCreateBoard(title) // callback to parent
    setTitle('') // reset input
  }

  return (
    <div className="create-board-container">
      <div className="input-and-close-button">
        <input
          type="text"
          placeholder="Add board title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="create-board-input"
        />
        <button
          type="button"
          className="close-btn"
          onClick={onCreateBoardPopUpClose}
        >
          ×
        </button>
      </div>

      <p className="create-board-workspace">{organizationName}</p>
      <button
        type="button"
        onClick={handleCreate}
        className="create-board-button"
      >
        Create Board
      </button>
    </div>
  )
}

export default CreateBoardPopUp
