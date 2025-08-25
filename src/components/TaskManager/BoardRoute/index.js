import {useState, useEffect} from 'react'
import './index.css'
import NavBar from '../NavBar/NavBar'
import Organizations from '../Organizations/Organizations'
import ApiStatus, {ApiKey} from '../CommonComponents/Constants'
import LoadingView from '../CommonComponents/LoadingView/LoadingView'
import BoardTaskList from './BoardTasksList/BoardTasksList'
import AddList from './AddList/AddList'

const Board = props => {
  const [organizationData, setOrganizationData] = useState()
  const [showOrganizationsPopup, setShowOrganizationsPopup] = useState(false)
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
    setShowOrganizationsPopup(true)
  }

  const getBoardsList = async () => {
    setBoardListsDataApiStatus(ApiStatus.inProgress)
    const token = localStorage.getItem('pa_token')
    const {match} = props
    const {params} = match
    const {id} = params
    const url = `https://api.trello.com/1/boards/${id}/lists?key=${ApiKey}&token=${token}`
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
    const token = localStorage.getItem('pa_token')
    const {match} = props
    const {params} = match
    const {id} = params
    const url = `https://api.trello.com/1/boards/${id}/cards?key=${ApiKey}&token=${token}&filter=open`
    const options = {
      method: 'GET',
    }
    const apiResponse = await fetch(url, options)
    const jsonResponse = await apiResponse.json()
    if (apiResponse.ok) {
      setTasksData(jsonResponse)
      setTasksDataApiStatus(ApiStatus.success)
    }
  }

  const onTaskAdded = addedTask => {
    setTasksData(prev => [...prev, addedTask])
  }

  const onClickOfAddListButton = () => {
    setIsNewListEntryPopUpOpen(true)
  }

  const addListApi = async listName => {
    const token = localStorage.getItem('pa_token')
    const {match} = props
    const {params} = match
    const {id} = params

    const url = `https://api.trello.com/1/boards/${id}/lists?key=${ApiKey}&token=${token}&name=${listName}`

    const response = await fetch(url, {method: 'POST'})
    const newList = await response.json()
    // Append new list without reloading whole list
    setBoardListsData(prev => [...prev, newList])
    setIsNewListEntryPopUpOpen(false)
  }

  const onChangeOrganization = () => {
    const {history} = props
    history.replace('/')
  }

  const onClickClose = () => {
    setShowOrganizationsPopup(false)
  }
  const onClickAddListClose = () => {
    setIsNewListEntryPopUpOpen(false)
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
                const listCards = tasksData
                  ? tasksData.filter(card => card.idList === list.id)
                  : []

                return (
                  <BoardTaskList
                    key={list.id}
                    listId={list.id}
                    listName={list.name}
                    cards={listCards}
                    onTaskAdded={onTaskAdded}
                  />
                )
              })}
            </ul>
            {isNewListEntryPopUpOpen ? (
              <AddList onAddList={addListApi} onClose={onClickAddListClose} />
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
        showOrganizationPopup={showOrganizationsPopup}
      />
      {getContentContainerView()}
      {showOrganizationsPopup && (
        <Organizations
          workspacesOrganizations={organizationData}
          onClose={onClickClose}
          onChangeOrganizationItem={onChangeOrganization}
        />
      )}
    </div>
  )
}
export default Board
