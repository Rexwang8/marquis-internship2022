
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "draft-js/dist/Draft.css";


import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "../components/SignInButton";
import { SignOutButton } from "../components/SignOutButton";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { Modal, Button } from "react-bootstrap";

function ProductionAdmin(props) {
  const isAuthenticated = useIsAuthenticated();

  const [rtdata, setrtdata] = useState(
    <COMPANY DATA>
  );

  const refreshwindow = async () => {
    await new Promise(r => setTimeout(r, (Math.random() * (2000 - 1000)) + 1000));
    window.location.reload();

  };


  const getRTdata = async () => {
    try {
      let data = null;
      let cache = Math.floor(Math.random() * 100);
      if (props.facility === "illinois") {
        data = await fetch(`https://<HOST NAME>.azurewebsites.net/api/getPARCRealtime?code=<USER SECRET----------------------------->&cache=${cache}`).then((response) =>
          response.json()
        );
      } else {
        data = await fetch(`https://<HOST NAME>.azurewebsites.net/api/getPARCRealtime?code=<USER SECRET----------------------------->&cache=${cache}`).then((response) => response.json());
        console.log("got not illinois facility");
      }


      //Update service status
      setrtdata(data);
      setnuval(data.NUBeerfeedTarget);
      setsuval(data.SUBeerfeedTarget);
      //Catch errors
    } catch (error) {
      console.log(error);
    }
  };

  //Update once on page load
  // eslint-disable-line
  useEffect(() => {
    getRTdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function sendTarget() {
    try {
      console.log(isNaN(Number.parseInt(nuval)));
      if(typeof(Number.parseInt(nuval)) != 'number' || Number.parseInt(nuval) === 0 || isNaN(Number.parseInt(nuval)))
    {
      nuval = 2350;
    }

    if(typeof(Number.parseInt(suval)) != 'number' || Number.parseInt(suval) === 0 || isNaN(Number.parseInt(suval)))
    {
      suval = 2350;
    }

      let respstate = {
        nu: nuval,
        su: suval,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(respstate),
      };
      let cache = Math.floor(Math.random() * 100);
      await fetch(`https://<HOST NAME>.azurewebsites.net/api/postProdTargets?code<USER SECRET----------------------------->&cache=${cache}`, requestOptions);
      refreshwindow();
    } catch (error) {
      console.log(error);
    }
  }

  let [nuval, setnuval] = useState(rtdata.NUBeerfeedTarget);
  let [suval, setsuval] = useState(rtdata.SUBeerfeedTarget);
  const handlenuChange = (event) => {
    let result = event.target.value.replace(/\D/g, "");


    setnuval(result);
  };

  const handlesuChange = (event) => {
    let result = event.target.value.replace(/\D/g, "");
    console.log("Type: " + typeof(result));

    setsuval(result);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleConfirm = () => {
    setShow(false);
    console.log(nuval, suval);
    sendTarget();
  };

  return (
    <div>
      <AuthenticatedTemplate>
        {props.isadmin ? (
          <div>
            <h3 style={{color: 'white', margin: '3vh'}}>Update Target Value</h3>
            <h4 style={{color: 'white', margin: '2vh'}}>Current: NU: {rtdata.NUBeerfeedTarget} SU: {rtdata.SUBeerfeedTarget}</h4>
            <input type='text' placeholder='NU Target' value={nuval} onChange={handlenuChange} />

            <input type='text' placeholder='SU Target' value={suval} onChange={handlesuChange} />
            <button type='button' onClick={handleShow} className='btn'>
              Push Changes
            </button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Push changes for all Users</Modal.Title>
              </Modal.Header>
              <Modal.Body>Push new targets for NU and SU?</Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                  Close
                </Button>
                <Button variant='primary' onClick={handleConfirm}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>
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

export default ProductionAdmin;
