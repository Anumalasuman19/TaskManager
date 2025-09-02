import {useState, useRef, useEffect} from 'react'
import './AddTask.css'

const AddTask = ({onClickOfAddTask, onClickOfClose}) => {
  const [taskName, setTaskName] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleAddTask = event => {
    if (event) event.preventDefault()
    if (taskName.trim() === '') return
    onClickOfAddTask(taskName.trim())
  }

  const onChangeTaskName = event => {
    setTaskName(event.target.value)
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleAddTask()
    }
  }

  return (
    <form onSubmit={handleAddTask} className="add-task-container">
      <textarea
        ref={inputRef}
        value={taskName}
        placeholder="Enter task..."
        onChange={onChangeTaskName}
        onKeyDown={handleKeyDown}
        className="add-task-input"
      />
      <div className="add-task-actions">
        <button type="submit" className="add-task-btn">
          Add Task
        </button>
        <button
          type="button"
          className="add-task-close-btn"
          onClick={onClickOfClose}
        >
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755864143/close_oyomr8.png"
            alt="close-icon"
            className="add-task-close-icon"
          />
        </button>
      </div>
    </form>
  )
}

export default AddTask
