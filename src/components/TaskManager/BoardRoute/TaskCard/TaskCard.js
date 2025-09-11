import {useState} from 'react'
import {ApiKey, GetToken} from '../../CommonComponents/Constants'
import UpdateTaskDetailsPopUp from './UpdateTaskDetailsPopUp/UpdateTaskDetailsPopUp'
import useApi from '../../CommonComponents/UseApi/UseApi'
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
  ] = useState(false)

  const {refetch: updateTaskApi} = useApi(null, {method: 'PUT'}, false)
  const {refetch: deleteTaskApi} = useApi(null, {method: 'DELETE'}, false)

  const onUpdateTaskApi = async (updatedTaskName, updatedDescription) => {
    try {
      const url = `https://api.trello.com/1/cards/${taskId}?key=${ApiKey}&token=${GetToken()}&name=${updatedTaskName}&desc=${updatedDescription}`
      const data = await updateTaskApi({url})
      setTaskName(data.name)
      setDescription(data.desc)
    } catch (err) {
      console.error('Error updating task:', err)
    }
  }

  const onDeleteTaskApi = async () => {
    try {
      const url = `https://api.trello.com/1/cards/${taskId}?key=${ApiKey}&token=${GetToken()}`
      await deleteTaskApi({url})
      setIsTaskAdditionalDetailsOpen(false)
      onDeleteTask(taskId)
    } catch (err) {
      console.error('Error deleting task:', err)
    }
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
