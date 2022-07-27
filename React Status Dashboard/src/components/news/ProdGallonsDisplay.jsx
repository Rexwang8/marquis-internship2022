import * as React from "react";
import ProductionFigure from "../ProductionFigure";
import Spinner from "../Spinner";

function ProdGallonsDisplay(props) {
  return (
    <>
      {typeof props.prodGalQ === "number" && typeof props.prodGalM === "number" ? (
        <div className='figureContainer'>
          <ProductionFigure figure={props.prodGalQ} suffix='M'>
            Previous Quarter
          </ProductionFigure>
          <ProductionFigure figure={props.prodGalM} suffix='M'>
            Previous Month
          </ProductionFigure>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default ProdGallonsDisplay;
