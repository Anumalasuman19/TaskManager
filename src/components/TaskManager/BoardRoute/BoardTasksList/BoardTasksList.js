import {useState} from 'react'
import {Droppable, Draggable} from '@hello-pangea/dnd'
import './BoardTasksList.css'
import {
  ApiKey,
  GetToken,
  CardType,
  BoardRouteActivePopup,
} from '../../CommonComponents/Constants'
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
    activePopup,
    setActivePopup,
  } = props

  const [updatedListName, setUpdatedListName] = useState(listName)

  const isAddTaskOpen =
    activePopup === `${BoardRouteActivePopup.addTaskPopup}-${listId}`
  const isEditListOpen =
    activePopup === `${BoardRouteActivePopup.editListPopup}-${listId}`
  const isMenuOpen =
    activePopup === `${BoardRouteActivePopup.closeListPopup}-${listId}`

  const onClickOfAddTask = () =>
    setActivePopup(`${BoardRouteActivePopup.addTaskPopup}-${listId}`)
  const onClickListName = () =>
    setActivePopup(`${BoardRouteActivePopup.editListPopup}-${listId}`)
  const onToggleMenu = () =>
    setActivePopup(
      activePopup === `${BoardRouteActivePopup.closeListPopup}-${listId}`
        ? null
        : `${BoardRouteActivePopup.closeListPopup}-${listId}`,
    )

  const onCloseList = async () => {
    const url = `https://api.trello.com/1/lists/${listId}/closed?key=${ApiKey}&token=${GetToken()}&value=true`
    await fetch(url, {method: 'PUT'})
    onListClosed(listId)
    setActivePopup(null)
  }

  const updateListNameApi = async name => {
    const url = `https://api.trello.com/1/lists/${listId}?key=${ApiKey}&token=${GetToken()}&name=${name}`
    const response = await fetch(url, {method: 'PUT'})
    const data = await response.json()
    setUpdatedListName(data.name)
    setActivePopup(null)
  }
  const onClickCloseAddTaskPopUp = () => setActivePopup(null)

  const onAddTask = async taskName => {
    const url = `https://api.trello.com/1/cards?key=${ApiKey}&token=${GetToken()}&name=${taskName}&idList=${listId}`
    const response = await fetch(url, {method: 'POST'})
    const data = await response.json()
    setActivePopup(null)
    onTaskAdded(data)
  }

  const getTaskItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? '#CBD5E1' : '#FFFFFF',
    borderRadius: '4px',
    ...draggableStyle,
  })

  const onDeleteTask = taskId => {
    onTaskDeleted(taskId)
  }

  return (
    <div className="task-list">
      <div className="task-list-header">
        {isEditListOpen ? (
          <EditListName
            onEditListName={updateListNameApi}
            previousListName={listName}
          />
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
      <Droppable droppableId={String(listId)} type={CardType}>
        {(droppableProvided, droppableSnapshot) => (
          <ul
            className="cards-list"
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {cards.length === 0 ? (
              <li className="empty-task" />
            ) : (
              cards.map((task, index) => (
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
                      style={getTaskItemStyle(
                        draggableSnapshot.isDragging,
                        draggableProvided.draggableProps.style,
                      )}
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
              ))
            )}
            {droppableProvided.placeholder}
          </ul>
        )}
      </Droppable>

      {isAddTaskOpen ? (
        <AddTask
          onClickOfAddTask={onAddTask}
          onClickOfClose={onClickCloseAddTaskPopUp}
        />
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
