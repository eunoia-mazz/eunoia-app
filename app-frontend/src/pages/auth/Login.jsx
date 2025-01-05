import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaGoogle, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values) => {
    console.log("Login successful:", values);
    navigate("/dashboard"); // Redirect after login
  };

  return (
    <div className="bg-[url('/src/assets/Images/bg-login.png')] bg-cover bg-center min-h-screen flex items-center justify-center">
      <div className="bg-white/30 backdrop-blur-xl p-8 rounded-[2rem] shadow-xl w-[500px]">
        <div className="flex w-full mb-5">
          <button
            className="flex-1 py-3 px-6 rounded-full transition-all duration-200 bg-inherit text-white hover:bg-transparent"
          >
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
                  className="text-red-500 text-sm mt-1"
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
                  className="text-red-500 text-sm mt-1"
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
                <a href="./reset-password" className="text-sm text-blue-600 hover:underline">
                  Forgot Password
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white text-lg font-medium rounded-full hover:bg-blue-700 transition-colors shadow-lg"
              >
                Sign In
              </button>
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
