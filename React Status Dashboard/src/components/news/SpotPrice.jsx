import * as React from "react";
import Odometer from "react-odometerjs";
import "odometer/themes/odometer-theme-minimal.css";

function SpotPrice(props) {

  var val = Number.parseFloat(props.price).toFixed(2) + "1";
  return (
    <div className='spot' style={{ backgroundColor: props.color }}>
      <div>{props.title}</div>
      <div className='spot_number-wrapper'>
        {typeof props.price === "number" ? (
          <>
            <div className='spot_currency'>$</div>
            <Odometer value={val} format='(,ddd).ddd' />
          </>
        ) : (
          "-"
        )}
      </div>
      <div className='spot_units'>{props.units}</div>
    </div>
  );
}

export default SpotPrice;
