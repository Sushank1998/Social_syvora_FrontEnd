import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";
import { MdHomeFilled } from "react-icons/md";
import { MdLibraryAdd } from "react-icons/md";
import { FaGrinBeam } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BsFillPostageHeartFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

function Profile() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
  const isConfirmed = window.confirm("Are you sure you want to log out?");
  if (isConfirmed) {
    dispatch(logout());
    navigate("/");
  }
};

  const sidebar = [
    { path: "/", icon: <MdHomeFilled />, title: "Main" },
    { path: "/addpost", icon:  <MdLibraryAdd/>, title: "UploadPost" },
    { path: "/profile", icon: <FaGrinBeam />, title: "Profile" },
    { path: "/mypost", icon: <BsFillPostageHeartFill />, title: "MyPost" },
  ];
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
<>      {!isMobile && (
        <div className="w-auto hidden sm:flex flex-col justify-between p-5 rounded-r-lg">
          {/* Sidebar Items */}
          <div className="space-y-2">
            {sidebar.map((item) => (
              <Link key={item.path} to={item.path}>
                <div
                  className={`flex items-center gap-5 px-5 py-3 rounded-lg transition-all duration-300 ${
                    location.pathname === item.path
                      ? "bg-gray-800 text-[#ff6600] shadow-lg"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                </div>
              </Link>
            ))}
          </div>

          {/* Logout Button */}
          <div
            onClick={handleLogout}
            className="flex items-center gap-4 px-5 py-3 rounded-lg cursor-pointer text-red-500 hover:bg-red-700 hover:text-white transition-all duration-300"
          >
            <RiLogoutCircleRLine size={22} />
            <h2 className="text-lg font-semibold">Logout</h2>
          </div>
        </div>
      )}


      {isMobile && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-900 shadow-lg flex justify-around items-center py-3 border-t border-gray-700">
          {sidebar.map((item) => (
            <Link key={item.path} to={item.path}>
              <div
                className={`flex flex-col items-center text-gray-400 transition-all duration-300 ${
                  location.pathname === item.path
                    ? "text-yellow-400"
                    : "hover:text-white"
                }`}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.title}</span>
              </div>
            </Link>
          ))}


          <div
            onClick={handleLogout}
            className="flex flex-col items-center text-red-500 transition-all duration-300 hover:text-red-700 cursor-pointer"
          >
            <RiLogoutCircleRLine size={22} />
            <span className="text-xs mt-1">Logout</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
