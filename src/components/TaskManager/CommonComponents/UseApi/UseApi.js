import {useState, useEffect, useCallback} from 'react'
import ApiStatus from '../Constants'

function useApi(initialUrl, options = {}, autoFetch = true) {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState(ApiStatus.initial)
  const [error, setError] = useState(null)

  // Generic fetch function
  const fetchData = useCallback(
    async (overrideOptions = {}) => {
      try {
        setStatus(ApiStatus.inProgress)

        const finalUrl = overrideOptions.url || initialUrl
        if (!finalUrl) {
          throw new Error('No URL provided to useApi')
        }

        const {url: apiUrl, ...restOptions} = overrideOptions

        const response = await fetch(finalUrl, {
          ...options,
          ...restOptions,
        })

        const json = await response.json()

        if (response.ok) {
          setData(json)
          setStatus(ApiStatus.success)
          console.log('API called')
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
    [initialUrl],
  )

  // Auto-fetch only on mount/url change if enabled
  useEffect(() => {
    if (autoFetch && initialUrl) fetchData()
  }, [initialUrl, autoFetch, fetchData])

  return {data, status, error, setData, refetch: fetchData}
}

export default useApi
