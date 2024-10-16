import React from "react";
import Hero from "../../components/blood_donation/Hero";
import Featured from '../../components/blood_donation/Featured';
import Contact from "../../components/blood_donation/Contact";
// import DoctorConsultationHeroSection from "../doctor consultation/DoctorConsultationHeroSection";
import BloodDonationHeroSection from "../doctor consultation/BloodDonationHeroSection";

function HomeBloodDonation() {
  return (
    <div className="">
      <BloodDonationHeroSection />
      <Featured />

      <Contact />
    </div>
  );
}

export default HomeBloodDonation;
