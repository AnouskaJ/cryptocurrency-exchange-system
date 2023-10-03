import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import Axios from 'axios';

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    profileImage: null,
  });

  const [editMode, setEditMode] = useState(false);
  const [editField, setEditField] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:5000/api/user-profile') 
      .then((response) => {
        if (response.status === 200) {
          const { username, email, firstName, lastName } = response.data;
          setUserData({
            username,
            email,
            firstName,
            lastName,
          });
        } else {
          alert('Failed to fetch user data. Please try again.');
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  }, []);

  const handleEdit = (field) => {
    setEditField(field);
    setEditMode(true);
  };

  const handleSave = () => {
    const updatedData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
    };
  
    Axios.put('http://localhost:5000/api/update-user-profile', updatedData)
      .then((response) => {
        if (response.status === 200) {
          setEditMode(false);
          setEditField('');
          setUserData((prevUserData) => ({
            ...prevUserData,
            firstName: updatedData.firstName,
            lastName: updatedData.lastName,
          }));
        } else {
          alert('Failed to update user data. Please try again.');
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };
  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setUserData({
        ...userData,
        profileImage: imageUrl,
      });
    }
  };

  return (
    <div className="profile-page">
      <h2>User Profile</h2>
      <div className="profile-details">
        <div className="profile-image">
          <img
            src={userData.profileImage || '/images/default-profile-image.png'}
            alt="Profile"
          />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        <div className="user-info">
          <h3>Basic Information</h3>
          <p>
            <strong>Username:</strong> {userData.username}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <h3>Additional Details</h3>
          {editField === 'firstName' ? (
            <>
              <p>
                <strong>First Name:</strong>
                <input
                  type="text"
                  value={userData.firstName}
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                />
              </p>
              <button
                onClick={() => {
                  handleSave();
                  setEditField('');
                }}
              >
                Save
              </button>
            </>
          ) : (
            <p>
              <strong>First Name:</strong> {userData.firstName}{' '}
              <button onClick={() => handleEdit('firstName')}>✏️</button>
            </p>
          )}

          {editField === 'lastName' ? (
            <>
              <p>
                <strong>Last Name:</strong>
                <input
                  type="text"
                  value={userData.lastName}
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                />
              </p>
              <button
                onClick={() => {
                  handleSave();
                  setEditField('');
                }}
              >
                Save
              </button>
            </>
          ) : (
            <p>
              <strong>Last Name:</strong> {userData.lastName}{' '}
              <button onClick={() => handleEdit('lastName')}>✏️</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
