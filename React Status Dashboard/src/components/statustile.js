import { useState } from "react";

const greencircle = require("../assets/icons/greencircle.png");
const yellowcircle = require("../assets/icons/yellowcircle.png");
const redcircle = require("../assets/icons/redcircle.png");
const greycircle = require("../assets/icons/greycircle.png");

function StatusTile(props) {
  const wrapstyles = {
    display: "flex",

    marginLeft: "2vw",
  };

  const imgstyles = {
    justifyContent: "center",
  };

  const [name] = useState(props.title);

  const newStatus = (nstatus, prevState) => {
    let x = {
      ...prevState,
    };
    x[name].status = nstatus;

    return x;
  };

  const updateStatus = (nstatus) => {
    props.setstateData((prevState) => newStatus(nstatus, prevState));
  };

  const getStatusColor = () => {
    let col =
      props.stateData[props.title]?.status === "online"
        ? greencircle
        : props.stateData[props.title]?.status === "reduced"
        ? yellowcircle
        : props.stateData[props.title]?.status === "offline"
        ? redcircle
        : greycircle;
    return col;
  };

  const getStatusText = () => {
    let txt =
      props.stateData[props.title]?.status === "online"
        ? "  Service Online"
        : props.stateData[props.title]?.status === "reduced"
        ? "  Service reduced"
        : props.stateData[props.title]?.status === "offline"
        ? "  Service Offline"
        : "  Status Unavailable";
    return txt;
  };

  return (
    <div className="statustile">
      {props.isadmin === true && (
        <div style={wrapstyles}>
          <div className='StatusTileWrapper'>
            <div>
              <p className="statustiletitle">{props.title}</p>
              <p>
                <span>
                  <img src={getStatusColor()} alt='Icon for status'></img>
                </span>
                {getStatusText()}
              </p>
            </div>
          </div>

          <div>
            <div className='statusAdminBar'>
              <img alt="color circle" src={greencircle} style={imgstyles} onClick={() => updateStatus("online")}></img>
              <img alt="color circle" src={yellowcircle} style={imgstyles} onClick={() => updateStatus("reduced")}></img>
              <img alt="color circle" src={redcircle} style={imgstyles} onClick={() => updateStatus("offline")}></img>
              <img alt="color circle" src={greycircle} style={imgstyles} onClick={() => updateStatus("unavailable")}></img>
            </div>
          </div>
        </div>
      )}

      {props.isadmin === false && (
        <div>
          <div className='StatusTileWrapper'>
            <div>
              <p className="statustiletitle">{props.title}</p>
              <p style={{color: 'var(--textcolor1)'}}>
                <span>
                  <img src={props.status === "online" ? greencircle : props.status === "reduced" ? yellowcircle : props.status === "offline" ? redcircle : greycircle} alt='Icon for status'></img>
                </span>
                {getStatusText()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatusTile;
