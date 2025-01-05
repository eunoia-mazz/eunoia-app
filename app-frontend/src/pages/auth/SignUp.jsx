import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaGoogle, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required("Full Name is required"),
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
          <div className="flex w-full mb-5">
            <button 
              onClick={() => navigate('/auth/login')}
              className="flex-1 py-3 px-6 rounded-full transition-all duration-200 text-white hover:bg-white/20"
            >
              Sign In
            </button>
            <button 
              className="flex-1 py-3 px-6 rounded-full bg-blue-700 text-white transition-all duration-200"
            >
              Sign Up
            </button>
          </div>

          <h1 className="text-2xl font-semibold text-center mb-2 text-white">WELCOME TO EUNOIA!</h1>
          <h6 className="text-sm font-semibold text-center mb-8 text-white">AI Powered Mental Health Support Platform</h6>

          <Formik
            initialValues={{ fullName: "", email: "", password: "", confirmPassword: "" }}
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
                    name="fullName"
                    placeholder="Full Name"
                    className={`w-full pl-14 pr-6 py-3 rounded-full border-none bg-white shadow-md focus:outline-none focus:ring-2 ${
                      errors.fullName && touched.fullName ? 'focus:ring-red-300' : 'focus:ring-blue-300'
                    }`}
                  />
                  <ErrorMessage name="fullName" component="p" className="text-red-500 text-sm mt-1 ml-4" />
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
                  Sign Up
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <a href="./auth/login" className="text-blue-600 hover:underline">Sign In</a>
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
