import {useState} from 'react'
import './AddTask.css'

const AddTask = ({onClickOfAddTask, onClickOfClose}) => {
  const [taskName, setTaskName] = useState('')

  const handleAddTask = event => {
    if (event) event.preventDefault()
    if (taskName.trim() === '') return
    onClickOfAddTask(taskName.trim())
    setTaskName('')
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
        <button type="button" className="close-btn" onClick={onClickOfClose}>
          ✕
        </button>
      </div>
    </form>
  )
}

export default AddTask
