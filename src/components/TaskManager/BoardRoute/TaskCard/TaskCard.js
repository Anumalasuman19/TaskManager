import './TaskCard.css'

const TaskCard = ({name}) => (
  <div className="task-card">
    <p className="card-name">{name}</p>
  </div>
)

export default TaskCard
