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
        user.role == "admin"
          ? navigate("/admin/dashboard")
          : navigate("/dashboard");
      })
      .catch((err) => {
        const errorMsg = err.response.data.error;
        setErrorMessage(errorMsg);
      });
  };

  const validationSchema = Yup.object({
    fname: Yup.string().required("First Name is required"),
    lname: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirm_password: Yup.string()
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
              fname: "",
              lname: "",
              email: "",
              password: "",
              confirm_password: "",
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
                    name="fname"
                    placeholder="First Name"
                    className={`w-full pl-14 pr-6 py-3 rounded-full border-none bg-white shadow-md focus:outline-none focus:ring-2 ${
                      errors.fullName && touched.fullName
                        ? "focus:ring-red-300"
                        : "focus:ring-blue-300"
                    }`}
                  />
                  <ErrorMessage
                    name="fname"
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
                    name="lname"
                    placeholder="Last Name"
                    className={`w-full pl-14 pr-6 py-3 rounded-full border-none bg-white shadow-md focus:outline-none focus:ring-2 ${
                      errors.fullName && touched.fullName
                        ? "focus:ring-red-300"
                        : "focus:ring-blue-300"
                    }`}
                  />
                  <ErrorMessage
                    name="lname"
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
                    name="confirm_password"
                    placeholder="Confirm Password"
                    className={`w-full pl-14 pr-6 py-3 rounded-full border-none bg-white shadow-md focus:outline-none focus:ring-2 ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "focus:ring-red-300"
                        : "focus:ring-blue-300"
                    }`}
                  />
                  <ErrorMessage
                    name="confirm_password"
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

          {/* <div className="mt-4 text-center text-gray-500">Or</div> */}

          {/* <div className="mt-6 grid grid-cols-2 gap-4">
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
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
