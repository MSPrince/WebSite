import React from "react";
import bgImage from "../assets/home background.avif";

function ResetPassword() {
  return (
    <div
      className="mx-auto max-w-full px-2 sm:px-6 lg:px-8 text-justify"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Reset Your Password
          </h2>
          <p className="text-gray-700 mb-6">
            If you've forgotten your password, don't worry! You can easily reset
            it by following these steps:
          </p>
          <ul className="list-disc list-inside text-left mb-6">
            <li>Click the "Forgot Password?" link on the login page.</li>
            <li>Enter your registered email address.</li>
            <li>Check your inbox for the password reset email.</li>
            <li>Follow the link in the email to set a new password.</li>
          </ul>
          <p className="text-gray-700 mb-4">
            If you need further assistance, feel free to contact our support
            team.
          </p>
          <p className="font-semibold text-lg text-primary">
            Call us at:{" "}
            <a href="tel:+919598149103" className="underline">
              9598149103
            </a>
          </p>
          <p className="text-gray-600 mt-4">
            Alternatively, you can reach out to the admin via email or through
            our contact form.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
