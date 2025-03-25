import React, { useState } from 'react';
import Addpost from './Addpost';
import { MdLibraryAdd } from "react-icons/md";
import { Outlet, useLocation } from 'react-router-dom'; // Use useLocation hook

function Leanding() {
  const [add, setAdd] = useState(false);

  // Use useLocation hook to access the current path
  const location = useLocation();

  // Check if the current page is '/profile'
  const isProfilePage = location.pathname === '/profile';

  return (
    <>
      {!isProfilePage && (
        <div className="flex flex-col items-center justify-center">
          {add ? (
            <Addpost setAdd={setAdd} />
          ) : (
            <MdLibraryAdd
              className="text-[#ff6600] text-2xl cursor-pointer"
              size={24}
              onClick={() => setAdd(true)}
            />
          )}
        </div>
      )}
      
      {/* Render child routes using Outlet */}
      <Outlet />
    </>
  );
}

export default Leanding;
