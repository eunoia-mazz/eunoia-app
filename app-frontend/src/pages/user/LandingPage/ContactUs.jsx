import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PlaceIcon from "@mui/icons-material/Place";
import { SocialIcon } from "react-social-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function ContactUs() {
  // Initial Values
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };
  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  });
  // Submit Handler
  const onSubmit = (values, { resetForm }) => {
    console.log("Form Data", values);
    alert("Form Submitted Successfully!");
    resetForm();
  };
  return (
    <div className="w-full bg-gray-300 flex justify-center items-center py-10">
      <div className="w-[80%] flex flex-col  md:flex-row justify-center rounded-xl bg-white py-10 items-center">
        <div className="md:w-1/2 flex justify-start items-center">
          <div className="h-[80%] md:w-[80%]  text-white rounded-xl bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 md:relative md:-left-8 p-5 flex flex-col gap-4">
            <div className="font-semibold text-2xl">Contact Us</div>
            <div className="flex gap-2">
              <EmailIcon />
              <p className="font-normal text-base">eunoia@gmail.com</p>
            </div>
            <div className="flex gap-2">
              <WhatsAppIcon />
              <p className="font-normal text-base">0306-5187343</p>
            </div>
            <div className="flex gap-2">
              <LocalPhoneIcon />
              <p className="font-normal text-base">0322-8696218</p>
            </div>
            <div className="flex gap-2">
              <PlaceIcon />
              <p className="font-normal text-base">Lahore, Pakistan</p>
            </div>
            <div className="flex gap-2 justify-center">
            <SocialIcon
                url="https://linkedin.com/company/eunoia-app"
                fgColor="white"
              />
              <SocialIcon url="https://instagram.com/eunoia_mazz" fgColor="white" />
              {/* <SocialIcon
                url="https://twitter.com/in/jaketrent"
                fgColor="white"
              /> */}
              <SocialIcon
                url="https://facebook.com/p/eunoia-mental-health-support-platform-61568029558660/"
                fgColor="white"
              />
              {/* <SocialIcon
                url="https://upwork.com/in/jaketrent"
                fgColor="white"
              /> */}
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="md:w-[80%] flex flex-col gap-2">
            <p className="text-center max-md:pt-5 font-semibold text-3xl text-blue-900">
              Healing begins with reaching out
            </p>
            <p className="text-center">
              We're here to listen, guide, and support.
            </p>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {() => (
                <Form className="space-y-4 px-3">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block font-medium">
                      Name
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block font-medium">
                      Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block font-medium">
                      Message
                    </label>
                    <Field
                      as="textarea"
                      id="message"
                      name="message"
                      rows="5"
                      placeholder="Write your message"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
