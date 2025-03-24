
import { useSelector, useDispatch } from "react-redux";
import { login,  } from "../features/authSlice"
import AuthPage from './AuthPage'
import Home from './Home'

function Layout() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  return (
    <>
    <div className="min-h-screen bg-black ">
      {isAuthenticated ? <Home /> : <AuthPage onLogin={() => ( sessionStorage.removeItem("user"),dispatch(login()))} />}
    </div>
     
    </>
  )
}

export default Layout
