import useTaskManager from '../../CommonComponents/UseTaskManager/UseTaskManager'
import './OrganizationItem.css'

const OrganizationItem = props => {
  const {name, isActive, onChangeOrganization, id} = props
  const {setActiveOrganizationId} = useTaskManager()

  const onClickOfOrganization = () => {
    setActiveOrganizationId(id)
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
