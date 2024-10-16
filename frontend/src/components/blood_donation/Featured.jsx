import { useEffect } from "react";
import bgImage from "../../assets/background/home background.avif";

const Featured = () => {
     useEffect(() => {
       window.scrollTo(0, 0);
     }, []);
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className=""
    >
      <div className="flex flex-col lg:flex-row items-center lg:items-start px-4 sm:px-6 lg:px-[200px] pt-8 lg:pt-[70px] space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Text Section */}
        <div className="bg-gray-200 h-auto lg:h-[400px] w-full lg:w-[500px] z-10 mt-[20px] p-6 lg:p-10 rounded-md shadow-md">
          <h1 className="text-[20px] sm:text-[25px] font-semibold text-primary">
            Who we are?
          </h1>
          <hr className="bg-secondary w-[100px] sm:w-[150px] h-[3px] my-[10px] sm:my-[20px]" />
          <span className="block mb-4 text-[14px] sm:text-[16px]">
            Doctor's Diary is for public donation center with blood donation
            members in the changing health care system.
          </span>
          <ul className="text-[14px] sm:text-[16px]">
            <li className="mt-2 sm:mt-3">
              1. Specialist blood donors and clinical supervision.
            </li>
            <li className="mt-2 sm:mt-3">
              2. Increasing communication with our members.
            </li>
            <li className="mt-2 sm:mt-3">
              3. High quality assessment, diagnosis, and treatment.
            </li>
            <li className="mt-2 sm:mt-3">
              4. Examine critically to ensure alignment.
            </li>
            <li className="mt-2 sm:mt-3">
              5. The extra care of a multi-disciplinary team.
            </li>
          </ul>
        </div>

        {/* Video Section */}
        <div className="w-full lg:w-[500px] lg:ml-[-30px] h-auto overflow-hidden">
          <video
            src="/video.mp4"
            className="w-full h-auto lg:h-[450px]"
            loop
            muted
            autoPlay
          ></video>
        </div>
      </div>
    </div>
  );
};

export default Featured;
