import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice"; 
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function AuthPage() {
  const [isLogin, setLogin] = useState(true);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      {isLogin ? (
        <LoginForm setLogin={setLogin} onLogin={() => dispatch(login())} />
      ) : (
        <SignupForm setLogin={setLogin} />
      )}
    </div>
  );
}

export default AuthPage;
