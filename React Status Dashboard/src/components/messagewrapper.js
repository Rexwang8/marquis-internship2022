import dayjs from "dayjs";
import { CloseButton, Modal, Button } from "react-bootstrap";
import { useState
 } from "react";
function MessageWrapper(props) {
  var utc = require("dayjs/plugin/utc");
  var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const date = new Date(props.date);
  const timeZone = dayjs.tz.guess();
  const newdate = dayjs.utc(date, true).tz(timeZone).add(dayjs.utc(date, true).tz(timeZone).utcOffset(), "minutes").format("MM/DD/YYYY  HH:mm A");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleConfirm = () =>
  {
    setShow(false);
    handleDelete(); 
  }; 
  

  const handleDelete = (e) => {
    let objo = {};
    for (let k in props.messageData) {
      if(props.messageData[k].writeDate !== props.date)
      {
        objo[props.messageData[k].writeDate] = props.messageData[k];
      }
      
    }
    props.setmessageData(objo);
  }


  return (
    
    <div className='MessagesWrapper'>
      <p>{props.content}</p>
      <p className='message_info'>
        By: {props.author} | {newdate}         {props.isadmin ? <CloseButton size="lg" variant="white" onClick={handleShow}/> : null}
      </p>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hide Message for all Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>Hide Message for all Users? Warning: You will need to push changes to save.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default MessageWrapper;
