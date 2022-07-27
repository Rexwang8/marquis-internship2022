import * as React from "react";

function BoxTitle(props) {
  return (
    <div>
      <div className='boxtitle' style={{ color: props.color }}>
        <div>{props.title}</div>
      </div>
    </div>
  );
}

export default BoxTitle;
