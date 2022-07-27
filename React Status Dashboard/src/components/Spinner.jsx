import * as React from "react";

import spinnerImg from "../assets/images/Double Ring-2s-200px.svg";

const Spinner = () => (
  <div style={{ textAlign: "center", marginTop: "auto", marginBottom: "auto" }}>
    <img src={spinnerImg} alt='Loading, please wait...' style={{ height: "6rem" }} />
  </div>
);

export default Spinner;
