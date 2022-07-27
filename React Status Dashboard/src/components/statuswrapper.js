import StatusTile from "./statustile.js";

function StatusWrapper(props) {
  return (
    <div className='StatusWrapper'>
      <StatusTile title={props.title} status={props.status} isadmin={props.isadmin} stateData={props.stateData} setstateData={props.setstateData}></StatusTile>
    </div>
  );
}

export default StatusWrapper;
