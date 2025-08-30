import {useState, useEffect} from 'react'
import {DragDropContext, Droppable, Draggable} from '@hello-pangea/dnd'
import './index.css'
import NavBar from '../NavBar/NavBar'
import Organizations from '../Organizations/Organizations'
import ApiStatus, {
  ApiKey,
  TokenKey,
  CardType,
  ListType,
} from '../CommonComponents/Constants'
import LoadingView from '../CommonComponents/LoadingView/LoadingView'
import BoardTasksList from './BoardTasksList/BoardTasksList'
import AddList from './AddList/AddList'
import SearchTasks from '../SearchTasks/SearchTasks'

const Board = props => {
  const [organizationData, setOrganizationData] = useState()
  const [showOrganizationsPopup, setShowOrganizationsPopup] = useState(false)
  const [boardListsData, setBoardListsData] = useState()
  const [boardListsDataApiStatus, setBoardListsDataApiStatus] = useState(
    ApiStatus.initial,
  )
  const [tasksData, setTasksData] = useState()
  const [isNewListEntryPopUpOpen, setIsNewListEntryPopUpOpen] = useState(false)
  const [isSearchTasksEnabled, setIsSearchTasksEnabled] = useState(false)
  const token = localStorage.getItem(TokenKey)

  const onClickSearchIcon = isSearchEnabled => {
    setIsSearchTasksEnabled(isSearchEnabled)
  }

  const onClickOfOrganizations = organizationsData => {
    setOrganizationData(organizationsData)
  }

  const openOrganizationsPopUp = () => {
    setShowOrganizationsPopup(true)
  }

  const getBoardsList = async () => {
    setBoardListsDataApiStatus(ApiStatus.inProgress)
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
      const sortedTasks = jsonResponse.sort((a, b) => a.pos - b.pos)
      setTasksData(sortedTasks)
    }
  }

  const onTaskAdded = addedTask => {
    setTasksData(prev => [...prev, addedTask])
  }

  const onClickOfAddListButton = () => {
    setIsNewListEntryPopUpOpen(true)
  }

  const addListApi = async listName => {
    const {match} = props
    const {params} = match
    const {id} = params
    const url = `https://api.trello.com/1/boards/${id}/lists?key=${ApiKey}&token=${token}&name=${listName}`
    const response = await fetch(url, {method: 'POST'})
    const newList = await response.json()
    setBoardListsData(prev => [...prev, newList])
    setIsNewListEntryPopUpOpen(false)
  }

  const onChangeOrganization = () => {
    const {history} = props
    history.replace('/')
  }

  const onClickCloseOrganization = () => {
    setShowOrganizationsPopup(false)
  }

  const onClickAddListClose = () => {
    setIsNewListEntryPopUpOpen(false)
  }

  const handleListClosed = closedListId => {
    setBoardListsData(prev => prev.filter(list => list.id !== closedListId))
  }

  const onTaskDeleted = taskId => {
    setTasksData(prev => prev.filter(task => task.id !== taskId))
  }

  const onDragEnd = async result => {
    const {source, destination, draggableId, type} = result
    if (!destination) return

    if (type === CardType) {
      const sourceListId = source.droppableId
      const destListId = destination.droppableId

      let destTasks = tasksData
        .filter(task => task.idList === destListId)
        .sort((a, b) => a.pos - b.pos)

      if (sourceListId === destListId) {
        destTasks = [...destTasks]
        destTasks.splice(source.index, 1)
      }

      let newPos
      if (destination.index === 0) {
        newPos = destTasks.length > 0 ? destTasks[0].pos / 2 : 65536
      } else if (destination.index >= destTasks.length) {
        newPos = destTasks[destTasks.length - 1].pos + 65536
      } else {
        const before = destTasks[destination.index - 1]
        const after = destTasks[destination.index]
        newPos = (before.pos + after.pos) / 2
      }

      setTasksData(prev => {
        const updated = [...prev]
        const idx = updated.findIndex(t => t.id === draggableId)
        if (idx !== -1) {
          updated[idx] = {
            ...updated[idx],
            idList: destListId,
            pos: newPos,
          }
        }
        return updated
      })

      try {
        const url = `https://api.trello.com/1/cards/${draggableId}?key=${ApiKey}&token=${token}&idList=${destListId}&pos=${newPos}`
        await fetch(url, {method: 'PUT'})
      } catch (err) {
        console.error('Error updating Trello card:', err)
        getTasks()
      }
    }
    if (type === ListType) {
      let newPos
      const reorderedLists = [...boardListsData]
      const [moved] = reorderedLists.splice(source.index, 1)
      reorderedLists.splice(destination.index, 0, moved)

      if (destination.index === 0) {
        newPos = reorderedLists[1] ? reorderedLists[1].pos / 2 : 65536
      } else if (destination.index === reorderedLists.length - 1) {
        newPos = reorderedLists[reorderedLists.length - 2].pos + 65536
      } else {
        const before = reorderedLists[destination.index - 1]
        const after = reorderedLists[destination.index + 1]
        newPos = (before.pos + after.pos) / 2
      }

      setBoardListsData(prev =>
        prev.map(list =>
          list.id === draggableId ? {...list, pos: newPos} : list,
        ),
      )

      try {
        const url = `https://api.trello.com/1/lists/${draggableId}?key=${ApiKey}&token=${token}&pos=${newPos}`
        await fetch(url, {method: 'PUT'})
      } catch (err) {
        console.error('Error updating Trello list:', err)
        getBoardsList()
      }
    }
  }

  const getContentContainerView = () => {
    let sectionView
    switch (boardListsDataApiStatus) {
      case ApiStatus.inProgress:
        sectionView = <LoadingView />
        break
      case ApiStatus.success:
        sectionView = (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="all-lists"
              direction="horizontal"
              type={ListType}
            >
              {(provided, snapshot) => (
                <div
                  className="board-lists-container"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {boardListsData
                    .sort((a, b) => a.pos - b.pos)
                    .map((list, index) => (
                      <Draggable
                        key={list.id}
                        draggableId={String(list.id)}
                        index={index}
                      >
                        {(draggableProvided, draggableSnapshot) => (
                          <div
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            style={{
                              ...draggableProvided.draggableProps.style,
                              opacity: draggableSnapshot.isDragging ? 0.9 : 1,
                            }}
                          >
                            <BoardTasksList
                              listId={list.id}
                              listName={list.name}
                              cards={
                                tasksData
                                  ? tasksData.filter(
                                      card => card.idList === list.id,
                                    )
                                  : []
                              }
                              onTaskAdded={onTaskAdded}
                              onListClosed={handleListClosed}
                              onTaskDeleted={onTaskDeleted}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}

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
              )}
            </Droppable>
          </DragDropContext>
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
        onClickSearchIcon={onClickSearchIcon}
      />
      {isSearchTasksEnabled ? <SearchTasks /> : getContentContainerView()}
      {showOrganizationsPopup && (
        <Organizations
          workspacesOrganizations={organizationData}
          onClose={onClickCloseOrganization}
          onChangeOrganizationItem={onChangeOrganization}
        />
      )}
    </div>
  )
}

export default Board
