import OrganizationItem from './OrganizationItem/OrganizationItem'
import './Organizations.css'
import {ActiveOrganizationKey} from '../CommonComponents/Constants'

const Organizations = props => {
  const {workspacesOrganizations, onClose, onChangeOrganizationItem} = props

  const activeOrganizationId = localStorage.getItem(ActiveOrganizationKey)
  return (
    <div className="workspace-popup">
      <div className="workspace-popup-header">
        <h3 className="workspace-title">WORKSPACE</h3>
        <button type="button" className="workspace-close-btn" onClick={onClose}>
          <img
            src="https://res.cloudinary.com/dzki1pesn/image/upload/v1755864143/close_oyomr8.png"
            alt="close-icon"
            className="workspace-close-btn-icon"
          />
        </button>
      </div>
      <ul className="workspace-list">
        {workspacesOrganizations.map(organization => (
          <OrganizationItem
            key={organization.id}
            name={organization.displayName}
            isActive={activeOrganizationId === organization.id}
            onChangeOrganization={onChangeOrganizationItem}
            id={organization.id}
          />
        ))}
      </ul>
    </div>
  )
}

export default Organizations
