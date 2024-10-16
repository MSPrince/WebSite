import React, { useState, useEffect } from "react";
import bgImage from "../../assets/background/home background.avif";
import { useLocation, useNavigate } from "react-router-dom";
import {publicRequest} from "../../requestMethods"; // Adjust the import path if needed

function Prospect() {
  const [prospect, setProspect] = useState({});
  const location = useLocation();
  const prospectId = location.pathname.split("/")[4];
  const navigate = useNavigate();

  useEffect(() => {
    const getProspect = async () => {
      try {
        const res = await publicRequest.get(`/prospect/find/${prospectId}`);
        setProspect(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProspect();
  }, [prospectId]);


const approveProspect = async () => {
  try {
    const token = localStorage.getItem("token"); // or wherever you store the token

    const createResponse = await publicRequest.post(
      "/donors",
      {
        name: prospect.name,
        address: prospect.address,
        email: prospect.email,
        tel: prospect.tel,
        bloodgroup: prospect.bloodgroup,
        diseases: prospect.diseases,
        date: prospect.date,
        weight: prospect.weight,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Create donor response:", createResponse);

    const deleteResponse = await publicRequest.delete(
      `/prospect/${prospectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Delete prospect response:", deleteResponse);

    navigate("/admin/bloodDonation/donors");
  } catch (error) {
    console.error("Error in approving prospect:", error);
  }
};



  return (
    <div
      className="flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="m-[20px] w-[450px] shadow-lg bg-white rounded-lg">
        <h2 className="font-semibold m-[30px]">Prospect</h2>

        <ul className="m-[30px]">
          <li className="mt-2">
            <strong>Name:</strong> {prospect.name || "Loading..."}
          </li>
          <li className="mt-2">
            <strong>Address:</strong> {prospect.address || "Loading..."}
          </li>
          <li className="mt-2">
            <strong>Tel:</strong> {prospect.tel || "Loading..."}
          </li>
          <li className="mt-2">
            <strong>BloodType:</strong> {prospect.bloodgroup || "Loading..."}
          </li>
          <li className="mt-2">
            <strong>Diseases:</strong> {prospect.diseases || "Loading..."}
          </li>
          <li className="mt-2">
            <strong>Weight:</strong> {prospect.weight || "Loading..."} kg
          </li>
          <li className="mt-2">
            <strong>Date:</strong> {prospect.date || "Loading..."}
          </li>
          <li className="mt-2">
            <strong>Status:</strong> {prospect.status || "Loading..."}
          </li>
        </ul>

        <span className="block m-[10px]">
          Do you want to approve {prospect.name || "this person"} as a donor?
        </span>

        <button
          onClick={approveProspect}
          className="bg-primary text-white cursor-pointer p-[5px] w-[150px] m-[10px] rounded"
        >
          Approve
        </button>
      </div>
    </div>
  );
}

export default Prospect;
