import {BrowserRouter, Route, Switch} from 'react-router-dom'
import TaskManager from './components/TaskManager'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Board from './components/TaskManager/BoardRoute/index'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={TaskManager} />
      <ProtectedRoute exact path="/board/:id" component={Board} />
    </Switch>
  </BrowserRouter>
)

export default App
