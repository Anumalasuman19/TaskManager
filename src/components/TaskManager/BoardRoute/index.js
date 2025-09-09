import {useState} from 'react'
import './index.css'
import Organizations from '../Organizations/Organizations'
import NavBar from '../NavBar/NavBar'
import {
  ApiKey,
  GetToken,
  NavBarActivePopup,
} from '../CommonComponents/Constants'
import BoardContent from './BoardContent/BoardContent'
import SearchTasks from '../SearchTasks/SearchTasks'
import useApi from '../CommonComponents/UseApi/UseApi'

const Board = props => {
  const {match} = props
  const {id} = match.params
  const [activePopup, setActivePopup] = useState(null)
  const showOrganizationsPopup =
    activePopup === NavBarActivePopup.mobileViewOrganizationPopup
  const isSearchTasksEnabled =
    activePopup === NavBarActivePopup.mobileViewSearchSection

  const listsUrl = `https://api.trello.com/1/boards/${id}/lists?key=${ApiKey}&token=${GetToken()}`
  const tasksUrl = `https://api.trello.com/1/boards/${id}/cards?key=${ApiKey}&token=${GetToken()}&filter=open`

  const {
    data: boardListsData,
    status: boardListsStatus,
    setData: setBoardListsData,
  } = useApi(listsUrl)
  const {data: tasksData, setData: setTasksData} = useApi(tasksUrl)
  const openOrganizationsPopUp = () => {
    setActivePopup(NavBarActivePopup.mobileViewOrganizationPopup)
  }

  const onChangeOrganization = () => {
    const {history} = props
    history.replace('/')
  }

  const onClickCloseOrganization = () => {
    setActivePopup(null)
  }

  return (
    <div className="board-container">
      <NavBar
        openOrganizationsPopUp={openOrganizationsPopUp}
        showOrganizationPopup={showOrganizationsPopup}
        activePopup={activePopup}
        setActivePopup={setActivePopup}
      />
      {isSearchTasksEnabled ? (
        <div className="board-no-desktop-view">
          <SearchTasks />
        </div>
      ) : (
        <BoardContent
          boardListsData={boardListsData}
          boardListsDataApiStatus={boardListsStatus}
          tasksData={tasksData}
          setTasksData={setTasksData}
          setBoardListsData={setBoardListsData}
          activePopup={activePopup}
          setActivePopup={setActivePopup}
        />
      )}
      {showOrganizationsPopup && (
        <Organizations
          onClose={onClickCloseOrganization}
          onChangeOrganizationItem={onChangeOrganization}
        />
      )}
    </div>
  )
}

export default Board
