import * as React from "react";
import Spinner from "../Spinner";

const RADAR_FMT = "h:mm A";

function WeatherRadarDisplay(props) {
  return (
    <div className='radar'>
      {props.src.length > 1 ? (
        <>
          <img alt="radar img"className='radar_radar-image' src={props.src[props.frame].url} />
          <div className='radar_frameTime'>{props.src[props.frame].dttm.format(RADAR_FMT)}</div>
          {props.facility === "illinois" && <div className='radar_you-are-here radar_hennepin'>Hennepin</div>}
          {props.facility === "wisconsin" && <div className='radar_you-are-here radar_necedah'>Necedah</div>}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default WeatherRadarDisplay;
