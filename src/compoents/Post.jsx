import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import defaultBioImage from "../assets/download.png"

function Post() {
  const [likedPosts, setLikedPosts] = useState({});

 const user = useSelector((state) => state.auth.user);
   
 const [userID] = useState(user?.user_id)
  const [images, setImages] = useState([]);
  const [loading,setloading] = useState(true)


  const handleLike = async (index, postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));

    
    const requestBody = {
      post_id: postId, 
      user_id: userID, 
    };

    console.log("Post ID " + postId);
      console.log("follower ID " + userID);

    try {
     
      const response = await axios.post(
        "http://localhost:5432/api/v1/love-post",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: user?.accessToken,
          },
        }
      );

     
      if (response.status === 200) {
        console.log("Post liked successfully");
      } else {
        console.error("Failed to like the post");
      }
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`http://localhost:5432/api/v1/posts`, {
          headers: {
            "Content-Type": "application/json",
            authorization: user?.accessToken,
          },
        });
  
       
        if (res.status === 200) {
          setImages(res.data.data);
        }
      } catch (error) {
        console.log(error)
      } finally {
        setloading(false); // Set loading to false once the request completes
      }
     
    };

    fetchdata();
  }, []);

  

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4">
      {loading?( <p className="text-white">Loading...</p>):
      
      (
        images.length > 0 ? (
          images.map((photo, index) => (
            <div
              key={index}
              className="bg-gray-900 text-white p-6 rounded-xl shadow-lg border border-gray-800"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={photo.user.avatar ? "http://localhost:5432"+photo.user.avatar :defaultBioImage}
                  alt="userPhoto"
                  className="w-12 h-12 rounded-full border-2 border-[#ff6600]"
                />
                <h3 className="text-lg font-semibold">{photo.user.username}</h3>
              </div>
  
              <img
                src={"http://localhost:5432" + photo.image}
                alt="Post"
                className="w-full max-h-96 rounded-lg object-cover border border-gray-700 mb-4"
              />
  
              <p className="text-gray-300 mb-4">{photo.description}</p>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleLike(index, photo.post_id)}
                  className="flex items-center gap-2 text-gray-400 hover:text-[#ff6600] transition-all"
                >
                  {likedPosts[index] ? <FaHeart className="text-[#ff6600]" /> : <FaRegHeart />}
  
                </button>
              
              </div>
  
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No posts available</p>
        )
      )
      }
    
    </div>
  );
}

export default Post;
