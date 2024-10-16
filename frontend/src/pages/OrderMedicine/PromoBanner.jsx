import React from 'react'
import { FaTruckDroplet } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaUserInjured } from "react-icons/fa";


function PromoBanner() {
  return (
    <div className="section__container banner__container">
      <div className="banner__Card rounded-lg shadow-lg p-4">
        <span>
          <FaTruckDroplet />
        </span>
        <h4>Free Delivery</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
          quidem.
        </p>
      </div>
      <div className="banner__Card rounded-lg shadow-lg p-4">
        <span>
          <GiTakeMyMoney />
        </span>
        <h4>100% Money Back Gurantee</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
          quidem.
        </p>
      </div>
      <div className="banner__Card rounded-lg shadow-lg p-4">
        <span>
          <FaUserInjured />
        </span>
        <h4>Strong Support</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
          quidem.
        </p>
      </div>
    </div>
  );
}

export default PromoBanner
