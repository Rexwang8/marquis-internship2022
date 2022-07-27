import * as React from "react";

function Headline(props) {
  return (
    <div className='headline'>
      <div className='headline_title'>{props.title}</div>
      <div className='headline_content'>{props.children}</div>
    </div>
  );
}

export default Headline;
