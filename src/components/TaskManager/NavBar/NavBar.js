import {useEffect, useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './NavBar.css'

const NavBar = props => {
  const {
    getOrganizationsData,
    showOrganizationPopup,
    openOrganizationsPopUp,
  } = props
  const [initialOrganizationId, setInitialOrganizationId] = useState('')

  const onClickOfLogout = () => {
    localStorage.removeItem('pa_token')
    const {history} = props
    history.replace('/login')
  }
  const storeInitialOrganizationStoreId = orgId => {
    console.log(initialOrganizationId)
    console.log('Initial id stored')
    localStorage.setItem('organization_id', orgId)
  }

  const OrganizationsDataApi = async () => {
    const apiKey = '23335c9526346209ad2255ae52d79303'
    const token = localStorage.getItem('pa_token')
    const url = `https://api.trello.com/1/members/me/organizations?key=${apiKey}&token=${token}`
    const options = {method: 'GET'}

    const apiResponse = await fetch(url, options)
    const jsonResponse = await apiResponse.json()

    if (apiResponse.ok) {
      getOrganizationsData(jsonResponse)
      const firstOrgId = jsonResponse[0].id
      setInitialOrganizationId(firstOrgId)
      return firstOrgId // ✅ return it so useEffect can use it
    }
    return null
  }

  const onClickOfOrganizations = () => {
    OrganizationsDataApi()
    openOrganizationsPopUp()
  }
  useEffect(() => {
    const fetchAndStoreInitialOrg = async () => {
      const orgId = await OrganizationsDataApi() // return id from API
      storeInitialOrganizationStoreId(orgId) // store only once
    }

    fetchAndStoreInitialOrg()
  }, [])

  return (
    <div className="nav-bar-container">
      <div className="nav-buttons-container">
        <Link to="/" className="home-link">
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755604035/home-icon_hbraab.png"
            alt="home-icon"
          />
        </Link>
        <button
          type="button"
          className="organization-button"
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
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755604213/board-icon_t6qjy4.png"
            alt="board-icon"
          />
        </Link>
        <img
          src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755604225/search-icon_tvkupn.png"
          alt="search-icon"
          className="search-icon"
        />
      </div>
      <img
        src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755604235/task-manager-text-icon_xlcvhz.png"
        alt="task-manager-logo"
        className="trello-logo-title-icon"
      />
      <div className="logout-button-and-profile">
        <button
          type="button"
          className="logout-button"
          onClick={onClickOfLogout}
        >
          Log Out
        </button>
        <div className="profile-bg">
          <p className="profile-text">WJ</p>
        </div>
      </div>
    </div>
  )
}

export default withRouter(NavBar)
