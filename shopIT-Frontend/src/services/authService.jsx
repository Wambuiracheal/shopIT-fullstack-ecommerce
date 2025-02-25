const API_URL = "http://localhost:5173/api/auth";

export const loginUser = async (email, password) => {
  try {
    const simulatedResponse = { 
      token: "fake-jwt-token",  
      message: "Login successful!"
    };

    if (email === "test@user.com" && password === "password123") {
      localStorage.setItem("token", simulatedResponse.token);
      return true; 
    } else {
      alert("Invalid credentials!");
      return false;
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Login failed. Please try again later.");
    return false;
  }
};

export const registerUser = async (name, email, password, role) => {
  try {
    const simulatedResponse = {
      message: "Registration successful!"
    };

    if (name && email && password && role) {
      alert(simulatedResponse.message); 
      return true; 
    } else {
      alert("Please fill in all fields correctly.");
      return false;
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Registration failed. Please try again later.");
    return false;
  }
};
