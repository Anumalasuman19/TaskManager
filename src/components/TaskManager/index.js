import {useState, useEffect} from 'react'
import NavBar from './NavBar/NavBar'
import ApiStatus from './CommonComponents/Constants'
import Organizations from './Organizations/Organizations'
import OrganizationBoardsSection from './OrganizationBoardsSection/OrganizationBoardsSection'
import LoadingView from './CommonComponents/LoadingView/LoadingView'
import CreateBoardPopUp from './CommonComponents/CreateBoardPopUp/CreateBoardPopUp'
import './index.css'

const TaskManager = () => {
  const [organizationData, setOrganizationData] = useState()
  const [organizationDataApiStatus, setOrganizationDataApiStatus] = useState(
    ApiStatus.initial,
  )
  const [activeOrganizationId, setActiveOrganizationId] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [showCreateBoardPopup, setShowCreateBoardPopup] = useState(false)
  const [noOfTimesBoardsAdded, setNoOfTimesBoardsAdded] = useState(0)

  const getOrganizationData = async () => {
    setOrganizationDataApiStatus(ApiStatus.inProgress)
    const apiKey = '23335c9526346209ad2255ae52d79303'
    const token = localStorage.getItem('pa_token')
    const url = `https://api.trello.com/1/members/me/organizations?key=${apiKey}&token=${token}`
    const options = {
      method: 'GET',
    }
    const apiResponse = await fetch(url, options)
    const jsonResponse = await apiResponse.json()
    if (apiResponse.ok) {
      setOrganizationData(jsonResponse)
      setActiveOrganizationId(jsonResponse[0].id)
      setOrganizationDataApiStatus(ApiStatus.success)
      console.log(jsonResponse)
    }
  }
  const onClickOfOrganizations = () => {
    setShowPopup(true)
  }
  const getWorkspaceName = () => {
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
      body: JSON.stringify({name}), // send board name
    })

    const data = await response.json()
    console.log('✅ API Response:', data)
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
                organizationId={activeOrganizationId}
                onClickOfCreateBoard={onClickOfCreateNewBoard}
                noOfTimesAdded={noOfTimesBoardsAdded}
              />
            ) : (
              <></>
            )}
            <div>
              {showPopup && (
                <Organizations
                  workspacesOrganizations={organizationData}
                  onClose={() => setShowPopup(false)}
                  activeOrganizationId={activeOrganizationId}
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
  useEffect(() => {
    getOrganizationData()
  }, [])

  return (
    <div className="home-page-container">
      <NavBar
        onClickOfOrganizations={onClickOfOrganizations}
        showOrganizationPopup={showPopup}
      />
      {getContentContainerView()}
    </div>
  )
}

export default TaskManager
