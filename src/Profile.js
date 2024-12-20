// Profile.js

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ProfileModal from "./components/ProfileModal"; // Import the ProfileModal

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch user information
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://127.0.0.1:8000/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          return response.json();
        })
        .then((data) => {
          if (data.success && data.user) {
            setUser(data.user);
            setErrorMessage("");
          } else {
            setErrorMessage("Could not retrieve user information.");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setErrorMessage("Failed to fetch user information.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setErrorMessage("No token found. Please log in.");
      setLoading(false);
    }
  }, []); 

  const handleEditProfile = (updatedUser) => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/api/user", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update user data");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setUser(updatedUser);
          setIsModalOpen(false);
        } else {
          setErrorMessage("Could not update user information.");
        }
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        setErrorMessage("Failed to update user information.");
      });
  };

  if (loading) {
    return (
      <div>
        <Header props="user" />
        <div className="container mx-auto mt-8 px-4">
          <h2 className="text-xl font-semibold">Loading user information...</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header props="user" />
      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-2xl font-semibold">Account Information</h1>
        
        {errorMessage && (
          <div className="text-red-500 mt-4">{errorMessage}</div>
        )}
        
        {user && (
          <div className="bg-white rounded-lg p-6 mt-6 shadow-md">
            <p className="my-2"><strong>Name:</strong> {user.name}</p>
            <p className="my-2"><strong>Email:</strong> {user.email}</p>
            <p className="my-2"><strong>Role:</strong> {user.role}</p>
            <p className="my-2"><strong>Created At:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
            </button>
          </div>
        )}
      </main>
      <ProfileModal 
        user={user} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleEditProfile} 
      />
    </div>
  );
}

export default Profile;