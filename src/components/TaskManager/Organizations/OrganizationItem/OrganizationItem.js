import './OrganizationItem.css'
import {ActiveOrganizationKey} from '../../CommonComponents/Constants'

const OrganizationItem = props => {
  const {name, isActive, onChangeOrganization, id} = props

  const onClickOfOrganization = () => {
    localStorage.setItem(ActiveOrganizationKey, id)
    onChangeOrganization()
  }

  return (
    <li
      className={`organization-item ${isActive ? 'active' : ''}`}
      onClick={onClickOfOrganization}
    >
      <div className="organization-icon" />
      <p className="organization-name">{name}</p>
    </li>
  )
}

export default OrganizationItem
