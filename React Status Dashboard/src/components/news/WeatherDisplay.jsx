import * as React from "react";
import WeatherContainer from "../WeatherContainer";
import Spinner from "../Spinner";

function WeatherDisplay(props) {
    return (
      <>
        {props.conditions && props.forecast ? (
          <WeatherContainer conditions={props.conditions} forecast={props.forecast} />
        ) : (
          <Spinner />
        )}
      </>
    );
  
}

export default WeatherDisplay;
