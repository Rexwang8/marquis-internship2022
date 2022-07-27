import * as React from "react";
import * as moment from "moment";
import Odometer from "react-odometerjs";
import "odometer/themes/odometer-theme-minimal.css";

function WeatherContainer(props) {
  const img1 = require(`/src/assets/images/weather/sm-icons/${props.forecast[0].description}`);
  const img2 = require(`/src/assets/images/weather/lg-icons/${props.conditions.description}`);

  return (
    <div className='weather'>
      <div className='weather_forecast'>
        <div className='weather_weekday'>{moment(props.forecast[0].date).format("dddd")}</div>
        <div className='weather_conditions'>
          <img alt="current conditions" src={img1} />
        </div>
        <div className='weather_high'>
          <Odometer value={Number.parseInt(props.forecast[0].tempHighF * 10)} format='(,ddd)' />
        </div>
        <div className='weather_low'>
          <Odometer value={Number.parseInt(props.forecast[0].tempLowF * 10)} format='(,ddd)' />
        </div>
      </div>
      <div className='weather_forecast weather_current'>
        <div className='weather_temp-wrapper'>
          <Odometer value={Number.parseInt(props.conditions.temperature * 10)} format='(,ddd)' />
          <div className='weather_degSymbol'>&deg;</div>
        </div>
        <div className='weather_conditions'>
          <img alt="current conditions" src={img2} />
        </div>
      </div>
      {props.forecast.map((f, i) => {
        if (i === 0) return null;
        let img = require(`/src/assets/images/weather/sm-icons/${f.description}`);
        return (
          <div key={i} className='weather_forecast'>
            <div className='weather_weekday'>{moment(f.date).format("dddd")}</div>
            <div className='weather_conditions'>
              <img alt="current conditions" src={img} />
            </div>
            <div className='weather_high'>
              <Odometer value={Number.parseInt(f.tempHighF * 10)} format='(,ddd)' />
            </div>
            <div className='weather_low'>
              <Odometer value={Number.parseInt(f.tempLowF * 10)} format='(,ddd)' />
            </div>
          </div>
        );
      })}

      {props.conditions.feelsLike > 100 && <div className='HeatIndex'>Caution! Heat index of {props.conditions.feelsLike} °F</div>}
    </div>
  );
}

export default WeatherContainer;
