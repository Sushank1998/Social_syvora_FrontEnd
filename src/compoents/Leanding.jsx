import React, { useState } from 'react'
import Addpost from './Addpost'
import { MdLibraryAdd } from "react-icons/md";
import { Outlet } from 'react-router-dom';

function Leanding() {
  const [add,setAdd] = useState(false)
  return (
    <>
    <div className='flex flex-col items-center justify-cente'>
      {add ?<Addpost setAdd={setAdd}/>: <MdLibraryAdd className='text-[#ff6600] text-2xl cursor-pointer' size={24} onClick={()=>setAdd(true)}/>}
    </div>
    <Outlet/>
  
    </>
  )
}

export default Leanding
