import {useState, useEffect} from 'react'
import useTaskManager from '../../../CommonComponents/UseTaskManager/UseTaskManager'
import {ApiKey, GetToken} from '../../../CommonComponents/Constants'
import './UpdateTaskDetailsPopUp.css'
import useApi from '../../../CommonComponents/UseApi/UseApi'

const UpdateTaskDetailsPopUp = ({
  onDelete,
  onUpdateTask,
  onClosePopup,
  taskName,
  taskId,
  description,
  isDeleteRequired,
}) => {
  const {userData} = useTaskManager()
  const [name, setName] = useState(taskName || '')
  const [updatedDescription, setDescription] = useState(description || '')
  const [updatedCommentsList, setCommentsList] = useState([])
  const [newComment, setNewComment] = useState('')
  const [isNameEdit, setIsNameEdit] = useState(false)
  const [isNameEmpty, setIsNameEmpty] = useState(false)

  const {refetch: addComment} = useApi(null, {method: 'POST'}, false)

  const onClickTaskName = () => {
    setIsNameEdit(true)
  }

  const onNameChange = event => {
    setName(event.target.value)
  }

  const onDescriptionChange = event => {
    setDescription(event.target.value)
  }

  const onAddComment = async commentText => {
    const url = `https://api.trello.com/1/cards/${taskId}/actions/comments?text=${commentText}&key=${ApiKey}&token=${GetToken()}`

    try {
      const response = await addComment({url, method: 'POST'})
    } catch (err) {
      console.error('Error adding comment:', err)
    }
  }

  const handleAddComment = () => {
    const trimmedComment = newComment.trim()
    if (!trimmedComment) return
    const commentsList = localStorage.getItem(taskId)
    const jsonData = JSON.parse(commentsList)
    let count = 0
    if (jsonData) {
      count = jsonData.length
    }
    onAddComment(trimmedComment)

    const commentItem = {
      comment: trimmedComment,
      id: count + 1,
      initials: userData.initials,
    }
    const updatedComments = [...updatedCommentsList, commentItem]
    setCommentsList(updatedComments)
    localStorage.setItem(taskId, JSON.stringify(updatedComments))
    setNewComment('')
  }

  const onCloseUpdateTaskPopup = () => {
    if (name) {
      onUpdateTask(name, updatedDescription)
    }
    onClosePopup()
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddComment()
    }
  }

  const onChangeComment = event => {
    setNewComment(event.target.value)
  }

  const updateTask = () => {
    if (name) {
      onUpdateTask(name, updatedDescription)
    } else {
      setIsNameEmpty(true)
    }
  }

  const onTaskNameOrDescriptionBlur = () => {
    updateTask()
  }

  useEffect(() => {
    const storedComments = localStorage.getItem(taskId)
    setName(taskName)
    setDescription(description)
    if (storedComments) {
      try {
        setCommentsList(JSON.parse(storedComments))
      } catch (error) {
        console.error('Failed to parse comments:', error)
        setCommentsList([])
      }
    }
  }, [taskId])

  return (
    <div className="task-details-popup-overlay">
      <div className="task-details-container">
        <button
          type="button"
          onClick={onCloseUpdateTaskPopup}
          className="update-task-close-button"
        >
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755864143/close_oyomr8.png"
            alt="close-icon"
            className="update-task-close-icon"
          />
        </button>
        <div className="task-name-and-delete-container">
          <div className="name-and-icon">
            <img
              src="https://res.cloudinary.com/dzki1pesn/image/upload/v1756360641/computer_bhazsl.png"
              alt="task-name-icon"
              className="task-name-icon"
            />
            <div className="task-name-container">
              {isNameEdit ? (
                <>
                  <input
                    type="text"
                    className="name-input-field"
                    value={name}
                    onChange={onNameChange}
                    onBlur={onTaskNameOrDescriptionBlur}
                  />
                  {isNameEmpty && <p className="error-message">*required</p>}
                </>
              ) : (
                <button
                  type="button"
                  className="task-title-button"
                  onClick={onClickTaskName}
                >
                  {name}
                </button>
              )}
              <p className="task-subtitle">in list done</p>
            </div>
          </div>
          {isDeleteRequired && (
            <button type="button" onClick={onDelete} className="delete-button">
              <img
                src="https://res.cloudinary.com/dzki1pesn/image/upload/v1756360757/delete_outline_xv2z7u.png"
                alt="delete-icon"
                className="delete-icon"
              />
            </button>
          )}
        </div>

        <div className="section">
          <div className="label-icon-and-text">
            <img
              src="https://res.cloudinary.com/dzki1pesn/image/upload/v1756360593/description-icon_jftqey.png"
              alt="description-icon"
            />
            <h4 className="task-input-label">Description</h4>
          </div>
          <textarea
            className="description-input"
            placeholder="Add a more detailed description...."
            value={updatedDescription}
            onChange={onDescriptionChange}
            onBlur={onTaskNameOrDescriptionBlur}
            rows="5"
          />
        </div>

        <div className="section">
          <div className="comment-input-box">
            <div className="label-icon-and-text">
              <img
                src="https://res.cloudinary.com/dzki1pesn/image/upload/v1756360578/comment-icon_qhgat8.png"
                alt="comments-icon"
              />
              <h4 className="task-input-label">Comments</h4>
            </div>
            <div className="comment-box">
              <div className="avatar">{userData.initials}</div>
              <input
                type="text"
                className="comment-input"
                placeholder="Write a Comment..."
                value={newComment}
                onChange={onChangeComment}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button
              type="submit"
              className="add-comment-btn"
              onClick={handleAddComment}
            >
              Add
            </button>
          </div>
          <ul className="comments-list">
            {updatedCommentsList.map(item => (
              <li key={item.id} className="comment-item">
                <div className="avatar small">{item.initials}</div>
                <p className="comment">{item.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UpdateTaskDetailsPopUp
