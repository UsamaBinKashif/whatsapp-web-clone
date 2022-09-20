import "./Default.scss";
import React from "react";
import Logo from "../assets/wa-logo.png";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const Default = () => {
  return (
    <div className="default">
      <img src={Logo} alt="whatsapp logo png" />

      <h1>WhatsApp Web Clone</h1>
      <p>- by Usama Bin Kashif</p>

      <div className="default__icons">
        <div className="icons">
          <a href="https://github.com/UsamaBinKashif" target="_blank">
            <GitHubIcon />
          </a>
          <a href="https://www.linkedin.com/in/usamabinkashif/" target="_blank">
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Default;
