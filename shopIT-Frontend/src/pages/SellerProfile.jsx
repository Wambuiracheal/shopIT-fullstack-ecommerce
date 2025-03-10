import React from 'react';
import { useSelector } from 'react-redux';

const SellerProfile = () => {
  const user = useSelector((state) => state.auth.user);

  // Check if the user is logged in and if they have the role 'seller'
  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  if (user.role !== 'seller') {
    return <p>You are not authorized to view this page.</p>;
  }

  return (
    <div className="profile-container" style={styles.container}>
      <div className="profile-card" style={styles.profileCard}>
        <img 
          src={user.avatar || "https://via.placeholder.com/100"} 
          alt="Seller Avatar" 
          className="profile-avatar" 
          style={styles.avatar}
        />
        <h2 className="profile-name" style={styles.name}>{user.name}</h2>
        <p className="profile-email" style={styles.email}>{user.email}</p>
        {/* Additional seller-specific info or actions can go here */}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  profileCard: {
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  name: {
    margin: "0",
    fontSize: "1.8rem",
  },
  email: {
    color: "#555",
  },
};

export default SellerProfile;
