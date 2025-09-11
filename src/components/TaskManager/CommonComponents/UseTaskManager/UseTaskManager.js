import {useContext} from 'react'
import {TaskManagerContext} from '../../../TaskManagerContext/TaskManagerContext'

const useTaskManager = () => {
  const context = useContext(TaskManagerContext)

  if (!context) {
    throw new Error('useTaskManager must be used within a TaskManagerProvider')
  }

  return context
}

export default useTaskManager
