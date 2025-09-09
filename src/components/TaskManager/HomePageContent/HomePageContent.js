import {useState, useContext} from 'react'
import {TaskManagerContext} from '../../TaskManagerContext/TaskManagerContext'
import OrganizationBoardsSection from '../OrganizationBoardsSection/OrganizationBoardsSection'
import Organizations from '../Organizations/Organizations'
import CreateBoardPopUp from '../CreateBoardPopUp/CreateBoardPopUp'
import CreateOrganizationPopUp from '../CreateOrganizationPopUp/CreateOrganizationPopUp'
import LoadingView from '../CommonComponents/LoadingView/LoadingView'
import ApiStatus, {
  ApiKey,
  GetToken,
  HomeRouteActivePopup,
  NavBarActivePopup,
} from '../CommonComponents/Constants'
import './HomePageContent.css'

const HomePageContent = ({
  activePopup,
  setActivePopup,
  onChangeOrganization,
  setNewOrganizationItem,
}) => {
  const {
    activeOrganizationId,
    organizationData,
    organizationDataApiStatus,
    setOrganizationData,
  } = useContext(TaskManagerContext)
  const [newCreatedBoard, setNewCreatedBoard] = useState()
  const [createNewOrganizationHover, setCreateNewOrganizationHover] = useState(
    false,
  )
  const showOrganizationsPopup =
    activePopup === NavBarActivePopup.mobileViewOrganizationPopup
  const showCreateBoardPopup =
    activePopup === HomeRouteActivePopup.createBoardPopup
  const showCreateNewOrganizationPopup =
    activePopup === HomeRouteActivePopup.createNewOrganizationPopup

  const getWorkspaceName = () => {
    const organization = organizationData.find(
      item => item.id === activeOrganizationId,
    )
    return organization.displayName
  }

  const onClickOfCreateNewBoard = () => {
    setActivePopup(HomeRouteActivePopup.createBoardPopup)
  }

  const onClickOfCreateBoard = async name => {
    const organizationId = activeOrganizationId
    const url = `https://api.trello.com/1/boards?key=${ApiKey}&token=${GetToken()}&name=${name}&idOrganization=${organizationId}`
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({name}),
    })
    const data = await response.json()
    setActivePopup(null)
    setNewCreatedBoard(data)
  }

  const onClickCloseOrganization = () => setActivePopup(null)

  const onClickCloseBoardPopup = () => setActivePopup(null)

  const onCloseOrganizationPopUp = () => setActivePopup(null)

  const onMouseEnterCreateOrganization = () => {
    setCreateNewOrganizationHover(true)
  }
  const onMouseLeaveCreateOrganization = () => {
    setCreateNewOrganizationHover(false)
  }

  const onCreateOrganizationApi = async organizationName => {
    const url = `https://api.trello.com/1/organizations?key=${ApiKey}&token=${GetToken()}&displayName=${organizationName}`
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({organizationName}),
    })
    const data = await response.json()
    setNewOrganizationItem(data)
    setOrganizationData(prev => [...prev, data])
    setActivePopup(null)
  }

  const onClickCreateOrganization = () => {
    setActivePopup(HomeRouteActivePopup.createNewOrganizationPopup)
  }

  return (
    <>
      {organizationDataApiStatus === ApiStatus.inProgress && <LoadingView />}

      {organizationDataApiStatus === ApiStatus.success && (
        <div className="home-page-content-container">
          {/* Workspace header */}
          <div className="organization-member-details-and-create-new-organization-button">
            <div className="organization-member-details">
              <div className="organization-member-profile-bg">
                <h2 className="organization-member-profile">
                  {getWorkspaceName()[0]}
                </h2>
              </div>
              <h2 className="organization-member-name">{getWorkspaceName()}</h2>
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

          {/* Boards */}
          <OrganizationBoardsSection
            onClickOfCreateBoard={onClickOfCreateNewBoard}
            newCreatedBoard={newCreatedBoard}
            isShowCreateBoardPopupOpen={showCreateBoardPopup}
          />

          {/* Popups */}
          <div>
            {showOrganizationsPopup && (
              <Organizations
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
      )}
    </>
  )
}

export default HomePageContent
