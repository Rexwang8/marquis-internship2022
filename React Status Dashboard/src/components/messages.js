import MessageWrapper from "./messagewrapper";

function Messages(props) {

  //Take in message data
  //string to array, parse dates
  var result = [];
  var keys = Object.keys(props.data);
  keys.forEach(function (key) {
    result.push(props.data[key]);
  });
  result.sort((a, b) => (a.writeDate < b.writeDate ? 1 : -1));
  return (
    <div className='Messages'>
      <h1> Messages </h1>
      <p>Latest communications from IT staff.</p>
      <hr></hr>

<div style={{ 
        overflowY: 'auto',
        height: `${props.height}vh` }}>
{
        //Map first 3 results to messages
        result.slice(0, Number.parseInt(props.count)).map((msg) => {
          return <MessageWrapper key={msg.id} date={msg.writeDate} content={msg.message} author={msg.author} isadmin={props.isadmin} messageData={props.messageData} setmessageData={props.setmessageData}></MessageWrapper>;
        })
      }
</div>
     
    </div>
  );
}

export default Messages;

/*
  return(

    {msgarr.map((msg) => {
      return (
        <MessageWrapper id={msg.id} date={msg.writeDate} content={msg.content} author={msg.author}>
          a
        </MessageWrapper>
      );
    })}

    {
    "2022-06-15T13:17:12.653": {
        "id": "7b391abb-3bd7-4445-80e4-1d1266b2e93c",
        "writeDate": "2022-06-15T13:17:12.653",
        "message": "SQL ONLINE!",
        "author": "Rex Wang"
    }
}
    

    */
