import {Component} from 'react'
import NavBar from './NavBar/NavBar'
import './index.css'

class TaskManager extends Component {
  render() {
    return (
      <div className="home-page-container">
        <NavBar />
        <div className="home-page-content-container">
          <div className="organization-member-details">
            <div className="organization-member-profile-bg">
              <p className="organization-member-profile">W</p>
            </div>
            <h2 className="organization-member-name">
              Williams John's workspace
            </h2>
          </div>
          <div className="sub-heading-container">
            <img src="" alt="person-outline" className="person-icon" />
            <h2 className="sub-heading">You don&apos;t have any workspace</h2>
          </div>
          <button type="button" className="create-new-board-button">
            <img src="" alt="plus-icon" className="plus-icon" />
            <p className="create-new-board-text">Create new board</p>
          </button>
        </div>
      </div>
    )
  }
}

export default TaskManager
