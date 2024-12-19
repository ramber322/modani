import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Register() {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();


 
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error messages

    // Validate password confirmation
    if (password !== passwordConfirmation) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    // Send registration request to API
    fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ name, email, password, password_confirmation: passwordConfirmation }),
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
          alert("Registration successful!");
          navigate("/");
        } else {
          setErrorMessage("Registration failed: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("Registration failed: " + (error.message || "An unexpected error occurred."));
      });
  };


  return (
    <div className="bg-gray-200 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)} // Update name state
            />
          </div>

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

          <div className="mb-4">
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)} // Update password confirmation state
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
 
  <div className="text-center mt-4">
        <button
          onClick={() => navigate("/")} 
          className="text-sm text-blue-500 hover:underline"
        >
          Already have an account? Login
        </button>
      </div>
        <p className="mt-4 text-center text-sm text-red-600">{errorMessage}</p>
      </div>
    </div>
  );
}

export default Register;
