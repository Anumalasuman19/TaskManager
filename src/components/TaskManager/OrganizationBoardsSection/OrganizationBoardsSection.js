import {useState, useEffect} from 'react'
import './OrganizationBoardsSection.css'
import ApiStatus from '../CommonComponents/Constants'
import OrganizationBoardItem from '../OrganizationBoardItem/OrganizationBoardItem'
import LoadingView from '../CommonComponents/LoadingView/LoadingView'

const OrganizationBoardsSection = props => {
  const {
    onClickOfCreateBoard,
    noOfTimesAdded,
    isShowCreateBoardPopupOpen,
  } = props
  const [organizationBoardsData, setOrganizationBoardsData] = useState()
  const [
    organizationBoardsApiStatus,
    setOrganizationBoardsApiStatus,
  ] = useState(ApiStatus.initial)

  const getOrganizationBoards = async () => {
    setOrganizationBoardsApiStatus(ApiStatus.inProgress)
    const apiKey = '23335c9526346209ad2255ae52d79303'
    const token = localStorage.getItem('pa_token')
    const activeOrganizationId = localStorage.getItem('organization_id')
    const url = `https://api.trello.com/1/organizations/${activeOrganizationId}/boards?key=${apiKey}&token=${token}`
    const options = {
      method: 'GET',
    }
    const apiResponse = await fetch(url, options)
    const jsonResponse = await apiResponse.json()
    if (apiResponse.ok) {
      setOrganizationBoardsData(jsonResponse)
      setOrganizationBoardsApiStatus(ApiStatus.success)
    }
  }

  const getSubHeaderText = () => {
    let subHeader
    if (organizationBoardsData === null) {
      subHeader = 'You Don’t have any workspace'
    } else {
      subHeader = 'Your Workspace boards'
    }
    return subHeader
  }

  useEffect(() => {
    getOrganizationBoards()
  }, [noOfTimesAdded])
  return (
    <div className="boards-container">
      <div className="sub-heading-container">
        <img
          src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755663078/person_outline_dmk6of.png"
          alt="person-outline"
          className="person-icon"
        />
        <h2 className="sub-heading">{getSubHeaderText()}</h2>
      </div>
      {organizationBoardsApiStatus === ApiStatus.success ? (
        <div className="boards-list-container">
          <ul className="boards-list">
            {organizationBoardsData.map(board => (
              <OrganizationBoardItem
                key={board.id}
                id={board.id}
                boardName={board.name}
              />
            ))}
            {isShowCreateBoardPopupOpen === false && (
              <li>
                <button
                  type="button"
                  className="create-new-board-button"
                  onClick={onClickOfCreateBoard}
                >
                  <img
                    src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755662935/plus_dq7zet.png"
                    alt="plus-icon"
                    className="plus-icon"
                  />
                  <p className="create-new-board-text">Create new board</p>
                </button>
              </li>
            )}
          </ul>
        </div>
      ) : (
        <LoadingView />
      )}
    </div>
  )
}
export default OrganizationBoardsSection
