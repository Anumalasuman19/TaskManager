import './OrganizationItem.css'

const OrganizationItem = props => {
  const {name, isActive} = props
  return (
    <div className={`workspace-item ${isActive ? 'active' : ''}`}>
      <div className="workspace-icon">
        <></>
      </div>
      <p className="workspace-name">{name}</p>
    </div>
  )
}

export default OrganizationItem
