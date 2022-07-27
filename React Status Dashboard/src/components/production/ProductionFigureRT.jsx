import * as React from "react";

function ProductionFigureRT(props) {
  let col = {
    color: "grey",
    fontSize: "2.5vh",
  };

  if (props.figure > props.target * 0.85 && props.figure < props.target * 1.15) {
    col = {
      color: "green",
      fontSize: "2.5vh",
    };
  } else if (props.figure <= props.target * 0.85 && props.figure >= props.target * 1.15) {
    col = {
      color: "red",
      fontSize: "2.5vh",
    };
  } else {
    col = {
      color: "grey",
      fontSize: "2.5vh",
    };
  }
  return (
    <div className='SProductionFigure'>
      <div className='SProductionFigure_rate'>
        <div className='SProductionFigure_number-wrapper' style={col}>
          {typeof props.figure === "number" ? (
            <>
              {props.round ? (
                <p>
                  {Number.parseInt(props.figure).toLocaleString()} {props.suffix}
                </p>
              ) : (
                <p>
                  {Number.parseFloat(props.figure).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {props.suffix}
                </p>
              )}
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

export default ProductionFigureRT;
