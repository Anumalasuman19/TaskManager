import {useState, useEffect} from 'react'
import './index.css'
import NavBar from '../NavBar/NavBar'
import Organizations from '../Organizations/Organizations'
import ApiStatus from '../CommonComponents/Constants'
import LoadingView from '../CommonComponents/LoadingView/LoadingView'
import BoardTaskList from './BoardTasksList/BoardTasksList'

const Board = props => {
  const [showPopup, setShowPopup] = useState(false)
  const [organizationData, setOrganizationData] = useState()
  const [organizationDataApiStatus, setOrganizationDataApiStatus] = useState(
    ApiStatus.initial,
  )
  const [activeOrganizationId, setActiveOrganizationId] = useState('')
  const [boardListsData, setBoardListsData] = useState()
  const [boardListsDataApiStatus, setBoardListsDataApiStatus] = useState(
    ApiStatus.initial,
  )
  const [tasksData, setTasksData] = useState()
  const [tasksDataApiStatus, setTasksDataApiStatus] = useState(
    ApiStatus.initial,
  )

  const onClickOfOrganizations = () => {
    setShowPopup(true)
  }
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
    }
  }

  const getBoardsList = async () => {
    setBoardListsDataApiStatus(ApiStatus.inProgress)
    const apiKey = '23335c9526346209ad2255ae52d79303'
    const token = localStorage.getItem('pa_token')
    const {match} = props
    const {params} = match
    const {id} = params
    const url = `https://api.trello.com/1/boards/${id}/lists?key=${apiKey}&token=${token}`
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
    setTasksDataApiStatus(ApiStatus.inProgress)
    const apiKey = '23335c9526346209ad2255ae52d79303'
    const token = localStorage.getItem('pa_token')
    const {match} = props
    const {params} = match
    const {id} = params
    const url = `https://api.trello.com/1/boards/${id}/cards?key=${apiKey}&token=${token}&filter=open`
    const options = {
      method: 'GET',
    }
    const apiResponse = await fetch(url, options)
    const jsonResponse = await apiResponse.json()
    if (apiResponse.ok) {
      setTasksData(jsonResponse)
      setTasksDataApiStatus(ApiStatus.success)
      console.log('Tasks Data')
      console.log(jsonResponse)
    }
  }

  const groupCardsByList = () =>
    tasksData.reduce((groups, card) => {
      const listId = card.idList
      return {
        ...groups,
        [listId]: [...(groups[listId] || []), card],
      }
    }, {})

  const getContentContainerView = () => {
    let sectionView
    switch (boardListsDataApiStatus) {
      case ApiStatus.inProgress:
        sectionView = <LoadingView />
        break
      case ApiStatus.success:
        sectionView = (
          <div className="board-lists-container">
            <ul className="lists-container">
              {boardListsData.map(list => (
                <BoardTaskList
                  key={list.id}
                  listId={list.id}
                  listName={list.name}
                />
              ))}
            </ul>
            <button type="button" className="add-list-button">
              Add list
            </button>
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
    getBoardsList()
    getTasks()
  }, [])
  return (
    <div className="board-container">
      <NavBar
        onClickOfOrganizations={onClickOfOrganizations}
        showOrganizationPopup={showPopup}
      />
      {getContentContainerView()}

      {showPopup && (
        <Organizations
          workspacesOrganizations={organizationData}
          onClose={() => setShowPopup(false)}
          activeOrganizationId={activeOrganizationId}
        />
      )}
    </div>
  )
}
export default Board
