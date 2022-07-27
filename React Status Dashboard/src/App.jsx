import "./App.css";
import Main from "./pages/main.js";
import { useState } from "react";
import { loginRequest } from "./authConfig";

import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";

const MainContent = (props) => {
  const isAuthenticated = useIsAuthenticated();
  //Store state of services, defaulting to unavaliable
  const [stateData, setstateData] = useState({
    Sightglass: {
      status: "unavaliable",
    },
    "Grain Portal": {
      status: "unavaliable",
    },
    Accumatica: {
      status: "unavaliable",
    },
    "Asset Keeper": {
      status: "unavaliable",
    },
    BinMaster: {
      status: "unavaliable",
    },
    dataPARC: {
      status: "unavaliable",
    },
    Email: {
      status: "unavaliable",
    },
    "Fuel Pumps": {
      status: "unavaliable",
    },
    GP: {
      status: "unavaliable",
    },
    Internet: {
      status: "unavaliable",
    },
    "IT Helpdesk": {
      status: "unavaliable",
    },
    "Lab Certification": {
      status: "unavaliable",
    },
    Mapcon: {
      status: "unavaliable",
    },
    OneWeigh: {
      status: "unavaliable",
    },
    Phones: {
      status: "unavaliable",
    },
    PrinterLogic: {
      status: "unavaliable",
    },
    "Visitor Kiosk": {
      status: "unavaliable",
    },
    QuickBooks: {
      status: "unavaliable",
    },
    Atrium: {
      status: "unavaliable",
    },
    "MRO Training": {
      status: "unavaliable",
    },
    North: {
      status: "unavaliable",
    },
    South: {
      status: "unavaliable",
    },
    "South Assembly": {
      status: "unavaliable",
    },
  });

  const [messageData, setmessageData] = useState({
    "2022-06-15T13:17:12.653": {
      id: "7b391abb-3bd7-4445-80e4-1d1266b2e93c",
      writeDate: "2022-06-15T13:17:12.653",
      message: "Message Board Unavaliable.",
      author: "Rex Wang",
    },
  });
  const [isadmin, setisadmin] = useState(false);
  const [isuser, setisuser] = useState(false);
  const [isonsite, setisonsite] = useState(false);

  const { instance, accounts } = useMsal();
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    
    setisuser(isAuthenticated);
    // Update the document title using the browser API
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance
      .acquireTokenSilent(request)
      .then((response) => {
        setAccessToken(response.accessToken);
      })
      .catch((e) => {
        /*
        instance.acquireTokenPopup(request).then((response) => {
          setAccessToken(response.accessToken);
        });
        */
        console.log(e);
      });

    //compare email list to access token upn
    if (accessToken) {
      var decoded = jwt_decode(accessToken);
      var upn = JSON.stringify(decoded.upn);
      upn = upn
        .slice(1, upn.length - 1)
        .trim()
        .toLowerCase();
      verify(upn);
    }
    else
    {
      verify("wrong@notmarquis.com");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, isAuthenticated]);

  const verify = async (upn) => {
    
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(upn),
      };
      let cache = Math.floor(Math.random() * 100);
      let response = await fetch(`https://<HOST NAME>.azurewebsites.net/api/VerifyIP?code=<USER SECRET----------------------------->&cache=${cache}`, requestOptions).then((data) =>
        data.json()
      );

      setisadmin(response.admin);
      setisonsite(response.onsite);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='Aspect'>
      <div className='App'>
        <Main
          messageData={messageData}
          stateData={stateData}
          setstateData={setstateData}
          setmessageData={setmessageData}
          isadmin={isadmin}
          isonsite={isonsite}
          isuser={isuser}
          token={accessToken}></Main>
      </div>
    </div>
  );
};

export default function App() {
  return <MainContent />;
}
