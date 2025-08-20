import OrganizationItem from './OrganizationItem/OrganizationItem'
import './Organizations.css'

const Organizations = props => {
  const {workspacesOrganizations, onClose, activeOrganizationId} = props
  return (
    <div className="workspace-popup">
      <div className="workspace-popup-header">
        <h3 className="workspace-title">WORKSPACE</h3>
        <button type="button" className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="workspace-list">
        {workspacesOrganizations.map(ws => (
          <OrganizationItem
            key={ws.id}
            name={ws.displayName}
            isActive={activeOrganizationId === ws.id}
          />
        ))}
      </div>
    </div>
  )
}

export default Organizations
