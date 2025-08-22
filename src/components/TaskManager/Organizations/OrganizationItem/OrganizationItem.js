import './OrganizationItem.css'

const OrganizationItem = props => {
  const {name, isActive, onChangeOrganization, id} = props

  const onClickOfOrganization = () => {
    localStorage.setItem('organization_id', id)
    console.log(id)
    console.log('onChangeOrganization:', onChangeOrganization) // Add this log
    if (onChangeOrganization) {
      onChangeOrganization()
    }
  }
  return (
    <li
      className={`workspace-item ${isActive ? 'active' : ''}`}
      onClick={onClickOfOrganization}
    >
      <div className="workspace-icon">
        <></>
      </div>
      <p className="workspace-name">{name}</p>
    </li>
  )
}

export default OrganizationItem
