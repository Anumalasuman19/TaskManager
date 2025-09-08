import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {TaskManagerProvider} from './components/TaskManagerContext/TaskManagerContext'
import TaskManager from './components/TaskManager'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Board from './components/TaskManager/BoardRoute'
import PageNotFound from './components/PageNotFoundRoute/PageNotFoundRoute'

import './App.css'

const App = () => (
  <TaskManagerProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={TaskManager} />
        <ProtectedRoute exact path="/board/:id" component={Board} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  </TaskManagerProvider>
)

export default App
