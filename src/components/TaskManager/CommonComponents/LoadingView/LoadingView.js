import './LoadingView.css'

const Loader = () => (
  <div className="loader-container">
    <div className="loader-circle">
      <div className="loader-ring" />
      <span className="loader-text">Loading...</span>
    </div>
  </div>
)

export default Loader
