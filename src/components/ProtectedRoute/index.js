import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = props => {
  const token = localStorage.getItem('pa_token', '')
  if (token === null || token === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
