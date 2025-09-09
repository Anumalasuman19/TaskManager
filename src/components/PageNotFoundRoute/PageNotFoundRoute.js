import {useState} from 'react'
import NavBar from '../TaskManager/NavBar/NavBar'
import Organizations from '../TaskManager/Organizations/Organizations'
import './PageNotFoundRoute.css'
import {NavBarActivePopup} from '../TaskManager/CommonComponents/Constants'
import SearchTasks from '../TaskManager/SearchTasks/SearchTasks'

const PageNotFound = props => {
  const [activePopup, setActivePopup] = useState(null)
  const showPopup =
    activePopup === NavBarActivePopup.mobileViewOrganizationPopup
  const isSearchTasksEnabled =
    activePopup === NavBarActivePopup.mobileViewSearchSection

  const onClickSearchIcon = isSearchEnabled => {
    if (isSearchEnabled) {
      setActivePopup(NavBarActivePopup.mobileViewSearchSection)
    } else {
      setActivePopup(null)
    }
  }

  const openOrganizationsPopUp = () => {
    setActivePopup(NavBarActivePopup.mobileViewOrganizationPopup)
  }

  const onChangeOrganization = () => {
    const {history} = props
    history.replace('/')
  }

  const onClickCloseOrganization = () => {
    setActivePopup(null)
  }
  return (
    <div className="page-not-found">
      <NavBar
        openOrganizationsPopUp={openOrganizationsPopUp}
        showOrganizationPopup={showPopup}
        onClickSearchIcon={onClickSearchIcon}
        activePopup={activePopup}
        setActivePopup={setActivePopup}
      />
      <div className="page-not-found-container">
        {isSearchTasksEnabled ? (
          <div className="search-tasks-container">
            <SearchTasks />
          </div>
        ) : (
          <>
            <h1 className="page-not-found-title">Page Not Found</h1>
            <p className="page-not-found-text">
              This page may be private. If someone gave you this link, they may
              need to invite you to one of their boards or teams.
            </p>
          </>
        )}
      </div>

      {showPopup && (
        <Organizations
          onClose={onClickCloseOrganization}
          onChangeOrganizationItem={onChangeOrganization}
        />
      )}
    </div>
  )
}

export default PageNotFound
