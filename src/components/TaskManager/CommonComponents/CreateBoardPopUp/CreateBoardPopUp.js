import {useState} from 'react'
import './CreateBoardPopUp.css'

const CreateBoardPopUp = props => {
  const {onCreateBoard, organizationName, onCreateBoardPopUpClose} = props
  const [title, setTitle] = useState('')

  const handleCreate = () => {
    if (title.trim() === '') return
    onCreateBoard(title)
    setTitle('')
  }

  return (
    <div className="popup-overlay">
      <div className="create-board-container">
        <button
          type="button"
          className="close-btn no-mobile-view-display-popup-element "
          onClick={onCreateBoardPopUpClose}
        >
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755864143/close_oyomr8.png"
            alt="close-icon"
            className="close-icon"
          />
        </button>
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
            className="close-btn no-desktop-view-display-popup-element"
            onClick={onCreateBoardPopUpClose}
          >
            <img
              src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755864143/close_oyomr8.png"
              alt="close-icon"
              className="close-icon"
            />
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
    </div>
  )
}

export default CreateBoardPopUp
