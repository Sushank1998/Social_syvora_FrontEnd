import React, { useEffect, useState } from 'react'
import logo from "../assets/logo.png"
import Profile from '../compoents/Profile'
import Leanding from '../compoents/Leanding'
import Notification from '../compoents/Notification'
import axios from 'axios'
import {userProfile} from "../features/userProfileSlice"
import { useDispatch, useSelector } from 'react-redux'

function Home() {


  const dispatch = useDispatch()
  const userProfileSelector = useSelector((state) => state.auth.user);
  const [newEmail] = useState(userProfileSelector?.email || "");
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

    };

fetchapi();
  }, []);
  
  return (
    <>
<div className="px-6 py-6 w-full bg-gray-900 min-h-screen">
  

  <div className="flex items-center gap-3 mb-2">
    <img src={logo} alt="Logo" className="w-12" />
    <h2 className="text-white font-extrabold text-3xl tracking-wide">Penguin</h2>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-grow">

    <div className=" md:col-span-3 bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 h-auto sticky top-0">
      <Profile />
    </div>

  
    <div className="md:col-span-6 bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700 overflow-y-auto max-h-screen">
      <Leanding />
    </div>

    <div className="md:col-span-3 bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 h-auto sticky top-0">
      <Notification />
    </div>
  </div>
</div>

    </>
  )
}

export default Home
