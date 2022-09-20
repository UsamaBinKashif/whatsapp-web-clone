import "./Login.scss";
import React from "react";
import { auth, provider } from "../backend/Firebase";
import { useStateValue } from "../context/StateProvider";
import { actionTypes } from "../context/reducer";
import { Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Logo from "../assets/wa-logo.png";
import GLogo from "../assets/googleicon.png";
const Login = () => {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="login">
      <div className="login__container">
        <img src={Logo} alt="whatsapp logo png" />
        <div className="login__container--text">
          <h1>Sign In To WhatsApp</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign In With Google
          <img src={GLogo} alt="google icon png" />
        </Button>

        <div className="login__container--icons">
          <p>WhatsApp Web clone by Usama Bin Kashif</p>
          <div className="icons">
            <a href="https://github.com/UsamaBinKashif" target="_blank">
              <GitHubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/usamabinkashif/"
              target="_blank"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
