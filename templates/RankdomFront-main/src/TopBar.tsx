import './TopBar.css';

function TopBar() {
  return (
    <div className="top-bar">
      <h2 className="top-bar-title">RANKDOM</h2>
      <div className="login-icon-placeholder">
        <span role="img" aria-label="login">🥜</span>
      </div>
    </div>
  );
}

export default TopBar;
