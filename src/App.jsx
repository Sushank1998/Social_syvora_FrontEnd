import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layout/Layout'
import Profile from './pages/Profile'
import Post from './compoents/Post'
import MyPost from './pages/Mypost'
import Addpost from './compoents/Addpost'

function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Layout/>,
      children: [
        {
          path:"/",
          element:<Post/>
        },{
          path:'/profile',
          element:<Profile/>
        },
        {
          path:'/mypost',
          element:<MyPost/>
        },
        {
          path:'/addpost',
          element:<Addpost/>
        },
      ]
    }
  ])
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
