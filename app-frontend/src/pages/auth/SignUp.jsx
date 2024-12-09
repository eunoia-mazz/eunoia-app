import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
function SignUp() {
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
  return (
    <div className="min-h-screen bg-[url('/src/assets/Images/herobg6.webp')] bg-no-repeat object-contain flex justify-center items-center w-full ">
      <div className="flex justify-end items-center w-11/12">
        <div
          style={{
            background: "rgba( 255, 255, 255, 0.35 )",
            "box-shadow": "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            "backdrop-filter": "blur( 10px )",
            "-webkit-backdrop-filter": "blur( 13px )",
            "border-radius": "10px",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
          }}
          className="border  border-white/18 rounded-[10px] p-6 max-w-md w-2/3 "
        >
          <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
            Reset Password
          </h2>

          <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("Form submitted with values:", values);
            }}
          >
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block font-semibold text-sm text-blue-500 mb-2"
                >
                  Email Address
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 rounded-md bg-white bg-opacity-70 text-black border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block font-semibold text-sm text-blue-500 mb-2"
                >
                  New Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 rounded-md bg-white bg-opacity-70 text-black border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Enter new password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block font-semibold text-sm text-blue-500 mb-2"
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full px-4 py-2 rounded-md bg-white bg-opacity-70 text-black border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Confirm your password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Submit
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
