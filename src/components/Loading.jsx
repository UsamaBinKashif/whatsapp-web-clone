import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./Loading.scss"

const Loading = () => {
  return (
    <div className="loader">
      <CircularProgress color="success" />
    </div>
  );
};

export default Loading;
