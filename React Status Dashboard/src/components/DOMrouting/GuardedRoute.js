
import * as React from "react";
import SignInPrompt from "./SignInPrompt";
function GuardedRoute(props) {
  if (props.guard === "none") {
    return <div {...props} />;
  } else if (props.guard === "locuser") {
    if (props.isuser === true || props.isadmin === true || props.isonsite === true) {
      return <div {...props} />;
    } else {
      return <SignInPrompt></SignInPrompt>;
    }
  } else if (props.guard === "user") {
    if (props.isuser === true || props.isadmin === true) {
      return <div {...props} />;
    } else {
      return <SignInPrompt></SignInPrompt>;
    }
  } else if (props.guard === "admin") {
    if (props.isadmin === true) {
      return <div {...props} />;
    } else {
      return (<SignInPrompt/>);
    }
  }
}

export default GuardedRoute;
