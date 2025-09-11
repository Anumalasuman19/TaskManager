import {createContext, useState, useEffect} from 'react'
import ApiStatus, {
  ApiKey,
  GetToken,
} from '../TaskManager/CommonComponents/Constants'
import useApi from '../TaskManager/CommonComponents/UseApi/UseApi'

export const TaskManagerContext = createContext()

export const TaskManagerProvider = ({children}) => {
  const [organizationData, setOrganizationData] = useState([])
  const [organizationDataApiStatus, setOrganizationDataApiStatus] = useState(
    ApiStatus.initial,
  )
  const [activeOrganizationId, setActiveOrganizationId] = useState(null)
  const [userData, setUserData] = useState('')

  const {refetch: fetchOrganizationsApi} = useApi(null, {method: 'GET'}, false)

  const {refetch: fetchUserDataApi} = useApi(null, {method: 'GET'}, false)

  const fetchOrganizations = async () => {
    setOrganizationDataApiStatus(ApiStatus.inProgress)
    const url = `https://api.trello.com/1/members/me/organizations?key=${ApiKey}&token=${GetToken()}`
    try {
      const data = await fetchOrganizationsApi({url})
      setOrganizationData(data)
      if (!activeOrganizationId && data.length > 0) {
        setActiveOrganizationId(data[0].id)
      }
      setOrganizationDataApiStatus(ApiStatus.success)
    } catch (err) {
      setOrganizationDataApiStatus(ApiStatus.failure)
    }
  }

  const getUserData = async () => {
    const url = `https://api.trello.com/1/members/me?key=${ApiKey}&token=${GetToken()}`
    try {
      const data = await fetchUserDataApi({url})
      setUserData(data)
    } catch (err) {
      // optionally handle failure
    }
  }

  // Run once on mount
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
