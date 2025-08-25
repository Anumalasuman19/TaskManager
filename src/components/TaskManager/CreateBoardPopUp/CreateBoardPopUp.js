import {useState} from 'react'
import './CreateBoardPopUp.css'

const CreateBoardPopUp = props => {
  const {onCreateBoard, organizationName, onCreateBoardPopUpClose} = props
  const [title, setTitle] = useState('')

  const handleCreate = event => {
    event.preventDefault()
    if (title.trim() === '') return
    onCreateBoard(title)
    setTitle('')
  }

  const onChangeInput = event => {
    setTitle(event.target.value)
  }

  return (
    <div className="popup-overlay">
      <form onSubmit={handleCreate} className="create-board-container">
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
            onChange={onChangeInput}
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

        <p className="workspace-name-text">{organizationName}</p>
        <button type="submit" className="create-board-button">
          Create Board
        </button>
      </form>
    </div>
  )
}

export default CreateBoardPopUp
