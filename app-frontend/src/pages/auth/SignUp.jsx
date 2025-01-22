// import React from "react";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { Mail, Lock, User, LockKeyhole } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@mui/material";
// import { NavLink } from "react-router-dom";

// const Signup = ({ showLoginForm }) => {
//   const validationSchema = Yup.object({
//     fullName: Yup.string().required("Full Name is required"),
//     email: Yup.string()
//       .email("Invalid email address")
//       .required("Email Address is required"),
//     password: Yup.string()
//       .min(8, "Password must be at least 8 characters")
//       .required("Password is required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password"), null], "Passwords must match")
//       .required("Confirm Password is required"),
//   });

//   return (
//     <div
//       style={{
//         background: "rgba(255, 255, 255, 0.35)",
//         boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
//         backdropFilter: "blur(10px)",
//         WebkitBackdropFilter: "blur(13px)",
//         border: "1px solid rgba(255, 255, 255, 0.18)",
//       }}
//       className="flex flex-col items-center p-4 rounded-b-xl"
//     >
//       <div className="w-full max-w-md space-y-6">
//         <div className="-space-y-4">
//           <h1 className="text-2xl font-bold text-center text-blue-500 mb-8">
//             Join now for Emotional Clarity.
//           </h1>
//           <p className="text-base font-normal text-center">
//             Already have an account?
//             <NavLink onClick={showLoginForm} className="no-underline">
//               {" "}
//               Sign In
//             </NavLink>
//           </p>
//         </div>

//         <Formik
//           initialValues={{
//             fullName: "",
//             email: "",
//             password: "",
//             confirmPassword: "",
//           }}
//           validationSchema={validationSchema}
//           onSubmit={(values) => {
//             console.log("Form submitted with values:", values);
//           }}
//         >
//           <Form className="space-y-4">
//             <div className="relative">
//               <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//               <Field
//                 type="text"
//                 id="fullName"
//                 name="fullName"
//                 placeholder="Full Name"
//                 className="px-10 bg-white/90 h-12 w-full border rounded-md"
//               />
//               <ErrorMessage
//                 name="fullName"
//                 component="div"
//                 className="text-red-500 text-xs mt-1"
//               />
//             </div>

//             <div className="relative">
//               <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 " />
//               <Field
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="Email Address"
//                 className="px-10 bg-white/90 h-12 w-full border rounded-md"
//               />
//               <ErrorMessage
//                 name="email"
//                 component="div"
//                 className="text-red-500 text-xs mt-1"
//               />
//             </div>

//             <div className="relative">
//               <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//               <Field
//                 type="password"
//                 id="password"
//                 name="password"
//                 placeholder="Password"
//                 className="px-10 bg-white/90 h-12 w-full border rounded-md"
//               />
//               <ErrorMessage
//                 name="password"
//                 component="div"
//                 className="text-red-500 text-xs mt-1"
//               />
//             </div>

//             <div className="relative">
//               <LockKeyhole className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//               <Field
//                 type="password"
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 placeholder="Confirm Password"
//                 className="px-10 bg-white/90 h-12 w-full border rounded-md"
//               />
//               <ErrorMessage
//                 name="confirmPassword"
//                 component="div"
//                 className="text-red-500 text-xs mt-1"
//               />
//             </div>
//             <div className="flex text-gray-600 items-center space-x-2">
//               <Checkbox id="TnC" />
//               <label
//                 htmlFor="TnC"
//                 className="text-sm font-medium  leading-none"
//               >
//                 I agree to the
//                 <NavLink to="/termsOfService" className="no-underline">
//                   {" "}
//                   Terms of Service
//                 </NavLink>{" "}
//                 and{" "}
//                 <NavLink to="/privacyPolicy" className="no-underline">
//                   Privacy Policy.
//                 </NavLink>
//               </label>
//             </div>

//             <Button
//               type="submit"
//               className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700"
//             >
//               Sign Up
//             </Button>

//             <div className="relative my-6">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-black/20"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 text-white bg-blue-500">Or</span>
//               </div>
//             </div>

//             {/* Social Login Buttons */}
//             <div className="grid grid-cols-2 gap-4 ">
//               <Button variant="outline" className="bg-white text-black ">
//                 <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//                   <path
//                     fill="#4285F4"
//                     d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                   />
//                   <path
//                     fill="#34A853"
//                     d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                   />
//                   <path
//                     fill="#FBBC05"
//                     d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                   />
//                   <path
//                     fill="#EA4335"
//                     d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                   />
//                 </svg>
//                 Google
//               </Button>
//               <Button variant="outline" className="bg-white text-black ">
//                 <svg
//                   className="w-5 h-5 mr-2 text-[#1877F2]"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
//                 </svg>
//                 Facebook
//               </Button>
//               {/* <Button variant="outline" className="bg-white text-black ">
//                 <svg
//                   className="w-5 h-5 mr-2 text-[#0A66C2]"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//                 </svg>
//                 LinkedIn
//               </Button>
//               <Button variant="outline" className="bg-white text-black ">
//                 <svg
//                   className="w-5 h-5 mr-2"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
//                 </svg>
//                 GitHub
//               </Button> */}
//             </div>
//           </Form>
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default Signup;
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaGoogle, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useStore from "../../useStore";
import axios from "axios";

