import React, { useState } from "react";

function AdminSettings() {
  const [adminName, setAdminName] = useState("Admin");
  const [adminEmail, setAdminEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setSuccessMessage("Settings updated successfully!");
    
    // Simulate saving settings (replace with API call)
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div className="settings-container">
      <h2>Admin Settings</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Admin Profile Settings */}
      <div className="settings-section">
        <h3>Profile Settings</h3>
        <form onSubmit={handleSaveChanges}>
          <label>
            Name:
            <input
              type="text"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              required
            />
          </label>
          <label>
            New Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <h3>Platform Settings</h3>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={maintenanceMode}
              onChange={() => setMaintenanceMode(!maintenanceMode)}
            />
            Enable Maintenance Mode
          </label>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default AdminSettings;
