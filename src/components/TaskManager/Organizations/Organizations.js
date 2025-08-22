import OrganizationItem from './OrganizationItem/OrganizationItem'
import './Organizations.css'

const Organizations = props => {
  const {workspacesOrganizations, onClose, onChangeOrganizationItem} = props

  const activeOrganizationId = localStorage.getItem('organization_id')
  return (
    <div className="workspace-popup">
      <div className="workspace-popup-header">
        <h3 className="workspace-title">WORKSPACE</h3>
        <button type="button" className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
      <ul className="workspace-list">
        {workspacesOrganizations.map(ws => (
          <OrganizationItem
            key={ws.id}
            name={ws.displayName}
            isActive={activeOrganizationId === ws.id}
            onChangeOrganization={onChangeOrganizationItem}
            id={ws.id}
          />
        ))}
      </ul>
    </div>
  )
}

export default Organizations
