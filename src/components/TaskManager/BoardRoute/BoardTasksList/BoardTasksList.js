import {useState} from 'react'
import './BoardTasksList.css'
import TaskCard from '../TaskCard/TaskCard'
import AddTask from '../AddTask/AddTask'

const BoardTasksList = props => {
  const {listId, listName, cards, onTaskAdded} = props
  const [isNewTaskEntryPopUpOpen, setIsNewTaskEntryPopUpOpen] = useState(false)

  const onClickOfAddTask = () => {
    setIsNewTaskEntryPopUpOpen(true)
  }

  const onAddTask = async taskName => {
    const apiKey = '23335c9526346209ad2255ae52d79303'
    const token = localStorage.getItem('pa_token')
    const url = `https://api.trello.com/1/cards?key=${apiKey}&token=${token}&name=${taskName}&idList=${listId}`
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({taskName}),
    })
    setIsNewTaskEntryPopUpOpen(false)
    onTaskAdded()
  }

  return (
    <div className="task-list" id={listId}>
      <div className="task-list-header">
        <p className="list-name">{listName}</p>
        <img
          src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755754020/list-menu-icon_vd1ips.png"
          alt="list-menu"
          className="list-menu-dots"
        />
      </div>
      <div className="task-list-body">
        <ul className="cards-list">
          {cards.map(task => (
            <TaskCard key={task.id} name={task.name} />
          ))}
        </ul>
      </div>

      <div className="task-list-footer">
        {isNewTaskEntryPopUpOpen ? (
          <AddTask
            onClickOfAddTask={onAddTask}
            onClickOfClose={() => {
              setIsNewTaskEntryPopUpOpen(false)
            }}
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
      </div>
    </div>
  )
}

export default BoardTasksList
