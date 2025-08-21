import {useState, useEffect} from 'react'
import './BoardTasksList.css'
import TaskCard from '../TaskCard/TaskCard'
import ApiStatus from '../../CommonComponents/Constants'

const BoardTasksList = props => {
  const {listId, listName} = props

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

      <div className="task-list-footer">
        <button type="button" className="add-task">
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755754226/add-task-plus-icon_ftfcmq.png"
            alt="plus-icon"
            className="add-task-plus-icon"
          />
          <p className="add-task-text">Add Task</p>
        </button>
      </div>
    </div>
  )
}

export default BoardTasksList
