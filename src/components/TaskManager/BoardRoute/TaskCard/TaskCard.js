import {useState} from 'react'
import {ApiKey, TokenKey} from '../../CommonComponents/Constants'
import UpdateTaskDetailsPopUp from './UpdateTaskDetailsPopUp/UpdateTaskDetailsPopUp'
import './TaskCard.css'

const TaskCard = ({name, taskId, onDeleteTask, description}) => {
  const [taskName, setTaskName] = useState(name)
  const [taskDescription, setDescription] = useState(description)
  const [
    isTaskAdditionalDetailsOpen,
    setIsTaskAdditionalDetailsOpen,
  ] = useState()
  const token = localStorage.getItem(TokenKey)

  const onUpdateTaskApi = async (updatedTaskName, updatedDescription) => {
    const url = `https://api.trello.com/1/cards/${taskId}?key=${ApiKey}&token=${token}&name=${updatedTaskName}&desc=${updatedDescription}`
    const response = await fetch(url, {
      method: 'PUT',
    })
    const data = await response.json()
    setTaskName(data.name)
    setDescription(data.desc)
    setIsTaskAdditionalDetailsOpen(false)
  }

  const onDeleteTaskApi = async () => {
    const url = `https://api.trello.com/1/cards/${taskId}?key=${ApiKey}&token=${token}`
    const response = await fetch(url, {
      method: 'DELETE',
    })
    setIsTaskAdditionalDetailsOpen(false)
    onDeleteTask(taskId)
  }

  const onClickTask = () => {
    setIsTaskAdditionalDetailsOpen(true)
  }

  const onCloseAdditionalDetailsPopUp = () => {
    setIsTaskAdditionalDetailsOpen(false)
  }

  return (
    <div className="task-card-container">
      <div
        role="button"
        tabIndex={0}
        className="task-card"
        onClick={onClickTask}
      >
        {taskName}
      </div>
      {isTaskAdditionalDetailsOpen && (
        <UpdateTaskDetailsPopUp
          onDelete={onDeleteTaskApi}
          onUpdateTask={onUpdateTaskApi}
          onClosePopup={onCloseAdditionalDetailsPopUp}
          taskName={taskName}
          description={taskDescription}
          taskId={taskId}
        />
      )}
    </div>
  )
}

export default TaskCard
