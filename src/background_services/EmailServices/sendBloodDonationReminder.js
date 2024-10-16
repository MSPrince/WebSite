const ejs = require("ejs");
const dotenv = require("dotenv");
const Donor = require("../models/Donor");
const sendMail = require("../helpers/sendmail");

dotenv.config();

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

const sendBloodDonationReminder = async () => {
  const donors = await Donor.find();
  if (donors.length > 0) {
    for (let donor of donors) {
      // calculate the difference between donor date and today's date
      const donorDate = new Date(donor.date);
      const today = new Date();
      const diffTime = Math.abs(today - donorDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Use Math.ceil for rounding up

      if (diffDays > 60) {
        ejs.renderFile(
          "templates/BloodDonationReminder.ejs",
          {
            name: donor.name,
            date: donor.date,
          },
          async (err, data) => {
            if (err) {
              console.error("Error rendering email template:", err);
              return;
            }

            const messageOption = {
              from: process.env.EMAIL,
              to: donor.email,
              subject: "Hello, Doctor's Diary Blood Donor.",
              html: data,
            };

            try {
              await sendMail(messageOption);
              const formattedDate = formatDate(today);
              // Update the donor's date, if this is the intended logic
              await Donor.findByIdAndUpdate(donor._id, {
                $set: { date: formattedDate }, // Change the date only if intended
              });
            } catch (error) {
              console.log("Error sending email:", error);
            }
          }
        );
      }
    }
  }
};

module.exports = { sendBloodDonationReminder };
