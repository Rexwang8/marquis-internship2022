import * as React from "react";
import Odometer from "react-odometerjs";
import "odometer/themes/odometer-theme-minimal.css";

function ProductionFigure(props) {
  return (
    <div className='ProductionFigure'>
      <div className='ProductionFigure_rate'>
        <div className='ProductionFigure_number-wrapper'>
          {typeof props.figure === "number" ? (
            <>
              <Odometer value={Number.parseFloat(props.figure).toFixed(1) + "1"} format='(,ddd).ddd' />
              <div className='ProductionFigure_suffix'>{props.suffix}</div>
            </>
          ) : (
            "-"
          )}
        </div>
      </div>
      <div className='ProductionFigure_unit'>{props.children}</div>
    </div>
  );
}

export default ProductionFigure;
