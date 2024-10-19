import homebanner1 from "../assets/home/1.png";
import homebanner3 from "../assets/home/2.png";
import homebanner2 from "../assets/home/22.png";
import { useAuth } from "../store/auth";
import bgImage from "../assets/background/home background.avif";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import video from "../assets/media/website-Description.mp4"
function VideoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖️
        </button>
        <div className="aspect-w-16 aspect-h-9">
          <video
            width="100%"
            height="315"
            controls
            src={video}
            className="rounded-lg"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}


function HeroSection() {
  const { user } = useAuth();
  const banners = [homebanner1, homebanner2, homebanner3];
  const [currentBanner, setCurrentBanner] = useState(0);
  const [fade, setFade] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
        setFade(true);
      }, 1000);
    }, 30000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <>
      <section
        className="mx-auto max-w-full"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="relative mx-auto max-w-screen-xl px-4 pt-10 sm:px-6 lg:flex lg:items-center lg:px-12 lg:justify-between">
          <div className="max-w-xl text-left ltr:sm:text-left rtl:sm:text-right">
            <p className="text-lg font-semibold text-primary italic">
              Step into, {user ? user.username : "Arya Singh"}
            </p>
            <h1 className="text-3xl font-extrabold lg:text-5xl Textgradient">
              A Doctor's Diary
              <strong className="block font-extrabold text-gradient lg:pt-3">
                for a Healthier Tomorrow
              </strong>
            </h1>
            <p className="mt-4 max-w-lg sm:text-xl/relaxed text-gray-500">
              We are excited to introduce India's first Lowest free online
              health discussion platform, which will soon enhance access to
              healthcare. This service will provide expert medical advice, lab
              test-supported care, and the convenience of receiving assistance
              from the comfort of your home, office, or anywhere else, all at no
              cost.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <Link
                to="/doctorConsultant"
                className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
              >
                Get Started
              </Link>
              <Link
                to="#"
                onClick={() => setIsModalOpen(true)}
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-primary shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
              >
                📹 Watch
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={banners[currentBanner]}
              alt="Banner"
              className={`w-[350px] h-[350px] lg:h-[450px] lg:w-[550px] transition-opacity duration-500 ease-in-out ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>

        <div className="flex gap-40 items-center mb-8 p-3 border absolute top-16 ">
          <marquee behavior="" direction="">
            <p className="mr-48 inline-block text-lg text-gray-700 font-semibold">
              ☎️ +91-95998149103
            </p>
            <p className="mr-48 inline-block text-lg text-gray-700 font-semibold">
              🕥 Working Hour : 24* 7
            </p>
            <p className="mr-48 inline-block text-lg text-gray-700 font-semibold">
              📧 help@adoctorsdiary.com
            </p>
            <p className="mr-48 inline-block text-lg text-gray-700 font-semibold">
              ☎️ +91-7897173138
            </p>
          </marquee>
        </div>
      </section>
      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default HeroSection;
