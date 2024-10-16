import React, { useEffect, useState } from "react";
import { Gauge } from "@mui/x-charts/Gauge";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import bgImage from "../../assets/background/home background.avif";
import { FaUser } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../requestMethods"
const HomeBloodLayout = () => {
   const [bloodGroupData, setBloodGroupData] = useState([]);

   const dispatch = useDispatch();
   const navigate = useNavigate();

    useEffect(() => {
      const getBloodGroupStats = async () => {
        try {
          const res = await publicRequest.get("/donors/stats");

          const transformedData = res.data.map((item, index) => ({
            id: index,
            value: item.count,
            label: `Blood Group ${item._id}`,
          }));

          setBloodGroupData(transformedData);
        } catch (error) {
          console.log(error);
        }
      };

      getBloodGroupStats();
    }, []);

         const [donors, setDonors] = useState([]);
 useEffect(() => {
   const getDonors = async () => {
     try {
       const res = await publicRequest.get("/donors");
       const donorsData = res.data.map((item, index) => ({
         id: index,
         name: item.name,
         value: item.count,
       }));
       setDonors(donorsData);
     } catch (error) {
       console.log(error);
     }
   };

   getDonors();
 }, []);

 console.log("hjhugy", donors);
 
  return (
    <div
      className="flex justify-between h-[90vh] overflow-y-scroll hide-scrollbar px-5"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-12">
          <div className=" m-[30px] h-[300px] w-[300px ">
            <div className="h-[150px] w-[150px]">
              <Gauge
                value={75}
                startAngle={0}
                endAngle={360}
                innerRadius="80%"
                outerRadius="100%"
                // ...
              />
            </div>
            <h2 className="font-semibold text-[18px] m-[23px]">Prospects</h2>
          </div>

          <div className=" m-[10px] h-[250px] w-[250px] ">
            <div className="h-[150px] w-[150px] m-[30px] border-[15px] border-red-400 border-solid rounded-full">
              <div className="flex items-center justify-center m-[30px]">
                <h2 className="font-semibold text-[18px] m-[20px]">100</h2>
              </div>
              <h2 className="font-semibold text-[18px] m-[40px] mt-[55px]">
                Donors
              </h2>
            </div>
          </div>
        </div>

        <div className="-mt-24 w-full">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            height={250}
            margin={{ left: 30, right: 1, top: 30, bottom: 30 }}
            grid={{ vertical: true, horizontal: true }}
          />
        </div>
      </div>
      <div className="flex flex-col m-16 h-[700px] w-[300px] ">
        <div className="flex flex-col items-center justify-center m-[10px]">
          <h2 className="font-bold">Recent Donors</h2>
          <ul>
            <li>1.James Lisley</li>
            <li>2.Joel Lispler</li>
            <li>3.James Lisley</li>
          </ul>
        </div>
        <PieChart
          series={[
            {
              data: bloodGroupData,
              innerRadius: 50,
              outerRadius: 70,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: -90,
              endAngle: 180,
              cx: 150,
              cy: 100,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default HomeBloodLayout;
