const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const dbConnection = require("./utils/db");
const cron = require("node-cron");
const {
  sendDetailsProspectEmail,
} = require("./EmailServices/sendDetailsProspect");
const {
  sendEligibilityEmail,
} = require("./EmailServices/sendEligibilityEmail");
const {
  sendDonorDetailsEmail,
} = require("./EmailServices/sendDonorDetailsEmail");
const {
  sendBloodDonationReminder,
} = require("./EmailServices/sendBloodDonationReminder");

// SERVER
const PORT = process.env.PORT;

// Error Handling for Cron Jobs
const run = () => {
  cron.schedule("* * * * *", async () => {
    try {
      console.log("Running scheduled tasks every minute...");
      await sendDetailsProspectEmail();
      await sendEligibilityEmail();
      await sendBloodDonationReminder();
      await sendDonorDetailsEmail();
    } catch (error) {
      console.error("Error in scheduled tasks:", error);
    }
  });
};

run();

app.listen(PORT, () => {
  console.log(`Background services are running on ${PORT}`);
  dbConnection();
});
