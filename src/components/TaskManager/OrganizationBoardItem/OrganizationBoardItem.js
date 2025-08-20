import {Link} from 'react-router-dom'
import './OrganizationBoardItem.css'

const OrganizationBoardItem = props => {
  const {id, boardName} = props
  return (
    <Link to={`/board/${id}`} className="board-item">
      <p className="board-name">{boardName}</p>
    </Link>
  )
}

export default OrganizationBoardItem
