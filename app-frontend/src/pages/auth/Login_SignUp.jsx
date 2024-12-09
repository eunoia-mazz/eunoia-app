import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
function Login_SignUp() {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  return (
    <div className="w-full h-screen bg-[url('/src/assets/Images/authbg2.png')]">
      <div className="w-full">
        <div className="w-full">
          <button className="w-1/2">LOGIN</button>
          <button className="w-1/2">REGISTER</button>
        </div>
        {showLogin && <Login />}
        {showRegister && <SignUp />}
      </div>
    </div>
  );
}

export default Login_SignUp;
