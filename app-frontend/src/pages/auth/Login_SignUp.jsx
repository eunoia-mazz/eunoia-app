import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import { Helmet } from "react-helmet";
function Login_SignUp() {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  function showloginForm() {
    setShowLogin(true);
    setShowRegister(false);
  }
  function showRegisterForm() {
    setShowLogin(false);
    setShowRegister(true);
  }
  return (
    <>
      <Helmet>
        <title>Authentication | Eunoia</title>
        <meta
          name="description"
          content="Manage therapists on the Eunoia platform"
        />
      </Helmet>
      <div className="w-full flex justify-center items-center bg-[url('/src/assets/Images/authbg3.png')] object-cover">
        <div className="w-2/5 py-10 ">
          <div className="w-full text-blue-500 font-bold text-2xl">
            <button
              className="w-1/2 rounded-ss-xl py-3 "
              onClick={showloginForm}
            >
              LOGIN
            </button>
            <button
              className="w-1/2 rounded-se-xl py-3 "
              onClick={showRegisterForm}
            >
              REGISTER
            </button>
          </div>
          <div className="w-full">
            {showLogin && <Login showRegisterForm={showRegisterForm} />}
            {showRegister && <SignUp showLoginForm={showloginForm} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login_SignUp;
