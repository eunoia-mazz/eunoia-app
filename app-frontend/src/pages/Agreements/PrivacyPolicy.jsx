import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold text-center text-gray-900">
        Privacy Policy
      </h1>
      <p className="text-center text-gray-600  font-normal mt-2">
        <strong>Effective Date: 06-Jan-2025</strong>
      </p>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 pb-1">
          1. Information We Collect
        </h2>
        <p className="text-gray-700 text-base font-normal mt-2">
          {" "}
          We collect the following types of information:
          <ul className="list-disc list-inside mt-2 text-gray-700">
            <li>
              <strong className="font-bold">Personal Information:</strong> This
              includes your name, email, date of birth, gender, and other
              personal details you provide during sign-up or use of the app.
            </li>
            <li>
              <strong className="font-bold">Health Information:</strong>{" "}
              Information regarding your mood, emotional state, and journal
              entries, which you voluntarily share.
            </li>
            <li>
              <strong className="font-bold">Usage Data:</strong> We collect data
              about how you use the app, including activity logs and usage
              patterns.
            </li>
          </ul>
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 pb-1">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-700 text-base font-normal mt-2">
          {" "}
          We use your data for the following purposes:
          <ul className="list-disc list-inside mt-2 text-gray-700">
            <li>
              Personalizing your experience and providing mood tracking,
              sentiment analysis, and recommendations.
            </li>
            <li>Improving our services through analytics and usage data.</li>
            <li>Sending account updates and communications.</li>
            <li>Conducting research to improve app features.</li>
          </ul>
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 pb-1">
          3. Data Security
        </h2>
        <p className="text-gray-700 text-base font-normal mt-2">
          {" "}
          We use industry-standard security measures to protect your data. While
          no method of electronic transmission is 100% secure, we aim to
          safeguard your privacy.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 pb-1">
          4. Third-Party Services
        </h2>
        <p className="text-gray-700 text-base font-normal mt-2">
          {" "}
          We may use third-party services for features like sentiment analysis
          or AI recommendations. These services are governed by their own
          privacy policies.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 pb-1">
          5. Your Rights and Choices
        </h2>
        <p className="text-gray-700 text-base font-normal mt-2">
          {" "}
          You can access, modify, or delete your personal data through the app
          settings at any time.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 pb-1">
          6. Changes to This Privacy Policy
        </h2>
        <p className="text-gray-700 text-base font-normal mt-2">
          {" "}
          We may update this Privacy Policy from time to time. Significant
          changes will be communicated to users, and we encourage periodic
          review of this policy.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 pb-1">
          Contact Us
        </h2>
        <p className="text-gray-700 text-base font-normal mt-2">
          {" "}
          If you have any questions, please contact us at{" "}
          <a
            href="mailto:teams.eunoia.ai@gmail.com"
            className="no-underline text-blue-600"
          >
            teams.eunoia.ai@gmail.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
