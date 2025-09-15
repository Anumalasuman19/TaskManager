import {useState} from 'react'
import {
  ApiKey,
  GetToken,
  BoardRouteActivePopup,
} from '../../CommonComponents/Constants'
import UpdateTaskDetailsPopUp from './UpdateTaskDetailsPopUp/UpdateTaskDetailsPopUp'
import useApi from '../../CommonComponents/UseApi/UseApi'
import './TaskCard.css'

const TaskCard = ({
  name,
  taskId,
  description,
  onDeleteTask,
  isDeleteRequired = true,
  setActivePopup,
  activePopup,
}) => {
  const [taskName, setTaskName] = useState(name)
  const [taskDescription, setTaskDescription] = useState(description)

  const [isLocalPopupOpen, setIsLocalPopupOpen] = useState(false)

  const {refetch: updateTaskApi} = useApi(null, {method: 'PUT'}, false)
  const {refetch: deleteTaskApi} = useApi(null, {method: 'DELETE'}, false)

  const isPopupOpen = setActivePopup
    ? activePopup === `${BoardRouteActivePopup.taskDetailsPopup}-${taskId}`
    : isLocalPopupOpen

  const handleCardClick = () => {
    if (setActivePopup) {
      setActivePopup(`${BoardRouteActivePopup.taskDetailsPopup}-${taskId}`)
    } else {
      setIsLocalPopupOpen(true)
    }
  }

  const handleClosePopup = () => {
    if (setActivePopup) {
      setActivePopup(null)
    } else {
      setIsLocalPopupOpen(false)
    }
  }

  const handleUpdateTask = async (updatedName, updatedDesc) => {
    try {
      const url = `https://api.trello.com/1/cards/${taskId}?key=${ApiKey}&token=${GetToken()}&name=${updatedName}&desc=${updatedDesc}`
      const data = await updateTaskApi({url})
      setTaskName(data.name)
      setTaskDescription(data.desc)
    } catch (err) {
      console.error('Error updating task:', err)
    }
  }

  const handleDeleteTask = async () => {
    try {
      const url = `https://api.trello.com/1/cards/${taskId}?key=${ApiKey}&token=${GetToken()}`
      await deleteTaskApi({url})
      onDeleteTask?.(taskId)
      handleClosePopup()
    } catch (err) {
      console.error('Error deleting task:', err)
    }
  }

  return (
    <div className="task-card-container">
      <div
        role="button"
        tabIndex={0}
        className="task-card"
        onClick={handleCardClick}
      >
        {taskName}
      </div>

      {isPopupOpen && (
        <UpdateTaskDetailsPopUp
          onDelete={handleDeleteTask}
          isDeleteRequired={isDeleteRequired}
          onUpdateTask={handleUpdateTask}
          onClosePopup={handleClosePopup}
          taskName={taskName}
          description={taskDescription}
          taskId={taskId}
        />
      )}
    </div>
  )
}

export default TaskCard
