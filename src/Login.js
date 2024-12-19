import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard"); 
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error messages

    fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw err;
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          // Store token and role in localStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role); 

          // Redirect based on role
          if (data.role === "admin") {
            navigate("/admindashboard");  
          } else {
            navigate("/dashboard"); 
          }
        } else {
          setErrorMessage("Login failed: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage(
          "Login failed: " + (error.message || "An unexpected error occurred.")
        );
      });
  };

  const handleRegisterRedirect = () => {
    navigate("/register"); // Redirect to  register page
  };

  return (
    <div className="bg-gray-200 flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
          {/* Register Button on the Right */}
    <div className="text-right mt-2">
      <button
        onClick={handleRegisterRedirect}
        className="text-sm text-blue-500 hover:underline"
      >
        Don't have an account? Register
      </button>
    </div>

        <p className="mt-4 text-center text-sm text-red-600">{errorMessage}</p>
      </div>
    </div>
  );
}

export default Login;
