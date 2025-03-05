import React from 'react'
import { useSelector } from 'react-redux'

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user) || {
    name: "Guest User",
    email: "guest@example.com",
    avatar: "https://via.placeholder.com/100",
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img 
          src={user.avatar || "https://via.placeholder.com/100"} 
          alt="Seller Avatar" 
          className="profile-avatar"
        />
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-email">{user.email}</p>
      </div>
    </div>
  )
}

export default ProfilePage