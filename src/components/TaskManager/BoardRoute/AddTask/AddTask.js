import {useState} from 'react'
import './AddTask.css'

const AddTask = ({onClickOfAddTask, onClickOfClose}) => {
  const [taskName, setTaskName] = useState('')

  const handleAddTask = () => {
    if (taskName.trim() === '') return
    onClickOfAddTask(taskName.trim())
    setTaskName('')
  }

  return (
    <div className="add-task-container">
      <textarea
        value={taskName}
        placeholder="Enter task..."
        onChange={e => setTaskName(e.target.value)}
        className="add-task-input"
      />

      <div className="add-task-actions">
        <button type="button" className="add-task-btn" onClick={handleAddTask}>
          Add Task
        </button>
        <button type="button" className="close-btn" onClick={onClickOfClose}>
          ✕
        </button>
      </div>
    </div>
  )
}

export default AddTask
