import {useState, useEffect} from 'react'
import './OrganizationBoardsSection.css'
import ApiStatus, {ApiKey} from '../CommonComponents/Constants'
import OrganizationBoardItem from '../OrganizationBoardItem/OrganizationBoardItem'
import LoadingView from '../CommonComponents/LoadingView/LoadingView'

const OrganizationBoardsSection = props => {
  const {
    onClickOfCreateBoard,
    newCreatedBoard,
    isShowCreateBoardPopupOpen,
  } = props
  const [organizationBoardsData, setOrganizationBoardsData] = useState()
  const [
    organizationBoardsApiStatus,
    setOrganizationBoardsApiStatus,
  ] = useState(ApiStatus.initial)
  const [isMouseHover, setIsMouseHover] = useState(false)

  const getOrganizationBoards = async () => {
    setOrganizationBoardsApiStatus(ApiStatus.inProgress)
    const token = localStorage.getItem('pa_token')
    const activeOrganizationId = localStorage.getItem('organization_id')
    const url = `https://api.trello.com/1/organizations/${activeOrganizationId}/boards?key=${ApiKey}&token=${token}`
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

  const onMouseMouseOnCreateBoard = () => {
    setIsMouseHover(true)
  }
  const onMouseLeaveOnCreateBoard = () => {
    setIsMouseHover(false)
  }

  useEffect(() => {
    getOrganizationBoards()
  }, [])

  useEffect(() => {
    if (newCreatedBoard) {
      setOrganizationBoardsData(prev => [...prev, newCreatedBoard])
    }
  }, [newCreatedBoard])

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
            <li>
              <button
                type="button"
                onMouseEnter={onMouseMouseOnCreateBoard}
                onMouseLeave={onMouseLeaveOnCreateBoard}
                className={`create-new-board-button ${
                  isShowCreateBoardPopupOpen || isMouseHover
                    ? 'create-new-board-button-active'
                    : ''
                }`}
                onClick={onClickOfCreateBoard}
              >
                <img
                  src={
                    isShowCreateBoardPopupOpen || isMouseHover
                      ? 'https://res.cloudinary.com/dzki1pesn/image/upload/v1755930805/plus_1_ihwyso.png'
                      : 'https://res.cloudinary.com/dzki1pesn/image/upload/v1755662935/plus_dq7zet.png'
                  }
                  alt="plus-icon"
                  className="plus-icon"
                />
                <p
                  className={`create-new-board-text ${
                    isShowCreateBoardPopupOpen || isMouseHover
                      ? 'create-new-board-text-active'
                      : ''
                  }`}
                >
                  Create new board
                </p>
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <LoadingView />
      )}
    </div>
  )
}
export default OrganizationBoardsSection
