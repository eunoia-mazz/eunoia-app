// import React from "react";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import personHoldingKey from "../../assets/Images/resetPassword.png";
// import { Helmet } from "react-helmet";

// const ResetPassword = () => {
//   const validationSchema = Yup.object({
//     email: Yup.string()
//       .email("Invalid email address")
//       .required("Email is required"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 characters")
//       .required("Password is required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password"), null], "Passwords must match")
//       .required("Confirm Password is required"),
//   });

//   return (
//     <>
//       <Helmet>
//         <title>Reset Password | Eunoia</title>
//         <meta
//           name="description"
//           content="Manage therapists on the MindfulMe platform"
//         />
//       </Helmet>
//       <div className="min-h-screen bg-[url('/src/assets/Images/herobg6.webp')] bg-no-repeat object-contain flex justify-center items-center w-full ">
//         <div className="flex justify-end items-center w-11/12">
//           <div
//             style={{
//               background: "rgba( 255, 255, 255, 0.35 )",
//               "box-shadow": "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
//               "backdrop-filter": "blur( 10px )",
//               "-webkit-backdrop-filter": "blur( 13px )",
//               "border-radius": "10px",
//               border: "1px solid rgba( 255, 255, 255, 0.18 )",
//             }}
//             className="border  border-white/18 rounded-[10px] p-6 max-w-md w-2/3 "
//           >
//             <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
//               Reset Password
//             </h2>

//             <Formik
//               initialValues={{ email: "", password: "", confirmPassword: "" }}
//               validationSchema={validationSchema}
//               onSubmit={(values) => {
//                 console.log("Form submitted with values:", values);
//               }}
//             >
//               <Form>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="email"
//                     className="block font-semibold text-sm text-blue-500 mb-2"
//                   >
//                     Email Address
//                   </label>
//                   <Field
//                     type="email"
//                     id="email"
//                     name="email"
//                     className="w-full px-4 py-2 rounded-md bg-white bg-opacity-70 text-black border border-gray-300 focus:outline-none focus:border-blue-500"
//                     placeholder="Enter your email"
//                   />
//                   <ErrorMessage
//                     name="email"
//                     component="div"
//                     className="text-red-500 text-xs mt-1"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label
//                     htmlFor="password"
//                     className="block font-semibold text-sm text-blue-500 mb-2"
//                   >
//                     New Password
//                   </label>
//                   <Field
//                     type="password"
//                     id="password"
//                     name="password"
//                     className="w-full px-4 py-2 rounded-md bg-white bg-opacity-70 text-black border border-gray-300 focus:outline-none focus:border-blue-500"
//                     placeholder="Enter new password"
//                   />
//                   <ErrorMessage
//                     name="password"
//                     component="div"
//                     className="text-red-500 text-xs mt-1"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label
//                     htmlFor="confirmPassword"
//                     className="block font-semibold text-sm text-blue-500 mb-2"
//                   >
//                     Confirm Password
//                   </label>
//                   <Field
//                     type="password"
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     className="w-full px-4 py-2 rounded-md bg-white bg-opacity-70 text-black border border-gray-300 focus:outline-none focus:border-blue-500"
//                     placeholder="Confirm your password"
//                   />
//                   <ErrorMessage
//                     name="confirmPassword"
//                     component="div"
//                     className="text-red-500 text-xs mt-1"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
//                 >
//                   Submit
//                 </button>
//               </Form>
//             </Formik>
//           </div>
//           <div className="w-1/3">
//             <img
//               src={personHoldingKey}
//               alt=""
//               className="w-[500px] h-[500px]"
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ResetPassword;

import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaGoogle, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
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
    console.log("Sign Up successful:", values);
    navigate("/dashboard");
  };

  return (
    <div className="bg-[url('/src/assets/Images/bg-login.png')] bg-cover bg-center">
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/30 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl w-[500px]">
          <h1 className="text-2xl font-bold text-center my-8  text-blue-500">
            RESET PASSWORD!
          </h1>

          <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">
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
                    className="font-normal text-red-500 text-sm mt-1 ml-4"
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
                    className="font-normal text-red-500 text-sm mt-1 ml-4"
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
                    className="font-normal text-red-500 text-sm mt-1 ml-4"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white text-lg font-medium rounded-full hover:bg-blue-700 transition-colors shadow-lg mt-6"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>

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

export default ResetPassword;
