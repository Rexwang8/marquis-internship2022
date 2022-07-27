import StatusWrapper from "../components/statuswrapper.js";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "../components/SignInButton";
import { SignOutButton } from "../components/SignOutButton";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Messages from "../components/messages.js";
import {  Modal, Button } from "react-bootstrap";


function AdminPage(props) {
  const isAuthenticated = useIsAuthenticated();
  //Editor States
  const [editorStateContent, setEditorStateContent] = useState(() => EditorState.createEmpty());

  const [editorStateAdmin, setEditorStateAdmin] = useState(() => EditorState.createEmpty());

  const newMessage = (nmsg, prevState, date) => {
    let x = {
      ...prevState,
    };
    x[date] = nmsg;
    return x;
  };

  const updateMessages = (nmsg, date) => {
    let newState = newMessage(nmsg, props.messageData, date);
    props.setmessageData(() => newState, 0);
    return newState;

  };

  const logmessage = () => {
    let [content, admin] = getCurrentEdit();

    //Check if either box is empty
    /*
    if (content.trim() === "" || admin.trim() === "") {
      alert("One of the boxes is empty, ignoring message entry.");
      return false;
    }
    */

    //convert to array and get newest entry
    var msgarr = Object.keys(props.messageData).map((key) => [Number(key), props.messageData[key]]);
    let most_recent = msgarr.reduce((mostRecent, item) => (item[1].writeDate > mostRecent[1].writeDate ? item : mostRecent));

    //Check if message is the same as last
    if (content.trim().localeCompare(most_recent[1].message) === 0) {
      alert("Message content is the same as the most recent message, ignoring message entry.");
      return false;
    }

    //Generate new message item
    let date = dayjs(Date.now()).format("YYYY-MM-DD[T]hh:mm:ss.mmm");
    let newMessage = {
      id: uuidv4(),
      writeDate: date,
      message: content,
      author: admin,
    };
    //Update stateData with new messsage item
    return updateMessages(newMessage, date);
   
  };


  const refreshwindow = async () => {
    await new Promise(r => setTimeout(r, (Math.random() * (2000 - 1000)) + 1000));
    window.location.reload();

  };


  const getStatus = async () => {
    try {
      //Fetch data from azure functions SQL 
      let cache = Math.floor(Math.random() * 100);
      let response = await fetch(
        "https://<HOST NAME>.azurewebsites.net/api/StatusFunction?" +
          new URLSearchParams({
            code: "<USER SECRET----------------------------->",
            cache: cache
          })
      ).then((response) => response.json());

      //Update service status
      props.setstateData(response.statusResponse);
      props.setmessageData(response.messageResponse);
      return response;
      //Catch errors
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentEdit = () => {
    return [editorStateContent.getCurrentContent().getPlainText("\u0001"), editorStateAdmin.getCurrentContent().getPlainText("\u0001")];
  };

  async function SendMessage() {
    try {
      //i hate react states and their lazy updating.
      let newstate = logmessage();
      if (newstate === false)
      {
        return;
      }
      let respstate = {
        states: props.stateData,
        messages: newstate,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(respstate),
      };
      let cache = Math.floor(Math.random() * 100);
      await fetch(`https://<HOST NAME>.azurewebsites.net/api/statusadmin?code=iHW8IpmSUp53gS7-tGsohafyxKStqHD4IsErPgvMY1nlAzFuRZp28A==&cache=${cache}`, requestOptions);
      refreshwindow();
    } catch (error) {
      console.log(error);
    }
  }
  //Update once on page load
  // eslint-disable-line
  useEffect(() => {
    getStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleConfirm = () =>
  {
    setShow(false);
    console.log("send messages");
    SendMessage();
  }

  



  return (
    <div>
      <AuthenticatedTemplate>
        {props.isadmin ? (
          <div>
            <div className='leftwrapper'>
              <Messages data={props.messageData} isadmin={props.isadmin} count="12" height="25" messageData={props.messageData} setmessageData={props.setmessageData}></Messages>
              <div className='editorWrapper'>
                <div className='editorContentWrapper'>
                  <Editor editorState={editorStateContent} onChange={setEditorStateContent} placeholder='Enter Admin Message here and press "Send Message" to update database.' />
                </div>

                <div className='adminNameEditorWrapper'>
                  <Editor editorState={editorStateAdmin} onChange={setEditorStateAdmin} placeholder='Enter Admin Username here.' />
                </div>
              </div>

              
              <button type='button' onClick={handleShow} className='btn'>
                Push Changes
              </button>
              <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Push changes for all Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>Push changes for all users? To associate a message with a status change, modify both then push.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

              <button type='button' onClick={getStatus} className='btn'>
                Refresh
              </button>

              {isAuthenticated ? <SignOutButton /> : <SignInButton />}

              <Link to='/'>
                <button variant='outlined' className='btn'>
                  Dashboard
                </button>
              </Link>
              <Link to='/news/illinois'>
                <button variant='outlined' className='btn'>
                  News - Illinois
                </button>
              </Link>
              <Link to='/news/wisconsin'>
                <button variant='outlined' className='btn'>
                  News - Wisconsin
                </button>
              </Link>

              {props.isadmin ? <p className='adminverify'>Admin account verified</p> : null}
            </div>

            <div className='rightwrapper'>
              <div className='leftstatus'>
                <StatusWrapper title='Accumatica' status={props.stateData["Accumatica"].status} isadmin={props.isadmin} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
                <StatusWrapper
                  title='Asset Keeper'
                  status={props.stateData["Asset Keeper"].status}
                  isadmin={props.isadmin}
                  stateData={props.stateData}
                  setstateData={props.setstateData}></StatusWrapper>
                <StatusWrapper title='BinMaster' status={props.stateData["BinMaster"].status} isadmin={props.isadmin} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
                <StatusWrapper title='dataPARC' status={props.stateData["dataPARC"].status} isadmin={props.isadmin} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
                <StatusWrapper title='Email' status={props.stateData["Email"].status} isadmin={props.isadmin} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
                <StatusWrapper title='Fuel Pumps' status={props.stateData["Fuel Pumps"].status} isadmin={props.isadmin} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
                <hr></hr>
                <StatusWrapper title='Atrium' status={props.stateData["Atrium"].status} isadmin={props.isadmin} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
                <StatusWrapper
                  title='MRO Training'
                  status={props.stateData["MRO Training"].status}
                  isadmin={props.isadmin}
                  stateData={props.stateData}
                  setstateData={props.setstateData}></StatusWrapper>
              </div>

              <div className='middlestatus'>
                <StatusWrapper title='GP' status={props.stateData["GP"].status} isadmin={props.isadmin} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
                <StatusWrapper
                  title='Grain Portal'
                  status={props.stateData["Grain Portal"].status}
                  isadmin={props.isadmin}
                  stateData={props.stateData}
                  setstateData={props.setstateData}></StatusWrapper>
                <StatusWrapper title='Internet' status={props.stateData["Internet"].status} isadmin={props.isadmin} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
                <StatusWrapper title='IT Helpdesk' status={props.stateData["IT Helpdesk"].status} isadmin={props.isadmin} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
                <StatusWrapper
                  title='Lab Certification'
                  status={props.stateData["Lab Certification"].status}
                  isadmin={props.isadmin}
                  stateData={props.stateData}
                  setstateData={props.setstateData}></StatusWrapper>
                <StatusWrapper title='Mapcon' status={props.stateData["Mapcon"].status} isadmin={props.isadmin} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
                <hr></hr>
                <StatusWrapper title='North' status={props.stateData["North"].status} isadmin={props.isadmin} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
                <StatusWrapper title='South' status={props.stateData["South"].status} isadmin={props.isadmin} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
              </div>

              <div className='rightstatus'>
                <StatusWrapper title='OneWeigh' status={props.stateData["OneWeigh"].status} isadmin={props.isadmin} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
                <StatusWrapper title='Phones' status={props.stateData["Phones"].status} isadmin={props.isadmin} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
                <StatusWrapper
                  title='PrinterLogic'
                  status={props.stateData["PrinterLogic"].status}
                  isadmin={props.isadmin}
                  stateData={props.stateData}
                  setstateData={props.setstateData}></StatusWrapper>
                <StatusWrapper title='QuickBooks' status={props.stateData["QuickBooks"].status} isadmin={props.isadmin} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
                <StatusWrapper title='Sightglass' status={props.stateData["Sightglass"].status} isadmin={props.isadmin} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
                <StatusWrapper
                  title='Visitor Kiosk'
                  status={props.stateData["Visitor Kiosk"].status}
                  isadmin={props.isadmin}
                  stateData={props.stateData}
                  setstateData={props.setstateData}></StatusWrapper>
                <hr></hr>
                <StatusWrapper
                  title='South Assembly'
                  status={props.stateData["South Assembly"].status}
                  isadmin={props.isadmin}
                  stateData={props.stateData}
                  setstateData={props.setstateData}></StatusWrapper>
                <div className='hide'>
                  <StatusWrapper title='Sightglass' status={"unavaliable"} isadmin={props.isadmin} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        {isAuthenticated ? <SignOutButton /> : <SignInButton />}

        <Link to='/'>
          <button variant='outlined'>TO DASHBOARD</button>
        </Link>
      </UnauthenticatedTemplate>
    </div>
  );
}

export default AdminPage;
