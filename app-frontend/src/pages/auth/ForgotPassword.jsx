import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import confusedPerson from "../../assets/Images/forgotPassword.avif";

const ForgotPassword = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  return (
    <div className="min-h-screen bg-[url('/src/assets/Images/herobg6.webp')] bg-no-repeat object-contain flex justify-center items-center">
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
          className="border border-white/18 rounded-[10px] p-6 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
            Forgot Password
          </h2>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("Form submitted with:", values);
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
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Submit
              </button>
            </Form>
          </Formik>
        </div>
        <div className="w-1/3">
          <img
            src={confusedPerson}
            alt="Confused person"
            className="w-96 h-96"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
