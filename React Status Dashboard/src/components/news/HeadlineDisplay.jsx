import * as React from "react";
import Headline from "../Headline";
import Spinner from "../Spinner";

function HeadlineDisplay(props) {
  return (
    <>
      {props.stories ? (
        props.stories.slice(0, 3).map((story, i) => (
          <Headline key={i} title={story.title}>
            {story.content}
          </Headline>
        ))
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default HeadlineDisplay;
