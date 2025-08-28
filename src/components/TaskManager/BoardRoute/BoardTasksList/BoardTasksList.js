import {useState, useEffect} from 'react'
import {Droppable, Draggable} from '@hello-pangea/dnd'
import './BoardTasksList.css'
import {ApiKey} from '../../CommonComponents/Constants'
import TaskCard from '../TaskCard/TaskCard'
import AddTask from '../AddTask/AddTask'
import EditListName from './EditListName/EditListName'

const BoardTasksList = props => {
  const {
    listId,
    listName,
    cards,
    onTaskAdded,
    onListClosed,
    onTaskDeleted,
  } = props
  const [tasks, setTasks] = useState(cards)
  const [isNewTaskEntryPopUpOpen, setIsNewTaskEntryPopUpOpen] = useState(false)
  const [isEditNameFormOpen, setIsEditNameFormOpen] = useState(false)
  const [updatedListName, setUpdatedListName] = useState(listName)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const onToggleMenu = () => setIsMenuOpen(prev => !prev)

  const onCloseList = async () => {
    const token = localStorage.getItem('pa_token')
    const url = `https://api.trello.com/1/lists/${listId}/closed?key=${ApiKey}&token=${token}&value=true`
    await fetch(url, {method: 'PUT'})
    onListClosed(listId)
  }

  const onClickOfAddTask = () => {
    setIsNewTaskEntryPopUpOpen(true)
  }

  const onClickListName = () => {
    setIsEditNameFormOpen(true)
  }

  const updateListNameApi = async name => {
    const token = localStorage.getItem('pa_token')
    const url = `https://api.trello.com/1/lists/${listId}?key=${ApiKey}&token=${token}&name=${name}`
    const response = await fetch(url, {
      method: 'PUT',
    })
    const data = await response.json()
    setUpdatedListName(data.name)
    setIsEditNameFormOpen(false)
  }

  const onClickClose = () => {
    setIsNewTaskEntryPopUpOpen(false)
  }

  const onAddTask = async taskName => {
    const token = localStorage.getItem('pa_token')
    const url = `https://api.trello.com/1/cards?key=${ApiKey}&token=${token}&name=${taskName}&idList=${listId}`
    const response = await fetch(url, {
      method: 'POST',
    })
    const data = await response.json()
    setIsNewTaskEntryPopUpOpen(false)
    onTaskAdded(data)
  }

  const onDeleteTask = taskId => {
    setTasks(prev => {
      const filteredTasks = prev.filter(item => item.id !== taskId)
      return filteredTasks
    })
    onTaskDeleted(taskId, listId)
  }

  useEffect(() => {
    setTasks(cards)
  }, [cards])
  return (
    <div className="task-list" id={listId}>
      <div className="task-list-header">
        {isEditNameFormOpen ? (
          <EditListName onEditListName={updateListNameApi} />
        ) : (
          <button type="button" className="list-name" onClick={onClickListName}>
            {updatedListName}
          </button>
        )}
        <div className="list-menu-wrapper">
          <button
            type="button"
            onClick={onToggleMenu}
            className="list-menu-button"
          >
            <img
              src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755754020/list-menu-icon_vd1ips.png"
              alt="list-menu"
              className="list-menu-dots"
            />
          </button>
          {isMenuOpen && (
            <div className="list-menu-dropdown list-no-mobile-view">
              <button
                type="button"
                onClick={onCloseList}
                className="list-menu-item"
              >
                Close List
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="task-list-body">
        <Droppable droppableId={String(listId)}>
          {(droppableProvided, droppableSnapshot) => (
            <ul
              className="cards-list"
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={String(task.id)}
                  index={index}
                >
                  {(draggableProvided, draggableSnapshot) => (
                    <li
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      <TaskCard
                        name={task.name}
                        taskId={task.id}
                        onDeleteTask={onDeleteTask}
                        description={task.desc}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>

      {isNewTaskEntryPopUpOpen ? (
        <AddTask onClickOfAddTask={onAddTask} onClickOfClose={onClickClose} />
      ) : (
        <button type="button" className="add-task" onClick={onClickOfAddTask}>
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755754226/add-task-plus-icon_ftfcmq.png"
            alt="plus-icon"
            className="add-task-plus-icon"
          />
          <p className="add-task-text">Add Task</p>
        </button>
      )}
      {isMenuOpen && (
        <div className="close-list-container list-no-desktop-view">
          <button type="button" className="close-button" onClick={onToggleMenu}>
            <img
              src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755864143/close_oyomr8.png"
              alt="close-icon"
              className="close-icon"
            />
          </button>
          <button
            type="button"
            className="close-list-button"
            onClick={onCloseList}
          >
            Close List
          </button>
        </div>
      )}
    </div>
  )
}

export default BoardTasksList
