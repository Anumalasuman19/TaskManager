import {useState} from 'react'
import NavBar from '../TaskManager/NavBar/NavBar'
import Organizations from '../TaskManager/Organizations/Organizations'
import './PageNotFoundRoute.css'
import SearchTasks from '../TaskManager/SearchTasks/SearchTasks'

const PageNotFound = props => {
  const [organizationData, setOrganizationData] = useState()
  const [showPopup, setShowPopup] = useState(false)
  const [isSearchTasksEnabled, setIsSearchTasksEnabled] = useState(false)

  const onClickSearchIcon = isSearchEnabled => {
    setIsSearchTasksEnabled(isSearchEnabled)
  }

  const onClickOfOrganizations = organizationsData => {
    setOrganizationData(organizationsData)
  }

  const openOrganizationsPopUp = () => {
    setShowPopup(true)
  }

  const onChangeOrganization = () => {
    const {history} = props
    history.replace('/')
  }

  const onClickClose = () => {
    setShowPopup(false)
  }
  return (
    <div className="page-not-found">
      <NavBar
        getOrganizationsData={onClickOfOrganizations}
        openOrganizationsPopUp={openOrganizationsPopUp}
        showOrganizationPopup={showPopup}
        onClickSearchIcon={onClickSearchIcon}
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
          workspacesOrganizations={organizationData}
          onClose={onClickClose}
          onChangeOrganizationItem={onChangeOrganization}
        />
      )}
    </div>
  )
}

export default PageNotFound
