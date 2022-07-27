import * as React from "react";
import { decode } from "html-entities";


function TweetScroller(props) {
  return (
    <div id='tweet-container' className='TweetScroller'>
      {
        //Map first 3 results to eom
        props.tweets.map((tweet, i) => {
          return (
            <div key={i} className='TweetScroller_tweet'>
              <img alt="profile img" className='TweetScroller_profile-img' src={tweet.profileImageURL.replace("http://", "//") } />
              <span className='TweetScroller_account'>{"   " + tweet.account + ":  "}</span>
              <span className='TweetScroller_text'>{decode(tweet.text, { level: "xml" })}</span>
              {tweet.imageURL && (
                <div className='TweetScroller_img-container'>
                  <img alt="post img" className='TweetScroller_img' src={tweet.imageURL.replace("http://", "//")} />
                </div>
              )}
            </div>
          );
        })
      }
    </div>
  );
}

export default TweetScroller;
