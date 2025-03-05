const API_URL = "http://127.0.0.1:5555";  

// Login User Function
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      return true;
    } else {
      const errorData = await response.json();
      alert(`Login failed: ${errorData.message}`);
      return false;
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Login failed. Please check your network and try again.");
    return false;
  }
};

// Register User Function
export const registerUser = async (name, email, password, role) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, role }),
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.message || "Registration successful!");
      return true;
    } else {
      const errorData = await response.json();
      alert(`Registration failed: ${errorData.message}`);
      return false;
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Registration failed. Please check your network and try again.");
    return false;
  }
};
