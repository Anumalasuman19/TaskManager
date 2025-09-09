import {Link} from 'react-router-dom'
import Organizations from '../../Organizations/Organizations'
import {NavBarActivePopup} from '../../CommonComponents/Constants'
import './NavButtons.css'

const NavButtons = ({
  showOrganizationPopup,
  openOrganizationsPopUp,
  activePopup,
  setActivePopup,
  onClickBoards,
  onChangeOrganization,
}) => {
  const showDropdown =
    activePopup === NavBarActivePopup.desktopViewOrganizationPopup

  const isSearchOpen = activePopup === NavBarActivePopup.mobileViewSearchSection

  const setOrganizationPopup = () => {
    setActivePopup(NavBarActivePopup.desktopViewOrganizationPopup)
  }

  const onClickCloseOrganizations = () => {
    setActivePopup(null)
  }

  const onClickSearch = () => {
    if (isSearchOpen) {
      setActivePopup(null)
    } else {
      setActivePopup(NavBarActivePopup.mobileViewSearchSection)
    }
  }

  return (
    <div className="nav-buttons-container">
      <Link to="/" className="home-link">
        <img
          src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755604035/home-icon_hbraab.png"
          alt="home-icon"
          className="home-icon"
        />
      </Link>

      {/* Organization (mobile) */}
      <button
        type="button"
        className="organization-button no-desktop-view-display"
        onClick={openOrganizationsPopUp}
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

      {/* Organization dropdown (desktop) */}
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
          <div className="organization-dropdown no-mobile-view-display">
            <Organizations
              onClose={onClickCloseOrganizations}
              onChangeOrganizationItem={onChangeOrganization}
            />
          </div>
        )}
      </div>

      {/* Boards button (desktop + mobile) */}
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

      {/* Search button (mobile) */}
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
  )
}

export default NavButtons
