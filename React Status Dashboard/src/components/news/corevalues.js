import * as React from "react";

function CoreValue(props) {
  return (
    <div>
      <div className='core_'>
        <div className='core_title'>{props.title}</div>
        <div className='core_desc'>{props.children}</div>
      </div>
    </div>
  );
}

export default CoreValue;
