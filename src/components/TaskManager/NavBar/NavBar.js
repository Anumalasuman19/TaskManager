import {withRouter} from 'react-router-dom'
import useTaskManager from '../CommonComponents/UseTaskManager/UseTaskManager'
import {TokenKey} from '../CommonComponents/Constants'
import SearchTasks from '../SearchTasks/SearchTasks'
import NavButtons from './NavButtons/NavButtons'
import './NavBar.css'

const NavBar = props => {
  const {
    showOrganizationPopup,
    openOrganizationsPopUp,
    activePopup,
    setActivePopup,
    history,
  } = props

  const {userData} = useTaskManager()

  const onClickOfLogout = () => {
    localStorage.removeItem(TokenKey)
    history.replace('/login')
  }

  const onClickBoards = () => {
    history.replace('/')
    setActivePopup(null)
  }

  const onChangeOrganization = () => {
    history.replace('/')
  }

  return (
    <div className="nav-bar-container">
      {/* Moved NavButtons here */}
      <NavButtons
        showOrganizationPopup={showOrganizationPopup}
        openOrganizationsPopUp={openOrganizationsPopUp}
        activePopup={activePopup}
        setActivePopup={setActivePopup}
        onClickBoards={onClickBoards}
        onChangeOrganization={onChangeOrganization}
      />
      <img
        src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755604235/task-manager-text-icon_xlcvhz.png"
        alt="task-manager-logo"
        className="trello-logo-title-icon"
      />
      <div className="logout-button-and-profile-and-search-input">
        <div className="search-box no-mobile-view-display">
          <SearchTasks
            setActivePopup={setActivePopup}
            activePopup={activePopup}
          />
        </div>
        <button
          type="button"
          className="logout-button"
          onClick={onClickOfLogout}
        >
          Log Out
        </button>
        <div className="profile-bg">
          <p className="profile-text">{userData.initials}</p>
        </div>
      </div>
    </div>
  )
}

export default withRouter(NavBar)
