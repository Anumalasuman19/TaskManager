import './OrganizationItem.css'

const OrganizationItem = props => {
  const {name, isActive, onChangeOrganization, id} = props

  const onClickOfOrganization = () => {
    localStorage.setItem('organization_id', id)
    onChangeOrganization()
  }
  return (
    <li
      className={`organization-item ${isActive ? 'active' : ''}`}
      onClick={onClickOfOrganization}
    >
      <div className="organization-icon">
        <></>
      </div>
      <p className="organization-name">{name}</p>
    </li>
  )
}

export default OrganizationItem
