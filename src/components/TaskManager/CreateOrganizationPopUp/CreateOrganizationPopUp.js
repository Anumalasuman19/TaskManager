import {useState} from 'react'
import './CreateOrganizationPopUp.css'

const CreateOrganizationPopUp = props => {
  const {onCreateOrganization, onCreateOrganizationPopUpClose} = props
  const [title, setTitle] = useState('')

  const handleCreateOrganization = event => {
    event.preventDefault()
    if (title.trim() === '') return
    onCreateOrganization(title)
    setTitle('')
  }

  const onChangeInput = event => {
    setTitle(event.target.value)
  }

  return (
    <div className="popup-overlay">
      <form
        onSubmit={handleCreateOrganization}
        className="create-organization-container"
      >
        <button
          type="button"
          className="close-btn"
          onClick={onCreateOrganizationPopUpClose}
        >
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755864143/close_oyomr8.png"
            alt="close-icon"
            className="close-icon"
          />
        </button>
        <h2 className="heading-text">Let’s build a Organization</h2>
        <p className="description">
          Boost your productivity by making it easier for everyone to access
          boards in one location.
        </p>
        <div className="input-container">
          <label className="input-label" htmlFor="organization-name">
            ORGANIZATION NAME
          </label>
          <input
            id="organization-name"
            type="text"
            value={title}
            onChange={onChangeInput}
            className="create-organization-input"
          />
        </div>
        <button type="submit" className="create-organization-button">
          Create Organization
        </button>
      </form>
    </div>
  )
}

export default CreateOrganizationPopUp
