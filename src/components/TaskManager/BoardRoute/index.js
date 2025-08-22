import {useState, useEffect} from 'react'
import './index.css'
import NavBar from '../NavBar/NavBar'
import Organizations from '../Organizations/Organizations'
import ApiStatus from '../CommonComponents/Constants'
import LoadingView from '../CommonComponents/LoadingView/LoadingView'
import BoardTaskList from './BoardTasksList/BoardTasksList'
import AddList from './AddList/AddList'

const Board = props => {
  const [organizationData, setOrganizationData] = useState()
  const [showPopup, setShowPopup] = useState(false)
  const [boardListsData, setBoardListsData] = useState()
  const [boardListsDataApiStatus, setBoardListsDataApiStatus] = useState(
    ApiStatus.initial,
  )
  const [tasksData, setTasksData] = useState()
  const [tasksDataApiStatus, setTasksDataApiStatus] = useState(
    ApiStatus.initial,
  )
  const [isNewListEntryPopUpOpen, setIsNewListEntryPopUpOpen] = useState(false)

  const onClickOfOrganizations = organizationsData => {
    setOrganizationData(organizationsData)
  }
  const openOrganizationsPopUp = () => {
    setShowPopup(true)
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

  const onClickOfAddListButton = () => {
    setIsNewListEntryPopUpOpen(true)
  }
  const addListApi = async listName => {
    const apiKey = '23335c9526346209ad2255ae52d79303'
    const token = localStorage.getItem('pa_token')
    const {match} = props
    const {params} = match
    const {id} = params
    const url = `https://api.trello.com/1/boards/${id}/lists?key=${apiKey}&token=${token}&name=${listName}`
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({listName}),
    })

    const data = await response.json()
    setIsNewListEntryPopUpOpen(false)
    getBoardsList()
  }
  const onChangeOrganization = () => {
    const {history} = props
    history.replace('/')
  }
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
              {boardListsData.map(list => {
                // filter cards belonging to this list
                const listCards = tasksData
                  ? tasksData.filter(card => card.idList === list.id)
                  : []

                return (
                  <BoardTaskList
                    key={list.id}
                    listId={list.id}
                    listName={list.name}
                    cards={listCards}
                    onTaskAdded={getTasks}
                  />
                )
              })}
            </ul>
            {isNewListEntryPopUpOpen ? (
              <AddList
                onAddList={addListApi}
                onClose={() => {
                  setIsNewListEntryPopUpOpen(false)
                }}
              />
            ) : (
              <button
                type="button"
                className="add-list-button"
                onClick={onClickOfAddListButton}
              >
                <img
                  src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755762120/white-plus-icon_f1tutx.png"
                  alt="add-list-plus-icon"
                  className="add-list-plus-icon"
                />
                <p className="add-list-text">Add list</p>
              </button>
            )}
          </div>
        )
        break
      default:
        sectionView = null
    }
    return sectionView
  }

  useEffect(() => {
    getBoardsList()
    getTasks()
  }, [])
  return (
    <div className="board-container">
      <NavBar
        getOrganizationsData={onClickOfOrganizations}
        openOrganizationsPopUp={openOrganizationsPopUp}
        showOrganizationPopup={showPopup}
      />
      {getContentContainerView()}

      {showPopup && (
        <Organizations
          workspacesOrganizations={organizationData}
          onClose={() => setShowPopup(false)}
          onChangeOrganizationItem={onChangeOrganization}
        />
      )}
    </div>
  )
}
export default Board
