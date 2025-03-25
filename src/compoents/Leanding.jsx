
import Addpost from './Addpost';
import { MdLibraryAdd } from "react-icons/md";
import { Outlet,  } from 'react-router-dom'; // Use useLocation hook

function Leanding() {

  // Use useLocation hook to access the current path


  // Check if the current page is '/profile'

  return (
    <>

      {/* Render child routes using Outlet */}
      <Outlet />
    </>
  );
}

export default Leanding;
