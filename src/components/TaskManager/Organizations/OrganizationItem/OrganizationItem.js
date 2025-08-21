import './OrganizationItem.css'

const OrganizationItem = props => {
  const {name, isActive} = props
  return (
    <li className={`workspace-item ${isActive ? 'active' : ''}`}>
      <div className="workspace-icon">
        <></>
      </div>
      <p className="workspace-name">{name}</p>
    </li>
  )
}

export default OrganizationItem
