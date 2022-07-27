import * as React from "react";
import { Link } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";

function SignInPrompt() {
  const { instance } = useMsal();
  let style = {
    display: "flex",
    justifyContent: "center",
  };

  const handleLogin = (loginType) => {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.log(e);
      });
    }
  };

  return (
    <div className='signinwrapper'>
      <div className='signinTitle'>Please sign in to proceed to this page or return to the home page.</div>
      <div style={style}>
        <button className='btn' variant='outlined' onClick={() => handleLogin("popup")}>
          Sign In
        </button>

        <Link to='/'>
          <button className='btn' variant='outlined'>
            Return to Status
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SignInPrompt;
