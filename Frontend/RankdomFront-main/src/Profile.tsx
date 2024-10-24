import './Profile.css';

function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <header className="profile-card-header">
          <div className="profile-avatar">
            <img src="/placeholder.svg?height=96&width=96" alt="Profile picture" />
          </div>
          <div className="profile-info">
            <h1 className="profile-name">Navn placeholder</h1>
            <p className="profile-title">Software Developer</p>
          </div>
        </header>
        <div className="profile-card-content">
          <h2 className="history-title">History Feed</h2>
          <ul className="history-list">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ,16, 17, 18, 19, 20].map((item) => (
              <li key={item} className="history-item">
                <h3>Activity {item}</h3>
                <p>
                  This is a placeholder for an activity feed from the database for now :)
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
