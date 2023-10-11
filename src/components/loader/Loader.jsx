import React from "react";
import { ClipLoader } from "react-spinners";
import "./Loader.scss";

const MainLoader = ({ show }) => {
  return (
    <>
      {show && (
        <div className="spinnerContainer w-100 h-100 d-flex align-items-center justify-content-center">
          <ClipLoader color="gray" size={80} />
        </div>
      )}
    </>
  );
};

export default MainLoader;
