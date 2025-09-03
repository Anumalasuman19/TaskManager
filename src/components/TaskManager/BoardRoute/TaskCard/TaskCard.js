import {useState} from 'react'
import {ApiKey, GetToken} from '../../CommonComponents/Constants'
import UpdateTaskDetailsPopUp from './UpdateTaskDetailsPopUp/UpdateTaskDetailsPopUp'
import './TaskCard.css'

const TaskCard = ({
  name,
  taskId,
  onDeleteTask,
  description,
  isDeleteRequired = true,
}) => {
  const [taskName, setTaskName] = useState(name)
  const [taskDescription, setDescription] = useState(description)
  const [
    isTaskAdditionalDetailsOpen,
    setIsTaskAdditionalDetailsOpen,
  ] = useState()

  const onUpdateTaskApi = async (updatedTaskName, updatedDescription) => {
    const url = `https://api.trello.com/1/cards/${taskId}?key=${ApiKey}&token=${GetToken()}&name=${updatedTaskName}&desc=${updatedDescription}`
    const response = await fetch(url, {
      method: 'PUT',
    })
    const data = await response.json()
    setTaskName(data.name)
    setDescription(data.desc)
  }

  const onDeleteTaskApi = async () => {
    const url = `https://api.trello.com/1/cards/${taskId}?key=${ApiKey}&token=${GetToken()}`
    const response = await fetch(url, {
      method: 'DELETE',
    })
    setIsTaskAdditionalDetailsOpen(false)
    onDeleteTask(taskId)
  }

  const onClickTask = () => {
    setIsTaskAdditionalDetailsOpen(true)
    console.log('Task clicked')
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
          isDeleteRequired={isDeleteRequired}
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
