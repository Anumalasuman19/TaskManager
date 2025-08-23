import {useState} from 'react'
import NavBar from './NavBar/NavBar'
import ApiStatus from './CommonComponents/Constants'
import Organizations from './Organizations/Organizations'
import OrganizationBoardsSection from './OrganizationBoardsSection/OrganizationBoardsSection'
import LoadingView from './CommonComponents/LoadingView/LoadingView'
import CreateBoardPopUp from './CreateBoardPopUp/CreateBoardPopUp'
import './index.css'

const TaskManager = props => {
  const [organizationData, setOrganizationData] = useState()
  const [organizationDataApiStatus, setOrganizationDataApiStatus] = useState(
    ApiStatus.initial,
  )
  const [showOrganizationsPopup, setShowOrganizationsPopup] = useState(false)
  const [showCreateBoardPopup, setShowCreateBoardPopup] = useState(false)
  const [noOfTimesBoardsAdded, setNoOfTimesBoardsAdded] = useState(0)

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

  const getWorkspaceName = () => {
    const activeOrganizationId = localStorage.getItem('organization_id')
    const organization = organizationData.find(
      item => item.id === activeOrganizationId,
    )
    return organization.displayName
  }

  const onClickOfCreateNewBoard = () => {
    setShowCreateBoardPopup(true)
  }

  const onClickOfCreateBoard = async name => {
    const apiKey = '23335c9526346209ad2255ae52d79303'
    const token = localStorage.getItem('pa_token')
    const url = `https://api.trello.com/1/boards?key=${apiKey}&token=${token}&name=${name}`
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({name}),
    })
    const data = await response.json()
    setShowCreateBoardPopup(false)
    setNoOfTimesBoardsAdded(prevState => prevState + 1)
    return null
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
            <div className="organization-member-details">
              <div className="organization-member-profile-bg">
                <h2 className="organization-member-profile">
                  {getWorkspaceName()[0]}
                </h2>
              </div>
              <h2 className="organization-member-name">{getWorkspaceName()}</h2>
            </div>
            {organizationDataApiStatus === ApiStatus.success ? (
              <OrganizationBoardsSection
                onClickOfCreateBoard={onClickOfCreateNewBoard}
                noOfTimesAdded={noOfTimesBoardsAdded}
                isShowCreateBoardPopupOpen={showCreateBoardPopup}
              />
            ) : (
              <></>
            )}
            <div>
              {showOrganizationsPopup && (
                <Organizations
                  workspacesOrganizations={organizationData}
                  onClose={() => setShowOrganizationsPopup(false)}
                  onChangeOrganizationItem={onChangeOrganization}
                />
              )}
              {showCreateBoardPopup && (
                <CreateBoardPopUp
                  onCreateBoard={onClickOfCreateBoard}
                  onCreateBoardPopUpClose={() => setShowCreateBoardPopup(false)}
                  organizationName={getWorkspaceName()}
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
      />
      {getContentContainerView()}
    </div>
  )
}

export default TaskManager
