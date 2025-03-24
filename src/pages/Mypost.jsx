import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector,  } from "react-redux";

import axios from "axios";

function MyPost() {
  const [postdata, setPostdata] = useState([]);
  
  const user = useSelector((state) => state.auth.user);
  const [userID] = useState(user.user_id);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get(
        `http://localhost:5432/api/v1/posts/${userID}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: user?.accessToken,
          },
        }
      );
      console.log("Fetched posts:", res);
      if (res.status === 200) {
        setPostdata(res.data.data);
      }
    };
    fetchdata();
  }, [userID, user?.accessToken]);

  const handleDelete = async (index, postId) => {
    try {
      // Sending DELETE request to API
    
      const response = await axios.post(
        `http://localhost:5432/api/v1/deletePost/${postId}`, // URL
        {}, // Empty body (if there is no body data)
        {
          headers: {
            "Content-Type": "application/json",
            authorization: user?.accessToken, // Correctly send the authorization token
          }
        }
      );

      // If the post was deleted successfully
      if (response.status === 200) {
        console.log("Post deleted successfully");
        // Remove the post from state and UI
        setPostdata((prevPostData) => {
          return prevPostData.filter((post, i) => i !== index); // Remove post by index
        });
      }
    } catch (error) {
      console.error("Error deleting the post:", error);
       setPostdata((prevPostData) => {
        return prevPostData.filter((post, i) => i !== index); // Remove post by index
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-white text-2xl font-bold mb-6 text-center">All Posts</h2>

      {postdata.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {postdata.map((photo, index) => (
            <div
              key={index}
              className="relative bg-gray-900 p-4 rounded-xl shadow-md transition-all hover:shadow-lg hover:scale-105 duration-200"
            >
              {/* Post Image */}
              <img
                src={"http://localhost:5432" + photo.image}
                alt="Post"
                className="w-full h-48 object-cover rounded-lg border border-gray-700"
              />

              {/* Post Description */}
              <p className="text-gray-300 text-sm text-center mt-3 font-semibold line-clamp-2">
                {photo.description}
              </p>

              {/* Delete Button */}
              <button
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-md transition-all duration-200"
                onClick={() => handleDelete(index, photo.post_id)} // Pass post ID to the delete handler
              >
                <MdDelete size={20} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-lg mt-6">No posts available</p>
      )}
    </div>
  );
}

export default MyPost;
