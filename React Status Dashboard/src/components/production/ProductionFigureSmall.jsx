import * as React from "react";


function ProductionFigureSmall(props) {

  return (
    
    <div className='SProductionFigure'>
      <div className='SProductionFigure_rate'>
        <div className='SProductionFigure_number-wrapper'>
          {typeof props.figure === "number" ? (
            <>
            {props.round ? <p>{Math.round(Number.parseInt(props.figure)).toLocaleString()}  {props.suffix}</p> : <p>{Number.parseFloat(props.figure).toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})}  {props.suffix}</p>}
              
            </>
          ) : (
            "-"
          )}
        </div>
      </div>
      <div className='SProductionFigure_unit'>{props.children}</div>
    </div>
  );
}

export default ProductionFigureSmall;
