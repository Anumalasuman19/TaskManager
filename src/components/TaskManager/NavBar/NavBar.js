import {useEffect, useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import ApiStatus, {
  ApiKey,
  ActiveOrganizationKey,
  UserInitialsKey,
  TokenKey,
} from '../CommonComponents/Constants'
import Organizations from '../Organizations/Organizations'
import './NavBar.css'
import SearchTasks from '../SearchTasks/SearchTasks'

const NavBar = props => {
  const {
    getOrganizationApiStatus = () => {},
    getOrganizationsData,
    showOrganizationPopup,
    openOrganizationsPopUp,
    newCreatedOrganization,
    onClickSearchIcon,
  } = props
  const [organizationData, setOrganizationData] = useState()
  const [organizationDataApiStatus, setOrganizationDataApiStatus] = useState(
    ApiStatus.initial,
  )
  const [showDropdown, setShowDropdown] = useState(false)
  const [userData, setUserData] = useState()
  const [userDataApiStatus, setUserDataApiStatus] = useState(ApiStatus.initial)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const {history} = props
  const token = localStorage.getItem(TokenKey)

  const onClickOfLogout = () => {
    localStorage.removeItem(TokenKey)
    history.replace('/login')
  }

  const onClickSearch = () => {
    setIsSearchOpen(prev => !prev)
  }

  const onChangeOrganization = () => {
    history.replace('/')
  }

  const getUserData = async () => {
    setUserDataApiStatus(ApiStatus.inProgress)
    const url = `https://api.trello.com/1/members/me?key=${ApiKey}&token=${token}`
    const options = {method: 'GET'}
    const apiResponse = await fetch(url, options)
    const jsonResponse = await apiResponse.json()

    if (apiResponse.ok) {
      setUserData(jsonResponse)
      localStorage.setItem(UserInitialsKey, jsonResponse.initials)
      setUserDataApiStatus(ApiStatus.success)
    }
  }

  const organizationsDataApi = async () => {
    getOrganizationApiStatus(ApiStatus.inProgress)
    setOrganizationDataApiStatus(ApiStatus.inProgress)
    const url = `https://api.trello.com/1/members/me/organizations?key=${ApiKey}&token=${token}`
    const options = {method: 'GET'}
    const apiResponse = await fetch(url, options)
    const jsonResponse = await apiResponse.json()
    if (apiResponse.ok) {
      getOrganizationsData(jsonResponse)
      const activeOrganizationId = localStorage.getItem(ActiveOrganizationKey)
      if (activeOrganizationId === null) {
        const firstOrgId = jsonResponse[0].id
        localStorage.setItem(ActiveOrganizationKey, firstOrgId)
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

  const setOrganizationPopup = () => {
    setShowDropdown(prev => !prev)
  }

  const onClickClose = () => {
    setShowDropdown(false)
  }

  const onClickBoards = () => {
    history.replace('/')
  }

  useEffect(() => {
    getUserData()
    organizationsDataApi()
  }, [])

  useEffect(() => {
    if (newCreatedOrganization) {
      setOrganizationData(prev => [...prev, newCreatedOrganization])
    }
  }, [newCreatedOrganization])

  useEffect(() => {
    onClickSearchIcon(isSearchOpen)
  }, [isSearchOpen])

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
            onClick={setOrganizationPopup}
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
                onClose={onClickClose}
                onChangeOrganizationItem={onChangeOrganization}
              />
            </div>
          )}
        </div>
        <button
          type="button"
          className="board-btn no-mobile-view-display"
          onClick={onClickBoards}
        >
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755866782/board-logo_uozurg.png"
            alt="dropdown-icon"
            className="dropdown-icon"
          />
          <p className="board-text">Boards</p>
        </button>

        <button
          type="button"
          className="board-btn no-desktop-view-display"
          onClick={onClickBoards}
        >
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755604213/board-icon_t6qjy4.png"
            alt="board-icon"
            className="no-desktop-view-display"
          />
        </button>
        <button
          type="button"
          className="search-button no-desktop-view-display"
          onClick={onClickSearch}
        >
          <img
            src={
              isSearchOpen
                ? 'https://res.cloudinary.com/dzki1pesn/image/upload/v1756440456/search-active-icon_ps7rid.png'
                : 'https://res.cloudinary.com/dzki1pesn/image/upload/v1755604225/search-icon_tvkupn.png'
            }
            alt="search-icon"
            className="search-icon"
          />
        </button>
      </div>
      <img
        src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755604235/task-manager-text-icon_xlcvhz.png"
        alt="task-manager-logo"
        className="trello-logo-title-icon"
      />
      <div className="logout-button-and-profile-and-search-input">
        <div className="search-box no-mobile-view-display">
          <SearchTasks />
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
