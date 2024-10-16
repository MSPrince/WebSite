import React, { useEffect } from "react";
import { useFetchLabtestByIdQuery } from "../../redux/features/labtest/labTestApi";
import { useParams } from "react-router-dom";
import bgImage from "../../assets/background/home background.avif";
import SingleLabtestCard from "./SingleLabtestCard";

function SingleLabTestPage() {
  const { id } = useParams();
  console.log(id);

  // get data using redux
  const { data: labtest, error, isLoading } = useFetchLabtestByIdQuery(id);
  console.log("single page Lab test redux data", labtest);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      className="mx-auto max-w-full  sm:px-3 lg:px-3 pb-6"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className=" mx-auto">
        {isLoading && <div>Loading......</div>}
        {error && <div>{error.toString()}</div>}

        <SingleLabtestCard labtest={labtest} />
      </div>
    </div>
  );
}

export default SingleLabTestPage;
