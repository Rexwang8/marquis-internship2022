import * as React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  let style =
  {
    color: 'white',
    fontSize: 'xx-large'
  }
return(
  <div>
    <h2 style={style}>404 - Oh dear, you seem to be lost! Why don't you go back to the homepage and try again.</h2>
        <Link to='/'>
          <button className='btn' variant='outlined'>
            Return to Status
          </button>
        </Link>
      </div>
  );
}

export default NotFoundPage;
