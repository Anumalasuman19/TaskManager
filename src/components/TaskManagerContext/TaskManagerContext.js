import {createContext, useState, useEffect} from 'react'
import ApiStatus, {
  ApiKey,
  GetToken,
} from '../TaskManager/CommonComponents/Constants'

export const TaskManagerContext = createContext()

export const TaskManagerProvider = ({children}) => {
  const [organizationData, setOrganizationData] = useState([])
  const [organizationDataApiStatus, setOrganizationDataApiStatus] = useState(
    ApiStatus.initial,
  )
  const [activeOrganizationId, setActiveOrganizationId] = useState(null)
  const [userData, setUserData] = useState('')

  const fetchOrganizations = async () => {
    setOrganizationDataApiStatus(ApiStatus.inProgress)
    const url = `https://api.trello.com/1/members/me/organizations?key=${ApiKey}&token=${GetToken()}`
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok) {
      setOrganizationData(data)
      if (!activeOrganizationId && data.length > 0) {
        setActiveOrganizationId(data[0].id)
      }
      setOrganizationDataApiStatus(ApiStatus.success)
    }
  }

  const getUserData = async () => {
    const url = `https://api.trello.com/1/members/me?key=${ApiKey}&token=${GetToken()}`
    const options = {method: 'GET'}
    const apiResponse = await fetch(url, options)
    const jsonResponse = await apiResponse.json()

    if (apiResponse.ok) {
      setUserData(jsonResponse)
    }
  }

  useEffect(() => {
    fetchOrganizations()
    getUserData()
  }, [])

  const contextValue = {
    organizationData,
    setOrganizationData,
    organizationDataApiStatus,
    setOrganizationDataApiStatus,
    activeOrganizationId,
    setActiveOrganizationId,
    userData,
    setUserData,
  }

  return (
    <TaskManagerContext.Provider value={contextValue}>
      {children}
    </TaskManagerContext.Provider>
  )
}
