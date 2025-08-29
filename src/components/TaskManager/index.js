import {useState} from 'react'
import NavBar from './NavBar/NavBar'
import ApiStatus, {ApiKey} from './CommonComponents/Constants'
import Organizations from './Organizations/Organizations'
import OrganizationBoardsSection from './OrganizationBoardsSection/OrganizationBoardsSection'
import LoadingView from './CommonComponents/LoadingView/LoadingView'
import CreateBoardPopUp from './CreateBoardPopUp/CreateBoardPopUp'
import CreateOrganizationPopUp from './CreateOrganizationPopUp/CreateOrganizationPopUp'
import SearchTasks from './SearchTasks/SearchTasks'
import './index.css'

const TaskManager = props => {
  const [organizationData, setOrganizationData] = useState()
  const [organizationDataApiStatus, setOrganizationDataApiStatus] = useState(
    ApiStatus.initial,
  )
  const [showOrganizationsPopup, setShowOrganizationsPopup] = useState(false)
  const [showCreateBoardPopup, setShowCreateBoardPopup] = useState(false)
  const [newCreatedBoard, setNewCreatedBoard] = useState()
  const [newOrganizationItem, setNewOrganizationItem] = useState()
  const [createNewOrganizationHover, setCreateNewOrganizationHover] = useState(
    false,
  )
  const [
    showCreateNewOrganizationPopup,
    setShowCreateNewOrganizationPopup,
  ] = useState(false)
  const [isSearchTasksEnabled, setIsSearchTasksEnabled] = useState(false)
  const token = localStorage.getItem('pa_token')

  const onClickSearchIcon = isSearchEnabled => {
    setIsSearchTasksEnabled(isSearchEnabled)
  }

  const onChangeOrganization = () => {
    const {history} = props
    history.replace('/')
  }

  const onClickOfOrganizations = organizationsData => {
    setOrganizationData(organizationsData)
  }

  const getOrganizationApiStatus = organizationApiStatus => {
    setOrganizationDataApiStatus(organizationApiStatus)
  }

  const openOrganizationsPopUp = () => {
    setShowOrganizationsPopup(true)
  }

  const getActiveOrganizationId = () => localStorage.getItem('organization_id')

  const getWorkspaceName = () => {
    const activeOrganizationId = getActiveOrganizationId()
    const organization = organizationData.find(
      item => item.id === activeOrganizationId,
    )
    return organization.displayName
  }

  const onClickOfCreateNewBoard = () => {
    setShowCreateBoardPopup(true)
  }

  const onClickOfCreateBoard = async name => {
    const organizationId = getActiveOrganizationId()
    const url = `https://api.trello.com/1/boards?key=${ApiKey}&token=${token}&name=${name}&idOrganization=${organizationId}`
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({name}),
    })
    const data = await response.json()
    setShowCreateBoardPopup(false)
    setNewCreatedBoard(data)
  }

  const onClickCloseOrganization = () => {
    setShowOrganizationsPopup(false)
  }
  const onClickCloseBoardPopup = () => {
    setShowCreateBoardPopup(false)
  }

  const onCreateOrganizationApi = async organizationName => {
    const url = `https://api.trello.com/1/organizations?key=${ApiKey}&token=${token}&displayName=${organizationName}`
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({organizationName}),
    })
    const data = await response.json()
    setNewOrganizationItem(data)
    setOrganizationData(prev => [...prev, data])
    setShowCreateNewOrganizationPopup(false)
  }

  const onMouseEnterCreateOrganization = () => {
    setCreateNewOrganizationHover(true)
  }
  const onMouseLeaveCreateOrganization = () => {
    setCreateNewOrganizationHover(false)
  }

  const onClickCreateOrganization = () => {
    setShowCreateNewOrganizationPopup(true)
  }
  const onCloseOrganizationPopUp = () => {
    setShowCreateNewOrganizationPopup(false)
  }

  const getContentContainerView = () => {
    let sectionView
    switch (organizationDataApiStatus) {
      case ApiStatus.inProgress:
        sectionView = <LoadingView />
        break
      case ApiStatus.success:
        sectionView = (
          <div className="home-page-content-container">
            <div className="organization-member-details-and-create-new-organization-button">
              <div className="organization-member-details">
                <div className="organization-member-profile-bg">
                  <h2 className="organization-member-profile">
                    {getWorkspaceName()[0]}
                  </h2>
                </div>
                <h2 className="organization-member-name">
                  {getWorkspaceName()}
                </h2>
              </div>
              <button
                type="button"
                className={`create-new-organization ${
                  createNewOrganizationHover || showCreateNewOrganizationPopup
                    ? 'create-new-organization-active'
                    : ''
                }`}
                onClick={onClickCreateOrganization}
                onMouseEnter={onMouseEnterCreateOrganization}
                onMouseLeave={onMouseLeaveCreateOrganization}
              >
                <img
                  src={
                    createNewOrganizationHover || showCreateNewOrganizationPopup
                      ? 'https://res.cloudinary.com/dzki1pesn/image/upload/v1756184231/create-organization-active_z5p5jp.png'
                      : 'https://res.cloudinary.com/dzki1pesn/image/upload/v1756184243/create-organization-icon_qwuijl.png'
                  }
                  alt="create new organization"
                  className="no-mobile-view"
                />
                <p
                  className={`create-organization-text no-desktop-view ${
                    createNewOrganizationHover || showCreateNewOrganizationPopup
                      ? 'create-organization-text-active'
                      : ''
                  }`}
                >
                  Create New Organization
                </p>
              </button>
            </div>

            {organizationDataApiStatus === ApiStatus.success ? (
              <OrganizationBoardsSection
                onClickOfCreateBoard={onClickOfCreateNewBoard}
                newCreatedBoard={newCreatedBoard}
                isShowCreateBoardPopupOpen={showCreateBoardPopup}
                activeOrganizationId={getActiveOrganizationId()}
              />
            ) : (
              <></>
            )}
            <div>
              {showOrganizationsPopup && (
                <Organizations
                  workspacesOrganizations={organizationData}
                  onClose={onClickCloseOrganization}
                  onChangeOrganizationItem={onChangeOrganization}
                />
              )}
              {showCreateBoardPopup && (
                <CreateBoardPopUp
                  onCreateBoard={onClickOfCreateBoard}
                  onCreateBoardPopUpClose={onClickCloseBoardPopup}
                  organizationName={getWorkspaceName()}
                />
              )}
              {showCreateNewOrganizationPopup && (
                <CreateOrganizationPopUp
                  onCreateOrganization={onCreateOrganizationApi}
                  onCreateOrganizationPopUpClose={onCloseOrganizationPopUp}
                />
              )}
            </div>
          </div>
        )
        break
      default:
        sectionView = null
    }
    return sectionView
  }

  return (
    <div className="home-page-container">
      <NavBar
        getOrganizationsData={onClickOfOrganizations}
        getOrganizationApiStatus={getOrganizationApiStatus}
        openOrganizationsPopUp={openOrganizationsPopUp}
        showOrganizationPopup={showOrganizationsPopup}
        newCreatedOrganization={newOrganizationItem}
        onClickSearchIcon={onClickSearchIcon}
      />
      {isSearchTasksEnabled ? <SearchTasks /> : getContentContainerView()}
    </div>
  )
}

export default TaskManager
