import React, { useEffect, useRef } from "react";
import DoctorConsultationHeroSection from "./doctor consultation/DoctorConsultationHeroSection";
import SpecialityMenu from "./doctor consultation/SpecialityMenu";
import TopDoctors from "./doctor consultation/TopDoctors";
import Banner from "../components/doctor_consultant/Banner";
function DoctorConsultant() {
     useEffect(() => {
       window.scrollTo(0, 0), (document.title = "Doctor Consultant");
     }, []);
  return (
<>
<DoctorConsultationHeroSection/>
<SpecialityMenu/>
<TopDoctors/>
<Banner/>
</>
  );
}

export default DoctorConsultant;
