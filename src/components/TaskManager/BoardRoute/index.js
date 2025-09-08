import {useState, useEffect} from 'react'
import './index.css'
import Organizations from '../Organizations/Organizations'
import NavBar from '../NavBar/NavBar'
import ApiStatus, {
  ApiKey,
  GetToken,
  NavBarActivePopup,
} from '../CommonComponents/Constants'
import BoardContent from './BoardContent/BoardContent'
import SearchTasks from '../SearchTasks/SearchTasks'

const Board = props => {
  const [activePopup, setActivePopup] = useState(null)
  const [boardListsData, setBoardListsData] = useState()
  const [boardListsDataApiStatus, setBoardListsDataApiStatus] = useState(
    ApiStatus.initial,
  )
  const [tasksData, setTasksData] = useState()
  const showOrganizationsPopup =
    activePopup === NavBarActivePopup.mobileViewOrganizationPopup
  const isSearchTasksEnabled =
    activePopup === NavBarActivePopup.mobileViewSearchSection

  const openOrganizationsPopUp = () => {
    setActivePopup(NavBarActivePopup.mobileViewOrganizationPopup)
  }

  const getBoardsList = async () => {
    setBoardListsDataApiStatus(ApiStatus.inProgress)
    const {match} = props
    const {params} = match
    const {id} = params
    const url = `https://api.trello.com/1/boards/${id}/lists?key=${ApiKey}&token=${GetToken()}`
    const options = {
      method: 'GET',
    }
    const apiResponse = await fetch(url, options)
    const jsonResponse = await apiResponse.json()
    if (apiResponse.ok) {
      setBoardListsData(jsonResponse)
      setBoardListsDataApiStatus(ApiStatus.success)
    }
  }

  const getTasks = async () => {
    const {match} = props
    const {params} = match
    const {id} = params
    const url = `https://api.trello.com/1/boards/${id}/cards?key=${ApiKey}&token=${GetToken()}&filter=open`
    const options = {
      method: 'GET',
    }
    const apiResponse = await fetch(url, options)
    const jsonResponse = await apiResponse.json()
    if (apiResponse.ok) {
      const sortedTasks = jsonResponse.sort((a, b) => a.pos - b.pos)
      setTasksData(sortedTasks)
    }
  }

  const onChangeOrganization = () => {
    const {history} = props
    history.replace('/')
  }

  const onClickCloseOrganization = () => {
    setActivePopup(null)
  }

  useEffect(() => {
    getBoardsList()
    getTasks()
  }, [])

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
          boardListsDataApiStatus={boardListsDataApiStatus}
          tasksData={tasksData}
          setTasksData={setTasksData}
          setBoardListsData={setBoardListsData}
          activePopup={activePopup}
          setActivePopup={setActivePopup}
          getBoardsList={getBoardsList}
          getTasks={getTasks}
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
