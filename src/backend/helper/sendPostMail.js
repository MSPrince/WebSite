const nodemailer = require("nodemailer");

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL, // Email stored in environment variables
    pass: process.env.PASSWORD, // Password stored in environment variables
  },
});

// Function to send mail
const sendMail = async (to, subject, text, html) => {
  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: "doctorsdiary4india@gmail.com", // Sender address
      to:'maurya.prince06@gmail.com', // List of receivers
      subject, // Subject line
      text, // Plain text body
      html, // HTML body
    });

    console.log("Message sent: %s", info.messageId); // Log message ID if successful
  } catch (error) {
    console.error("Error sending email:", error); // Log any errors
  }
};

module.exports = { sendMail };
