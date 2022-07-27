
  function EvapTable(props) {
  
      let color = props.value < (props.mvalue / 3) ? '#C83232' : props.value < (2 * props.mvalue / 3) ? '#FFFF19' :  props.value > (2 * props.mvalue / 3) ? '#008000' : '#4d4d4d';
      let style = {
        backgroundColor: [color]
      }

      let style2 = {
        fontSize: '2vh',
        fontWeight: 'bold',
        marginTop: '4vh',
        paddingTop: '1vh'
      }
  
    return (
        <div className="evaptable" style={style}>
          <p style={style2}>Evap Rate (GPM)</p>
          <div className="evapwhitebox">{Number.parseFloat(props.rate).toFixed(1)}</div>
          <p style={style2}>%DS</p>
          <div className="evapwhitebox">{Number.parseFloat(props.ds).toFixed(1)}%</div>
          <p style={style2}>Projected Action Projected (Days)</p>
          <div className="evapwhitebox">{Number.parseInt(props.until)}</div>
          <p style={style2}>Days since last CIP</p>
          <div className="evapwhitebox">{Number.parseInt(props.since)}</div>
          </div>
    );
  }
  
  export default EvapTable;