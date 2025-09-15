import {useState} from 'react'
import NavBar from './NavBar/NavBar'
import {NavBarActivePopup} from './CommonComponents/Constants'
import SearchTasks from './SearchTasks/SearchTasks'
import HomePageContent from './HomePageContent/HomePageContent'
import './index.css'

const TaskManager = props => {
  const [activePopup, setActivePopup] = useState(null)

  const showOrganizationsPopup =
    activePopup === NavBarActivePopup.mobileViewOrganizationPopup
  const isSearchTasksEnabled =
    activePopup === NavBarActivePopup.mobileViewSearchSection

  const onChangeOrganization = () => {
    const {history} = props
    history.replace('/')
  }

  const openOrganizationsPopUp = () => {
    setActivePopup(NavBarActivePopup.mobileViewOrganizationPopup)
  }

  return (
    <div className="home-page-container">
      <NavBar
        openOrganizationsPopUp={openOrganizationsPopUp}
        showOrganizationPopup={showOrganizationsPopup}
        activePopup={activePopup}
        setActivePopup={setActivePopup}
      />

      {isSearchTasksEnabled ? (
        <SearchTasks />
      ) : (
        <HomePageContent
          activePopup={activePopup}
          setActivePopup={setActivePopup}
          onChangeOrganization={onChangeOrganization}
        />
      )}
    </div>
  )
}

export default TaskManager
