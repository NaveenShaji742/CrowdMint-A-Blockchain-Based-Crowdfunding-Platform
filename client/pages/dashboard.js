import React from "react";
import authWrapper from "../helper/authWrapper";
import { useSelector } from "react-redux";
import FundRiserCard from "../components/FundRiserCard";
import Loader from "../components/Loader";

const Dashboard = () => {
  const projectsList = useSelector((state) => state.projectReducer.projects);

  return (
    <div className="px-2 py-4 lg:px-12">
      <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2"> {/* Grid layout for responsive design */}
        {projectsList !== undefined ? (
          projectsList.length > 0 ? (
            projectsList.map((data, i) => (
              <div className="max-w-lg mx-auto"> {/* Slightly reduced width for cards */}
                <FundRiserCard props={data} key={i} />
              </div>
            ))
          ) : (
            <h1 className="text-2xl font-bold text-gray-500 text-center font-sans">
              No project found!
            </h1>
          )
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default authWrapper(Dashboard);
