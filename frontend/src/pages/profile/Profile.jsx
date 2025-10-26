import React, { useContext } from 'react'
import { AppContext } from '../../App'
import './Profile.css'

const Profile = () => {
  const { user, handleLogout } = useContext(AppContext)

  return (
    <div className="profile">
      <div className="profile-container">
        <h1>My Profile</h1>
        <div className="profile-info">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="profile-details">
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  )
}

export default Profile