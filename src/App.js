import {BrowserRouter, Route, Switch} from 'react-router-dom'
import TaskManager from './components/TaskManager'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={TaskManager} />
    </Switch>
  </BrowserRouter>
)

export default App
