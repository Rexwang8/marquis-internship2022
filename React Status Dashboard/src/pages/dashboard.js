import Messages from "../components/messages.js";
import StatusWrapper from "../components/statuswrapper.js";
import Logo from "../components/logo.js";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "../components/SignInButton";
import { SignOutButton } from "../components/SignOutButton";
import { AuthenticatedTemplate } from "@azure/msal-react";

function Dashboard(props) {
  const isAuthenticated = useIsAuthenticated();

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

  //Update once on page load and every 5 minutes
  // eslint-disable-line
  useEffect(() => {
    getStatus();
    const interval = setInterval(() => {
      getStatus();
    }, 300000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className='leftwrapper'>
        <Logo pagename={"Status Dashboard"}></Logo>
        <Messages data={props.messageData} count="3" isadmin={false} height="37.5" messageData={props.messageData} setmessageData={props.setmessageData}></Messages>
        {props.isadmin ? <p className='adminverify'>Admin account verified</p> : null}
        <button type='button' onClick={getStatus} className='btn'>
          Refresh
        </button>
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

        <AuthenticatedTemplate>
          {props.isadmin ? (
            <Link to='/admin'>
              <button variant='outlined' className='btn'>
                Admin
              </button>
            </Link>
          ) : null}
        </AuthenticatedTemplate>

        <div>{isAuthenticated ? <SignOutButton /> : <SignInButton />}</div>
      </div>

      <div className='rightwrapper'>
        <div className='leftstatus'>
          <StatusWrapper title='Accumatica' status={props.stateData["Accumatica"].status} isadmin={false} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
          <StatusWrapper title='Asset Keeper' status={props.stateData["Asset Keeper"].status} isadmin={false} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
          <StatusWrapper title='BinMaster' status={props.stateData["BinMaster"].status} isadmin={false} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
          <StatusWrapper title='dataPARC' status={props.stateData["dataPARC"].status} isadmin={false} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
          <StatusWrapper title='Email' status={props.stateData["Email"].status} isadmin={false} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
          <StatusWrapper title='Fuel Pumps' status={props.stateData["Fuel Pumps"].status} isadmin={false} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
          <hr></hr>
          <StatusWrapper title='Atrium' status={props.stateData["Atrium"].status} isadmin={false} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
          <StatusWrapper title='MRO Training' status={props.stateData["MRO Training"].status} isadmin={false} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
        </div>

        <div className='middlestatus'>
          <StatusWrapper title='GP' status={props.stateData["GP"].status} isadmin={false} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
          <StatusWrapper title='Grain Portal' status={props.stateData["Grain Portal"].status} isadmin={false} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
          <StatusWrapper title='Internet' status={props.stateData["Internet"].status} isadmin={false} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
          <StatusWrapper title='IT Helpdesk' status={props.stateData["IT Helpdesk"].status} isadmin={false} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
          <StatusWrapper title='Lab Certification' status={props.stateData["Lab Certification"].status} isadmin={false} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
          <StatusWrapper title='Mapcon' status={props.stateData["Mapcon"].status} isadmin={false} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
          <hr></hr>
          <StatusWrapper title='North' status={props.stateData["North"].status} isadmin={false} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
          <StatusWrapper title='South' status={props.stateData["South"].status} isadmin={false} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
        </div>

        <div className='rightstatus'>
          <StatusWrapper title='OneWeigh' status={props.stateData["OneWeigh"].status} isadmin={false} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
          <StatusWrapper title='Phones' status={props.stateData["Phones"].status} isadmin={false} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
          <StatusWrapper title='PrinterLogic' status={props.stateData["PrinterLogic"].status} isadmin={false} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
          <StatusWrapper title='QuickBooks' status={props.stateData["QuickBooks"].status} isadmin={false} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
          <StatusWrapper title='Sightglass' status={props.stateData["Sightglass"].status} isadmin={false} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
          <StatusWrapper title='Visitor Kiosk' status={props.stateData["Visitor Kiosk"].status} isadmin={false} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
          <hr></hr>
          <StatusWrapper title='South Assembly' status={props.stateData["South Assembly"].status} isadmin={false} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
          <div className='hide'>
            <StatusWrapper title='Sightglass' status={props.stateData["Sightglass"].status} isadmin={false} stateData={props.stateData} setstateData={props.setstateData}></StatusWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
