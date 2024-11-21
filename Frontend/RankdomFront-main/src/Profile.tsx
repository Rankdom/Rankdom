import React, {useState, useRef, useEffect} from 'react';
import './Profile.css';
import api from "./api";

function Profile() {
  const [name, setName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const route = "GetProfile/"
  const code = localStorage.getItem('authToken')
  const [url, setUrl] = useState("");




useEffect(() => {
  const fetchData = async () => {
    try {
      const route = "GetProfile/"
      const response = await api.post(route, { code });
      setName(response.data.username)
      if (response.data.image==""){
        setProfilePic("placeholderpic.png?height=96&width=96")
        console.log("here")

      }
      else {

        const base64Image = `data:image/jpeg;base64,${response.data.image}`;
        setProfilePic(base64Image);
      }
      console.log(response.data.image_url)
      console.log(response.data)
      setUrl(response.data.image_url)


    } catch (error) {
      alert(error.message || 'An error occurred');
    }
  };

  fetchData();
}, []);


const updateData = async (image: string, image_url: string) => {
  try {
    const route = "SetProfile/";
    const username = name;
    await api.post(route, { username, code, image, image_url });
    console.log("Profile updated successfully");
  } catch (error) {
    console.error("Error updating profile data:", error);
    alert(error.message || "An error occurred while updating profile data.");
  }
};
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditName = () => {
    setIsEditingName(true);
  };


  const handleSaveName = () => {
    setIsEditingName(false);
    updateData(profilePic,url)
  };

  // Handle file upload for picture
const handlePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files ? event.target.files[0] : null;
  if (file) {
    const imageUrl = URL.createObjectURL(file); // Temporary URL for preview
    setProfilePic(imageUrl); // Update preview
    const fileName = file.name;
    setUrl(fileName); // Set file name

    // Use FileReader to convert the file to Base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result as string; // Base64 string
      const cleanedImage = base64Image.split(",")[1]; // Extract Base64 part
      updateData(cleanedImage, fileName); // Pass directly to updateData
    };
    reader.readAsDataURL(file); // Read the file as a Base64 string
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