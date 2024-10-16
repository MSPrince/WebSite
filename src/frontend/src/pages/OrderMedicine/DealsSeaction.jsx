import React, { useEffect, useState } from "react";
import dealsImage from "../../assets/medicine/deals.png";
import bgImage from "../../assets/background/home background.avif";

function DealsSection() {
  const targetDate = new Date("2024-12-26T00:00:00"); // Target date
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 }); // Countdown finished
      }
    };

    // Update countdown every second
    const timerId = setInterval(updateCountdown, 1000);

    // Initial call to set the countdown immediately
    updateCountdown();

    // Clear the interval on component unmount
    return () => clearInterval(timerId);
  }, []); // Removed targetDate from dependencies

  return (
    <div
      className="mx-auto -z-50 max-w-full px-2 sm:px-6 lg:px-8 rounded-lg py-16"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="section__container deals__container py-20">
        <div className="deals__image">
          <img src={dealsImage} alt="Deals" />
        </div>

        <div className="deals__content">
          <h5>Get Up to 40% discount</h5>
          <h4 className="text-primary">Skin Care Kit</h4>
          <p>
            Elevate your skincare routine with our specially curated Skin Care
            Kit, designed to address all your skincare needs. Each product is
            formulated with high-quality ingredients that nurture and rejuvenate
            your skin, helping you achieve a radiant complexion.
          </p>
          <div className="deals__countdown text-primary">
            <div className="deals__countdown__card">
              <h4>{countdown.days}</h4>
              <p>Days</p>
            </div>
            <div className="deals__countdown__card">
              <h4>{countdown.hours}</h4>
              <p>Hours</p>
            </div>
            <div className="deals__countdown__card">
              <h4>{countdown.minutes}</h4>
              <p>Minutes</p>
            </div>
            <div className="deals__countdown__card">
              <h4>{countdown.seconds}</h4>
              <p>Seconds</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DealsSection;
