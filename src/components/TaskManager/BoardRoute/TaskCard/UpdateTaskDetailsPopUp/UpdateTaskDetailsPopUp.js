import {useState} from 'react'
import './UpdateTaskDetailsPopUp.css'

const UpdateTaskDetailsPopUp = ({onUpdateTask, initialTask}) => {
  const [name, setName] = useState(initialTask.name || '')
  const [description, setDescription] = useState(initialTask.description || '')
  const [commentsList, setCommentsList] = useState(
    initialTask.commentsList || [],
  )
  const [newComment, setNewComment] = useState('')
  const [isNameEdit, setIsNameEdit] = useState(false)

  const onClickTaskName = () => {
    setIsNameEdit(true)
  }

  const onNameChange = event => {
    setName(event.target.value)
  }

  const onDescriptionChange = event => {
    setDescription(event.target.value)
  }
  const handleAddComment = () => {
    if (newComment.trim() === '') return

    const updatedComments = [...commentsList, newComment]
    setCommentsList(updatedComments)
    setNewComment('')

    // send updated task to parent
    onUpdateTask({
      name,
      description,
      commentsList: updatedComments,
    })
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddComment()
    }
  }

  return (
    <div className="task-details-container">
      <button type="button">
        <img
          src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755864143/close_oyomr8.png"
          alt="close-icon"
          className="close-icon"
        />
      </button>
      <div className="task-name-and-delete-container">
        <div className="task-name-container">
          {isNameEdit ? (
            <input type="text" className="name-input-field" />
          ) : (
            <button
              type="button"
              className="task-title"
              onClick={onClickTaskName}
            >
              {name}
            </button>
          )}
          <p className="task-subtitle">in list done</p>
        </div>
      </div>

      <div className="section">
        <h4>Description</h4>
        <textarea
          className="description-input"
          placeholder="Add a more detailed description...."
          value={description}
          onChange={onDescriptionChange}
          onBlur={() => onUpdateTask({name, description, commentsList})}
        />
      </div>

      <div className="section">
        <h4>Activity</h4>
        <div className="comment-box">
          <div className="avatar">NK</div>
          <input
            type="text"
            className="comment-input"
            placeholder="Write a Comment..."
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="add-comment-btn"
            onClick={handleAddComment}
          >
            Add
          </button>
        </div>

        <ul className="comments-list">
          {commentsList.map(comment => (
            <li key={comment.id} className="comment-item">
              <span className="avatar small">NK</span>
              <p>{comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default UpdateTaskDetailsPopUp
