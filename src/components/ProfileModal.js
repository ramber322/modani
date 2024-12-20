// ProfileModal.js

import React, { useEffect, useState } from "react";

const ProfileModal = ({ user, isOpen, onClose, onSubmit }) => {
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    if (isOpen) {
      setEditedUser(user);
    }
  }, [isOpen, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editedUser);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-lg font-semibold">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block">
              Name:
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              />
            </label>
          </div>
          <div className="mt-4">
            <label className="block">
              Email:
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              />
            </label>
          </div>
          <div className="flex justify-between mt-6">
            <button type="button" onClick={onClose} className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;