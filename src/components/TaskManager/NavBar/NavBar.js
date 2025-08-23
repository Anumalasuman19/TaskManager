import {useEffect, useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import ApiStatus from '../CommonComponents/Constants'
import Organizations from '../Organizations/Organizations'
import './NavBar.css'

const NavBar = props => {
  const {
    getOrganizationApiStatus = () => {},
    getOrganizationsData,
    showOrganizationPopup,
    openOrganizationsPopUp,
  } = props
  const [isOrganizationInitialApi, setIsOrganizationInitialApi] = useState(true)
  const [organizationData, setOrganizationData] = useState()
  const [organizationDataApiStatus, setOrganizationDataApiStatus] = useState(
    ApiStatus.initial,
  )
  const [showDropdown, setShowDropdown] = useState(false)
  const [userData, setUserData] = useState()
  const [userDataApiStatus, setUserDataApiStatus] = useState(ApiStatus.initial)
  const onClickOfLogout = () => {
    localStorage.removeItem('pa_token')
    const {history} = props
    history.replace('/login')
  }

  const onChangeOrganization = () => {
    const {history} = props
    history.replace('/')
  }

  const getUserData = async () => {
    setUserDataApiStatus(ApiStatus.inProgress)
    const apiKey = '23335c9526346209ad2255ae52d79303'
    const token = localStorage.getItem('pa_token')
    const url = `https://api.trello.com/1/members/me?key=${apiKey}&token=${token}`
    const options = {method: 'GET'}
    const apiResponse = await fetch(url, options)
    const jsonResponse = await apiResponse.json()

    if (apiResponse.ok) {
      setUserData(jsonResponse)
      setUserDataApiStatus(ApiStatus.success)
    }
  }

  const OrganizationsDataApi = async () => {
    getOrganizationApiStatus(ApiStatus.inProgress)
    setOrganizationDataApiStatus(ApiStatus.inProgress)
    const apiKey = '23335c9526346209ad2255ae52d79303'
    const token = localStorage.getItem('pa_token')
    const url = `https://api.trello.com/1/members/me/organizations?key=${apiKey}&token=${token}`
    const options = {method: 'GET'}
    const apiResponse = await fetch(url, options)
    const jsonResponse = await apiResponse.json()

    if (apiResponse.ok) {
      getOrganizationsData(jsonResponse)
      if (isOrganizationInitialApi) {
        const firstOrgId = jsonResponse[0].id
        localStorage.setItem('organization_id', firstOrgId)
        setIsOrganizationInitialApi(false)
      }
      setOrganizationData(jsonResponse)
      getOrganizationApiStatus(ApiStatus.success)
      setOrganizationDataApiStatus(ApiStatus.success)
    }
    return null
  }

  const onClickOfOrganizations = () => {
    openOrganizationsPopUp()
  }

  useEffect(() => {
    getUserData()
    OrganizationsDataApi()
  }, [])

  return (
    <div className="nav-bar-container">
      <div className="nav-buttons-container">
        <Link to="/" className="home-link">
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755604035/home-icon_hbraab.png"
            alt="home-icon"
            className="home-icon"
          />
        </Link>
        <button
          type="button"
          className="organization-button no-desktop-view-display"
          onClick={onClickOfOrganizations}
        >
          <img
            src={
              showOrganizationPopup
                ? 'https://res.cloudinary.com/dzki1pesn/image/upload/v1755668429/organization-button-active_nfhgcz.png'
                : 'https://res.cloudinary.com/dzki1pesn/image/upload/v1755604202/organization-icon_eaikik.png'
            }
            alt="organization-icon"
          />
        </button>
        <div className="org-dropdown-wrapper no-mobile-view-display">
          <button
            type="button"
            className="org-dropdown-btn"
            onClick={() => setShowDropdown(prev => !prev)}
          >
            <p className="organization-text">Organization</p>
            <img
              src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755847267/Icon_t1jdk1.png"
              alt="dropdown-icon"
              className="dropdown-icon"
            />
          </button>

          {showDropdown && (
            <div className="organization-dropdown">
              <Organizations
                workspacesOrganizations={organizationData}
                onClose={() => {
                  setShowDropdown(false)
                }}
                onChangeOrganizationItem={onChangeOrganization}
              />
            </div>
          )}
        </div>
        <button type="button" className="board-btn no-mobile-view-display">
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755866782/board-logo_uozurg.png"
            alt="dropdown-icon"
            className="dropdown-icon"
          />
          <p className="board-text">Boards</p>
        </button>

        <Link to="/">
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755604213/board-icon_t6qjy4.png"
            alt="board-icon"
            className="no-desktop-view-display"
          />
        </Link>
        <img
          src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755604225/search-icon_tvkupn.png"
          alt="search-icon"
          className="search-icon no-desktop-view-display"
        />
      </div>
      <img
        src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755604235/task-manager-text-icon_xlcvhz.png"
        alt="task-manager-logo"
        className="trello-logo-title-icon"
      />
      <div className="logout-button-and-profile-and-search-input">
        <div className="search-box no-mobile-view-display">
          <input type="text" placeholder="Search" className="search-input" />
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755854561/search_p1o08q.png"
            className="search-icon"
            alt="search-icon"
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
          <p className="profile-text">
            {userDataApiStatus === ApiStatus.success ? userData.initials : ''}
          </p>
        </div>
      </div>
    </div>
  )
}

export default withRouter(NavBar)
