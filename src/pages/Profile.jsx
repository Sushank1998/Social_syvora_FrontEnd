import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userProfile,updateProfilePicturePx,updateProfileDataPx } from "../features/userProfileSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultBioImage from "../assets/download.png"

function Profile() {
  const dispatch = useDispatch();


  const userProfileSelectorRx = useSelector((state) => state.userProfile.user);
  
  const [profileImagedetails, setProfileImagedetails] = useState(
    userProfileSelectorRx && userProfileSelectorRx.profilePicture
      ? "http://localhost:5432" + userProfileSelectorRx.profilePicture
      : defaultBioImage // or any fallback value you want
  );
  // const user = useSelector((state) => state.auth.user);
  const userProfileSelector = useSelector((state) => state.auth.user);

  const uniquename = userProfileSelector?.name || userProfileSelector?.username 

  console.log("userProfileSelector",userProfileSelector)
  
  const [isEditing, setIsEditing] = useState(false);
  const [newEmail] = useState(userProfileSelector?.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [bio, setBio] = useState(userProfileSelectorRx?.bio ? userProfileSelectorRx.bio : 'No bio available');
  const [file, setFile] = useState(null);
  const [newProfilePicture, setNewProfilePicture] = useState(
    "http://localhost:5432" + userProfileSelector?.profilePicture || defaultBioImage
  );
console.log("userProfileSelector==n-useSlector==>",userProfileSelector)
console.log("ins_value_of_bIO_==>",userProfileSelector?.bio, ) //un
  
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
        user_id:res.data.user_id,
        accessToken:userProfileSelector?.accessToken,
      };

      dispatch(userProfile(updatedUser2));
      console.log("accessToken",userProfileSelector?.accessToken)

    };
      fetchapi();
  }, []);

  const handleUpdate = async () => {
    if (userProfileSelector?.accessToken) {
      try {
        const res = await axios.put(
          `http://localhost:5432/api/v1/user/${newEmail}`,
          {
            bio: bio,
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: userProfileSelector?.accessToken,
            },
          }
        );
      console.log("res_handleUpdate  ==>",res)
      setIsEditing(false)
    

      if(res.status===200)
        {
          dispatch(updateProfileDataPx(bio))
        }

        
          
      } catch (error) {
        console.error(
          "Error updating profile:",
          error.response || error.message || error
        );
      }
      
    }else{
      alert("User is not authenticated.");
    };
  }
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
            authorization: userProfileSelector?.accessToken,
          },
        }
      );
      console.log("Profile updatedsssss:", res.data);
      console.log("Profile updatedsssss:", res.data.imageUrl);

      if(res.status===200)
      {
        dispatch(updateProfilePicturePx(res.data.imageUrl))
      }
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
      setProfileImagedetails(URL.createObjectURL(selectedFile));
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewProfilePicture(e.target.result);
      };
      reader.readAsDataURL(selectedFile);

    }
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 text-white shadow-lg rounded-xl transition-all duration-300">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <img
            src={profileImagedetails}
            alt="ProfileImage"
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
          <p className="text-gray-500 text-sm">{userProfileSelectorRx?.bio ? userProfileSelectorRx.bio : 'No bio available'}</p>
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
