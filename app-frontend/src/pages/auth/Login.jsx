// import React from "react";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { Link, NavLink } from "react-router-dom";
// import { Mail, Lock } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";

// const Login = ({ showRegisterForm }) => {
//   const validationSchema = Yup.object({
//     email: Yup.string()
//       .email("Invalid email address")
//       .required("Email is required"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 characters")
//       .required("Password is required"),
//   });

//   const handleSubmit = (values) => {
//     console.log("Form submitted with values:", values);
//   };

//   return (
//     <div
//       style={{
//         background: "rgba( 255, 255, 255, 0.35 )",
//         boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
//         backdropFilter: "blur( 10px )",
//         border: "1px solid rgba( 255, 255, 255, 0.18 )",
//       }}
//       className="flex flex-col items-center p-4 rounded-b-xl"
//     >
//       <div className="w-full max-w-md space-y-6">
//         <div className="-space-y-4">
//           <h1 className="text-2xl font-bold text-center text-blue-500 mb-8">
//             Welcome Back !
//           </h1>
//           <p className="text-base font-normal text-center">
//             Don't have an account?
//             <NavLink onClick={showRegisterForm} className="no-underline">
//               {" "}
//               Sign Up
//             </NavLink>
//           </p>
//         </div>

//         <Formik
//           initialValues={{ email: "", password: "" }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           <Form>
//             <div className="space-y-4">
//               <div className="relative">
//                 <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <Field
//                   type="email"
//                   name="email"
//                   placeholder="Email Address"
//                   className="px-10 bg-white/90 h-12 w-full border rounded-md"
//                 />
//                 <ErrorMessage
//                   name="email"
//                   component="div"
//                   className="text-red-500 text-xs mt-1"
//                 />
//               </div>

//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <Field
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   className="px-10 bg-white/90 h-12 w-full border rounded-md"
//                 />
//                 <ErrorMessage
//                   name="password"
//                   component="div"
//                   className="text-red-500 text-xs mt-1"
//                 />
//               </div>

//               <div className="flex items-center justify-between">
//                 <Link
//                   to="/forgot-password"
//                   className="text-sm text-red-400 no-underline"
//                 >
//                   Forgot Password
//                 </Link>
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700"
//               >
//                 Sign In
//               </Button>
//             </div>
//           </Form>
//         </Formik>

//         <div className="relative my-6">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-black/20"></div>
//           </div>
//           <div className="relative flex justify-center text-sm">
//             <span className="px-2 text-white bg-blue-500">Or</span>
//           </div>
//         </div>

//         {/* Social Login Buttons */}
//         <div className="grid grid-cols-2 gap-4">
//           <Button variant="outline" className="bg-white text-black ">
//             <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//               <path
//                 fill="#4285F4"
//                 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//               />
//               <path
//                 fill="#34A853"
//                 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//               />
//               <path
//                 fill="#FBBC05"
//                 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//               />
//               <path
//                 fill="#EA4335"
//                 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//               />
//             </svg>
//             Google
//           </Button>
//           <Button variant="outline" className="bg-white text-black ">
//             <svg
//               className="w-5 h-5 mr-2 text-[#1877F2]"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
//             </svg>
//             Facebook
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaGoogle, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useStore from "../../useStore";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const updateClientId = (newId) => {
    useStore.getState().setClientId(newId);
  };
  const updateClientName = (newName) => {
    useStore.getState().setFirstName(newName);
  };
  const [errorMessage, setErrorMessage] = useState("");
  const setIsAdmin = useStore((state) => state.setIsAdmin);
  const setLastName = useStore((state) => state.setLastName);
  const loginUser = (values) => {
    axios
      .post(`http://localhost:5000/login`, values)
      .then((res) => {
        console.log(res);
        const user = res.data.user;
        console.log(user.id);
        // setClientId(user.id);
        // setFirstName(user.first_name);
        setIsAdmin(user.admin);
        setLastName(user.last_name);
        updateClientId(user.id);
        updateClientName(user.first_name);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        const errorMsg = err.response.data.error;
        setErrorMessage(errorMsg);
      });
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values) => {
    loginUser(values);
  };

  return (
    <div className="bg-[url('/src/assets/Images/bg-login.png')] bg-cover bg-center min-h-screen flex items-center justify-center">
      <div className="bg-white/30 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl w-[500px]">
        <div className="flex w-full mb-5">
          <button className="flex-1 py-3 px-6 rounded-full transition-all duration-200 bg-inherit text-white hover:bg-transparent">
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="flex-1 py-3 px-6 rounded-full transition-all duration-200 bg-blue-700 text-white hover:bg-white/20"
          >
            Sign Up
          </button>
        </div>

        <h1 className="text-2xl font-semibold text-center mb-2 text-white">
          WELCOME BACK!
        </h1>
        <h6 className="text-sm font-semibold text-center mb-8 text-white">
          AI Powered Mental Health Support Platform
        </h6>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-5">
              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className={`w-full pl-14 pr-6 py-3 rounded-full border-none bg-white shadow-md focus:outline-none focus:ring-2 ${
                    errors.email && touched.email
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-300"
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-xs font-normal mt-1"
                />
              </div>

              <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={`w-full pl-14 pr-6 py-3 rounded-full border-none bg-white shadow-md focus:outline-none focus:ring-2 ${
                    errors.password && touched.password
                      ? "focus:ring-red-500"
                      : "focus:ring-blue-300"
                  }`}
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-xs font-normal mt-1"
                />
              </div>

              <div className="flex items-center justify-between px-2">
                <label className="flex items-center space-x-2">
                  <Field
                    type="checkbox"
                    name="rememberMe"
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <a
                  // target="_blank"
                  href="./forgot-password"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white text-lg font-medium rounded-full hover:bg-blue-700 transition-colors shadow-lg"
              >
                Sign In
              </button>
              {errorMessage && (
                <p className="text-red-500 text-sm font-normal text-center">
                  {errorMessage}
                </p>
              )}
            </Form>
          )}
        </Formik>

        <div className="mt-6 text-center text-gray-500">Or</div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-full hover:bg-gray-50">
            <FaGoogle className="text-red-500" />
            <span>Google</span>
          </button>
          <button className="flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-full hover:bg-gray-50">
            <FaFacebook className="text-blue-600" />
            <span>Facebook</span>
          </button>
          <button className="flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-full hover:bg-gray-50">
            <FaLinkedin className="text-blue-700" />
            <span>LinkedIn</span>
          </button>
          <button className="flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-full hover:bg-gray-50">
            <FaGithub className="text-gray-900" />
            <span>GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
