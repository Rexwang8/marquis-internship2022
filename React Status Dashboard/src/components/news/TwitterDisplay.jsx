import * as React from "react";
import TweetScroller from "../TweetScroller";
import Spinner from "../Spinner";

import twitterLogo from "../../assets/images/twitter.png";

function TwitterDisplay(props) {
  return (
    <div className='TwitterDisp'>
      {props.tweets ? (
        <>
          <img alt="twitter icon" src={twitterLogo} className='TwitterDisp_icon TwitterDisp_dim' />
          <TweetScroller tweets={props.tweets} />
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
//<TweetScroller tweets={props.tweets} />

export default TwitterDisplay;
