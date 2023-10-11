import React from "react";
import { PulseLoader } from "react-spinners";
import "./Loader.scss";

const MainLoader = ({ show }) => {
  return (
    <>
      {show && (
        <div className="spinnerContainer w-100 h-100 d-flex align-items-center justify-content-center">
          <PulseLoader color="gray" size={15} />
        </div>
      )}
    </>
  );
};

export default MainLoader;
