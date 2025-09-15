import {useState, useRef, useEffect} from 'react'

import './CreateBoardPopUp.css'

const CreateBoardPopUp = props => {
  const {onCreateBoard, organizationName, onCreateBoardPopUpClose} = props
  const [title, setTitle] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleCreate = event => {
    event.preventDefault()
    if (title.trim() === '') return
    onCreateBoard(title)
  }

  const onChangeInput = event => {
    setTitle(event.target.value)
  }

  return (
    <div className="popup-overlay">
      <form onSubmit={handleCreate} className="create-board-container">
        <button
          type="button"
          className="create-board-close-btn no-mobile-view-display-popup-element"
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
            ref={inputRef}
            type="text"
            placeholder="Add board title"
            value={title}
            onChange={onChangeInput}
            className="create-board-input"
          />
          <button
            type="button"
            className="create-board-close-btn no-desktop-view-display-popup-element"
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
