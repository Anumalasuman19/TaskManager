import {useContext} from 'react'
import {TaskManagerContext} from '../../../TaskManagerContext/TaskManagerContext'
import './OrganizationItem.css'

const OrganizationItem = props => {
  const {name, isActive, onChangeOrganization, id} = props
  const {setActiveOrganizationId} = useContext(TaskManagerContext)

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
