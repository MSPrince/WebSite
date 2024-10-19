import React from "react";
import bgImage from "../assets/background/home background.avif";

function Homecomplete() {
  return (
    <div
      className="mx-auto px-4 sm:px-6 lg:px-8 pb-6 mt-[-10px]"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 pt-10">
        {/* seo part */}
        <div className="bg-white/20">
          <p className="text-sm lg:text-lg font-semibold text-primary">
            Looking for a trusted & secured online dr consultation in India?
          </p>

          <p className="text-sm lg:text-[16px] leading-6 text-gray-700">
            Consult a doctor online on A Doctor’s Diary for any health concern.
            Our pool of over 20,000 trusted doctors across 25+ specialties will
            ensure all your health queries are answered. You can get online dr
            advice from a Psychiatrist, Dermatologist, Gynecologist, Sexologist,
            Pediatrician, Cardiologist, Neurologist, Gastroenterologist,
            Urologist, Endocrinologist, Dentist, Psychologist, and many more.
            Video consultation with a doctor is available only on A Doctor’s
            Diary's online doctor app.
          </p>

          <p className="text-md text-gray-700">
            A Doctor’s Diary serves customers in the following cities:
            Bangalore, Mumbai, Delhi, Kolkata, Hyderabad, Chennai, Pune,
            Ahmedabad, Gurgaon, and Ghaziabad.
          </p>

          <h5 className="text-lg font-semibold text-primary">
            Recently Answered Questions:
          </h5>
          <p className="text-sm lg:text-[16px] leading-6 text-gray-700">
            Olanzapine + risperdone | Pcos and pregnancy | Doctor prescribed me
            steroids for acne | Pregnancy through fingers | Protein powder after
            c section | Injury of gums due to a fall | Chest Injury | BP spike
            up
          </p>

          <h5 className="text-lg font-semibold text-primary">Topics:</h5>
          <p className="text-sm lg:text-[16px] leading-6 text-gray-700">
            Looking for weight gain tips? | Worried about chest pain? | Want to
            get rid of dark circles? | How to use prega news kit? | Need some
            weight loss advice? | Work, family or relationship stress? | Looking
            to improve digestion? | Painful kidney stones? | Need some sexual
            advice? | Want to learn how to last longer? | Seek help for lower
            back pain | Need some advice for irregular periods? | Ask how you
            can relieve throat pain | Need help with frequent urination? | Have
            trouble breathing? | Need some dental advice? | Want to get rid of
            acne scars? | Stomach pain bothering you? | Doubts about periods?
          </p>

          <h5 className="text-lg font-semibold text-primary">Specialities:</h5>
          <p className="text-sm lg:text-[16px] leading-6  text-gray-700">
            Ask A Psychiatrist | Ask A Dermatologist | Ask A Sexologist | Ask A
            Gynecologist | Ask A General Physician Doctor | Ask A Pediatrician
            Doctor | Ask An Ear Nose Throat Doctor | Ask A Kidney Urine Doctor |
            Ask An Orthopedic Doctor | Ask A Neurologist Doctor
          </p>
        </div>
      </div>
    </div>
  );
}

export default Homecomplete;