function SignUp() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const updateClientId = (newId) => {
    useStore.getState().setClientId(newId);
  };
  const setIsAdmin = useStore((state) => state.setIsAdmin);
  const setFirstName = useStore((state) => state.setFirstName);
  const setLastName = useStore((state) => state.setLastName);
  const registerUser = (values) => {
    axios
      .post(`http://localhost:5000/signup`, values)
      .then((res) => {
        const user = res.data.user;
        // setClientId(user.id);
        updateClientId(user.id);
        setIsAdmin(user.admin);
        setFirstName(user.first_name);
        setLastName(user.last_name);
        navigate("/dashboard");
      })
      .catch((err) => {
        const errorMsg = err.response.data.error;
        setErrorMessage(errorMsg);
      });
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
    registerUser(values);
  };

  return (
    <div className="bg-[url('/src/assets/Images/bg-login.png')] bg-cover bg-center">
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/30 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl w-[500px]">
          <div className="flex w-full mb-5">
            <button
              onClick={() => navigate("/login")}
              className="flex-1 py-3 px-6 rounded-full transition-all duration-200 bg-blue-700 text-white hover:bg-white/20"
            >
              Sign In
            </button>
            <button className="flex-1 py-3 px-6 rounded-full bg-inherit hover:bg-transparent text-white transition-all duration-200">
              Sign Up
            </button>
          </div>

          <h1 className="text-2xl font-semibold text-center mb-2 text-white">
            WELCOME TO EUNOIA!
          </h1>
          <h6 className="text-sm font-semibold text-center mb-8 text-white">
            AI Powered Mental Health Support Platform
          </h6>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">
                <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                    <User className="w-5 h-5" />
                  </div>
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className={`w-full pl-14 pr-6 py-3 rounded-full border-none bg-white shadow-md focus:outline-none focus:ring-2 ${
                      errors.fullName && touched.fullName
                        ? "focus:ring-red-300"
                        : "focus:ring-blue-300"
                    }`}
                  />
                  <ErrorMessage
                    name="firstName"
                    component="p"
                    className="text-red-500 text-xs font-normal mt-1 ml-4"
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                    <User className="w-5 h-5" />
                  </div>
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className={`w-full pl-14 pr-6 py-3 rounded-full border-none bg-white shadow-md focus:outline-none focus:ring-2 ${
                      errors.fullName && touched.fullName
                        ? "focus:ring-red-300"
                        : "focus:ring-blue-300"
                    }`}
                  />
                  <ErrorMessage
                    name="fullName"
                    component="p"
                    className="text-red-500 text-xs font-normal mt-1 ml-4"
                  />
                </div>

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
                        ? "focus:ring-red-300"
                        : "focus:ring-blue-300"
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-xs font-normal mt-1 ml-4"
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
                        ? "focus:ring-red-300"
                        : "focus:ring-blue-300"
                    }`}
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-xs font-normal mt-1 ml-4"
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className={`w-full pl-14 pr-6 py-3 rounded-full border-none bg-white shadow-md focus:outline-none focus:ring-2 ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "focus:ring-red-300"
                        : "focus:ring-blue-300"
                    }`}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="text-red-500 text-xs font-normal mt-1 ml-4"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white text-lg font-medium rounded-full hover:bg-blue-700 transition-colors shadow-lg mt-6"
                >
                  Sign Up
                </button>
                {errorMessage && (
                  <p className="text-red-500 text-sm font-normal text-center">
                    {errorMessage}
                  </p>
                )}
              </Form>
            )}
          </Formik>

          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <a href="./login" className="text-blue-600 hover:underline">
              Sign In
            </a>
          </p>

          <div className="mt-4 text-center text-gray-500">Or</div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {[
              { icon: FaGoogle, label: "Google", color: "text-red-500" },
              { icon: FaFacebook, label: "Facebook", color: "text-blue-600" },
              { icon: FaLinkedin, label: "LinkedIn", color: "text-blue-700" },
              { icon: FaGithub, label: "GitHub", color: "text-gray-900" },
            ].map((btn, idx) => (
              <button
                key={idx}
                className="flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-full hover:bg-gray-50"
              >
                <btn.icon className={btn.color} />
                <span>{btn.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
