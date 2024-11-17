import React, {useState, useRef, useEffect} from 'react';
import './Profile.css';
import api from "./api";

function Profile() {
  const [name, setName] = useState('Input Username here');
  const [isEditingName, setIsEditingName] = useState(false);
  const [profilePic, setProfilePic] = useState('placeholderpic.png?height=96&width=96');
  const route = "GetProfile/"
  const code = localStorage.getItem('authToken')



useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await api.post(route, { code });
      console.log(response.data)
      setName(response.data.username)
      console.log(name)
      const base64Image = `data:image/jpeg;base64,${response.data.image}`;
      console.log(base64Image)
      setProfilePic(base64Image);
    } catch (error) {
      alert(error.message || 'An error occurred');
    }
  };

  fetchData();
}, []);


  // Create a ref for the file input element
  const fileInputRef = useRef<HTMLInputElement>(null);

  //Name input logik.
  const handleEditName = () => {
    setIsEditingName(true);
  };


  const handleSaveName = () => {
    setIsEditingName(false);
  };

  // Handle file upload for picture
  const handlePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };


  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger your download folder path.
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <header className="profile-card-header">
          <div className="profile-avatar">
            <div className="profile-image-wrapper">
              <img
                src={profilePic}
                alt="Profile picture"
                className="profile-image"
                onClick={triggerFileInput}
                title="Click to change picture"
              />
              {/* Take file here input*/}
              <input
                ref={fileInputRef}
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handlePictureUpload}
                className="file-input"
              />
              <div className="overlay" onClick={triggerFileInput}>
                <p>Choose File</p>
              </div>
            </div>
          </div>

          <div className="profile-info">
            {/* Edit name */}
            {isEditingName ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="name-input"
              />
            ) : (
              <h1 className="profile-name">{name}</h1>
            )}
            {/* Save name button */}
            <button className="profile-button edit-name" onClick={isEditingName ? handleSaveName : handleEditName}>
              {isEditingName ? "Save" : "Edit Name"}
            </button>
          </div>
        </header>

        <div className="profile-card-content">
          <h2 className="history-title">History Feed</h2>
          <ul className="history-list">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item) => (
              <li key={item} className="history-item">
                <h3>Activity {item}</h3>
                <p>This is a placeholder for an activity feed from the database for now :)</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;