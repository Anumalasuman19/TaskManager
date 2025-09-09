import {useState, useEffect, useContext} from 'react'
import {TaskManagerContext} from '../../TaskManagerContext/TaskManagerContext'
import './OrganizationBoardsSection.css'
import ApiStatus, {
  ApiKey,
  NoBoardsText,
  BoardsSubHeading,
  GetToken,
} from '../CommonComponents/Constants'
import OrganizationBoardItem from '../OrganizationBoardItem/OrganizationBoardItem'
import LoadingView from '../CommonComponents/LoadingView/LoadingView'
import useApi from '../CommonComponents/UseApi/UseApi'

const OrganizationBoardsSection = props => {
  const {
    onClickOfCreateBoard,
    newCreatedBoard,
    isShowCreateBoardPopupOpen,
  } = props
  const {activeOrganizationId} = useContext(TaskManagerContext)
  const [isMouseHoverOnCreateBoard, setIsMouseHoverOnCreateBoard] = useState(
    false,
  )

  const url = `https://api.trello.com/1/organizations/${activeOrganizationId}/boards?key=${ApiKey}&token=${GetToken()}`
  const {data: boards, status, error, setData} = useApi(url)

  const getSubHeaderText = () => {
    let subHeader
    if (boards === null || boards.length === 0) {
      subHeader = NoBoardsText
    } else {
      subHeader = BoardsSubHeading
    }
    return subHeader
  }

  const onMouseEnterCreateBoard = () => {
    setIsMouseHoverOnCreateBoard(true)
  }

  const onMouseLeaveCreateBoard = () => {
    setIsMouseHoverOnCreateBoard(false)
  }

  useEffect(() => {
    if (newCreatedBoard) {
      setData(prev => [...(prev || []), newCreatedBoard])
    }
  }, [newCreatedBoard, setData])

  if (status === ApiStatus.inProgress) return <LoadingView />
  if (status === ApiStatus.failure) return <p>Error: {error?.message}</p>

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
      {status === ApiStatus.success && (
        <div className="boards-list-container">
          <ul className="boards-list">
            {boards.map(board => (
              <OrganizationBoardItem
                key={board.id}
                id={board.id}
                boardName={board.name}
              />
            ))}
            <li>
              <button
                type="button"
                onMouseEnter={onMouseEnterCreateBoard}
                onMouseLeave={onMouseLeaveCreateBoard}
                className={`create-new-board-button ${
                  isShowCreateBoardPopupOpen || isMouseHoverOnCreateBoard
                    ? 'create-new-board-button-active'
                    : ''
                }`}
                onClick={onClickOfCreateBoard}
              >
                <img
                  src={
                    isShowCreateBoardPopupOpen || isMouseHoverOnCreateBoard
                      ? 'https://res.cloudinary.com/dzki1pesn/image/upload/v1755930805/plus_1_ihwyso.png'
                      : 'https://res.cloudinary.com/dzki1pesn/image/upload/v1755662935/plus_dq7zet.png'
                  }
                  alt="plus-icon"
                  className="plus-icon"
                />
                <p
                  className={`create-new-board-text ${
                    isShowCreateBoardPopupOpen || isMouseHoverOnCreateBoard
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
      )}
    </div>
  )
}
export default OrganizationBoardsSection
