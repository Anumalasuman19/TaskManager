import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  componentDidMount() {
    // NOTE: We wrote this code here because we kept return URL as login route, if you give a different route, make sure to move this code to the respective route or App.js

    const hashKey = this.getHashKeyFromLocationAfterLogin()

    if (hashKey.token) {
      this.setAccessTokenInLocalStorage(hashKey.token)
    }
  }

  getHashKeyFromLocationAfterLogin = () => {
    const {location} = this.props
    const {hash} = location
    const hashKey = {}
    const queryParams = new URLSearchParams(window.location.search)
    const error = queryParams.get('error')

    if (error === 'access_denied') {
      window.close()
    }

    hash
      .replace(/^#\/?/, '')
      .split('&')
      .forEach(keyValue => {
        const spl = keyValue.indexOf('=')
        if (spl !== -1) {
          hashKey[keyValue.substring(0, spl)] = keyValue.substring(spl + 1)
        }
      })
    return hashKey
  }

  setAccessTokenInLocalStorage = token => {
    localStorage.setItem('pa_token', token)
    localStorage.setItem('pa_expires', new Date().getTime() + 60)
    window.location.replace('/')
  }

  isDevelopmentEnvironment = () => {
    if (
      process.env.NODE_ENV === 'development' ||
      window.location.hostname === 'localhost'
    ) {
      return true
    }
    return false
  }

  getReturnURL = () => {
    if (this.isDevelopmentEnvironment()) {
      /* ADD THIS URL to your Application return URIs to redirect after authentication success OR failure */
      return 'http://localhost:3000/login'
    }
    /* Change this returnURL accordingly before publishing your project and ADD THIS URL to your Application Return URIs to redirect after authentication success OR failure */
    return 'https://sample.ccbp.tech/login'
  }

  openLoginModal = () => {
    // YOU NEED TO ADD YOUR API KEY HERE
    const apiKey = '23335c9526346209ad2255ae52d79303'

    const returnURL = this.getReturnURL()

    const url = `https://trello.com/1/OAuthAuthorizeToken?expiration=never&name=TaskManager&scope=read,write,account&key=${apiKey}&callback_method=fragment&return_url=${returnURL}`
    window.open(url, '_self', ``)
  }

  submitForm = async event => {
    event.preventDefault()
    this.openLoginModal()
  }

  render() {
    const token = localStorage.getItem('pa_token')
    if (token !== null) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <div className="title-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/task-manager-mini-project/task-manager-logo.png"
            className="login-website-title-logo"
            alt="title logo"
          />
          <h1 className="title">Task Manager</h1>
        </div>
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/task-manager-mini-project/task-manager-login.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />
          <p className="form-description">
            Task tracking for your everyday needs.
          </p>
          <button type="submit" className="login-button">
            LOG IN WITH TRELLO
          </button>
        </form>
      </div>
    )
  }
}

export default LoginForm
