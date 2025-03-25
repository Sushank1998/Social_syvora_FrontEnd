import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userProfile } from "../features/userProfileSlice";
import axios from "axios";

function Profile() {
  const dispatch = useDispatch();

  // const user = useSelector((state) => state.auth.user);
  const userProfileSelector = useSelector((state) => state.auth.user);
  const uniquename = userProfileSelector?.name || userProfileSelector?.username 
  console.log("userProfileSelector",userProfileSelector)


 

  const [isEditing, setIsEditing] = useState(false);

  const [newEmail] = useState(userProfileSelector?.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [bio, setBio] = useState(userProfileSelector?.bio || "");
  const [file, setFile] = useState(null);
  const [newProfilePicture, setNewProfilePicture] = useState(
    "http://localhost:5432" + userProfileSelector?.profilePicture || ""
  );

  
  useEffect(() => {
    const fetchapi = async () => {
      const res = await axios.get(
        `http://localhost:5432/api/v1/user/profile/me/${newEmail}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: userProfileSelector?.accessToken,
          },
        }
      );
      console.log("resdata==.>>",res.data)
      let updatedUser2 = {
        name: res.data.username,
        email: res.data.email,
        dob: res.data.birthdate,
        bio: res.data.bio,
        profilePicture: res.data.avatar,
      };

      dispatch(userProfile(updatedUser2));

    };

    fetchapi();
  }, []);

  const handleUpdate = async () => {
    if (!userProfileSelector?.token) {
      alert("User is not authenticated.");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5432/api/v1/user/${newEmail}`,
        {
          bio: bio,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: userProfileSelector?.accessToken,
          },
        }
      );
    



    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response || error.message || error
      );
      alert("Error updating profile.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select an image before uploading.");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const res = await axios.post(
        `http://localhost:5432/api/v1/upload-image-local/${newEmail}`,
        formData,  
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: userProfileSelector?.accesstoken,
          },
        }
      );
      console.log("Profile updatedsssss:", res.data);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to upload image", error);
      alert("Image upload failed.");
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewProfilePicture(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
console.log("newProfilePicture",userProfileSelector.newProfilePicture)
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 text-white shadow-lg rounded-xl transition-all duration-300">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <img
            src={"http://localhost:5432" + userProfileSelector?.profilePicture }
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-[#ff6600] shadow-md hover:scale-105 transition-transform duration-300"
          />

          <input
            type="file"
            accept="image/*"
            name="avatar"
            onChange={handleImageChange}
            className="mt-2 bg-gray-800 text-gray-300 text-sm text-center cursor-pointer rounded-lg p-2"
          />

          <button
            type="submit"
            className="bg-[#ff6600] px-4 py-1 text-white rounded font-bold mt-5 cursor-pointer"
          >
            Upload Img
          </button>

          <h2 className="text-xl font-semibold mt-4">
          { uniquename}
          </h2>
          
          <p className="text-gray-400">{userProfileSelector?.email}</p>
          <p className="text-gray-500 text-sm">{userProfileSelector?.bio}</p>
        </div>
      </form>


      {isEditing ? (
        <div className="mt-4 space-y-3">
          <input
            type="text"
            readOnly
            value={userProfileSelector.name}
            className="w-full p-3 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg"
            placeholder="Enter new name"
          />
          <input
            type="email"
            value={userProfileSelector.email}
            readOnly
            className="w-full p-3 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg"
            placeholder="Enter new email"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg"
            placeholder="Enter new password"
          />
          <input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-3 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg"
            placeholder="Enter your bio"
          />
          
          <button
            onClick={handleUpdate}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-bold transition-all duration-200"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="w-full bg-[#ff6600] hover:bg-gray-600 text-white py-3 rounded-lg font-bold mt-4 transition-all duration-200"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
}

export default Profile;
