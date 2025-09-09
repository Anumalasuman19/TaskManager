import {useState, useEffect, useCallback} from 'react'
import ApiStatus from '../Constants'

function useApi(url, options = {}, autoFetch = true) {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState(ApiStatus.initial)
  const [error, setError] = useState(null)

  // Generic fetch function
  const fetchData = useCallback(
    async (overrideOptions = {}) => {
      try {
        setStatus(ApiStatus.inProgress)
        const response = await fetch(url, {
          ...options,
          ...overrideOptions,
        })

        const json = await response.json()

        if (response.ok) {
          setData(json)
          setStatus(ApiStatus.success)
          return json
        }

        setError(json)
        setStatus(ApiStatus.failure)
        throw json
      } catch (err) {
        setError(err)
        setStatus(ApiStatus.failure)
        throw err
      }
    },
    [url],
  )

  // Auto-fetch only on mount/url change if enabled
  useEffect(() => {
    if (autoFetch && url) fetchData()
  }, [url, autoFetch, fetchData])

  return {data, status, error, setData, refetch: fetchData}
}

export default useApi
