import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import { addphoto } from "../features/addpostSlice";
import axios from "axios";

function Addpost({ setAdd }) {
    const [image, setImage] = useState(null);
    const [uploadPost, setUploadPost] = useState(null);
    const [description, setDescription] = useState("");
    // const [postimage, setPostimage] = useState(null);
    
    const dispatch = useDispatch(); 
    const addPhoto = useSelector(state => state.photo?.item || []);  
    const user = useSelector((state) => state.auth.user);
    console.log("addPhoto>>", addPhoto);

    const [userID] =useState(user.user_id)


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); 
            setUploadPost(file);
        }
        alert(file);
    };


    
const handleSubmit = async (e) => {
  e.preventDefault();
  try {

    const formData = new FormData();
    formData.append("image", uploadPost); 

    alert(formData);
    const res = await axios.post(
      `http://localhost:5432/api/v1/upload-image-post-local/${userID}`,
      formData,     
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: user?.accessToken, 
        },
      }
    );
    
    console.log("Profile updated:", res.data);
    alert("Profile updated successfully!");
    
   
    dispatch(addphoto({ description, image }));
    
  
    setAdd(false);
    setDescription("");
    setImage(null);
  } catch (error) {
    console.error("Error uploading image:", error.response?.data || error.message);
    // alert("There was an error updating your profile. Please try again.");
  }
};
const handleCross = () => {
  setAdd((prev) => !prev); 
};

    return (
        <div className="w-full max-w-lg p-6 rounded-2xl shadow-xl bg-gray-900 text-white mx-auto">
        <h2 className="text-2xl font-extrabold text-center mb-6"><RxCross2 className='cursor-pointer' onClick={handleCross}/>Add New Post</h2>
      
        <form onSubmit={handleSubmit} className="space-y-5">
    
          <div>
            <textarea
              placeholder="What's on your mind?"
              className="w-full px-4 py-3 border border-gray-700 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="3"
            />
          </div>
      

          <div className="relative flex flex-col items-center gap-4">
            <label className="w-full flex flex-col items-center justify-center bg-gray-800 border border-gray-700 text-gray-400 cursor-pointer rounded-lg px-4 py-3 hover:bg-gray-700 hover:text-white transition">
              <span className="text-sm font-semibold">Upload an Image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
      

            {image && (
              <div className="mt-2 flex justify-center">
                <img src={image} alt="Preview" className="w-32 h-32 rounded-lg object-cover border border-gray-600 shadow-md" />
              </div>
            )}
          </div>
      

          <button
            type="submit"
            className="w-full bg-[#ff6600] text-white py-3 rounded-lg font-bold hover:bg-[#ff4000c7] transition duration-300 shadow-md"
          >
            Post
          </button>
        </form>
      </div>
    );
}

export default Addpost;
