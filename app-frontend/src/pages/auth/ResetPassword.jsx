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
          <h1 className="text-2xl font-semibold text-center my-8 text-white">RESET PASSWORD!</h1>
    
          <Formik
            initialValues={{email: "", password: "", confirmPassword: "" }}
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
                      errors.email && touched.email ? 'focus:ring-red-300' : 'focus:ring-blue-300'
                    }`}
                  />
                  <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1 ml-4" />
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
                      errors.password && touched.password ? 'focus:ring-red-300' : 'focus:ring-blue-300'
                    }`}
                  />
                  <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1 ml-4" />
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
                      errors.confirmPassword && touched.confirmPassword ? 'focus:ring-red-300' : 'focus:ring-blue-300'
                    }`}
                  />
                  <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-sm mt-1 ml-4" />
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
