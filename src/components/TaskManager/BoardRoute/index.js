import {useState, useEffect} from 'react'
import {DragDropContext} from '@hello-pangea/dnd'
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

  const handleListClosed = closedListId => {
    setBoardListsData(prev => prev.filter(list => list.id !== closedListId))
  }

  const onTaskDeleted = (taskId, listId) => {
    setTasksData(prev => prev.filter(task => task.id !== taskId))
  }

  const onDragEnd = async result => {
    const {source, destination, draggableId} = result

    if (!destination) return

    // Allow only reorder inside the same list
    if (source.droppableId !== destination.droppableId) return

    // No change if dropped in same spot
    if (source.index === destination.index) return

    setTasksData(prev => {
      const updated = Array.from(prev)

      // Filter only tasks of this list
      const listTasks = updated.filter(
        task => task.idList === source.droppableId,
      )

      // Remove dragged task from list
      const [movedTask] = listTasks.splice(source.index, 1)

      // Insert it at new position
      listTasks.splice(destination.index, 0, movedTask)

      // Rebuild the array: replace only this list’s tasks
      const reordered = [
        ...updated.filter(task => task.idList !== source.droppableId),
        ...listTasks,
      ]

      return reordered
    })

    // ---- Trello API Update ----
    const token = localStorage.getItem('pa_token')
    const cardId = draggableId

    // Trello "pos" param → use "top" if index 0 else "bottom"
    let pos = 'bottom'
    if (destination.index === 0) pos = 'top'

    const url = `https://api.trello.com/1/cards/${cardId}?key=${ApiKey}&token=${token}&pos=${pos}`
    await fetch(url, {method: 'PUT'})
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
            <DragDropContext onDragEnd={onDragEnd}>
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
                        onListClosed={handleListClosed}
                        onTaskDeleted={onTaskDeleted}
                      />
                    )
                  })}
                </ul>
                {isNewListEntryPopUpOpen ? (
                  <AddList
                    onAddList={addListApi}
                    onClose={onClickAddListClose}
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
            </DragDropContext>
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
