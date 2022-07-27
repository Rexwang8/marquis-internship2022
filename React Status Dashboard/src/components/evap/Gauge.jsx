
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
  Indicator
} from 'react-speedometer';


function Gauge(props) {
    let val = props.value;
    let color = val < (props.mvalue / 3) ? '#C83232' : val < (2 * props.mvalue / 3) ? '#FFFF19' :  val > (2 * props.mvalue / 3) ? '#008000' : '#4d4d4d';

  return (
      <div>
        <p className='GaugeTitle'>{props.title}</p>
        <Speedometer
  value={Number.parseFloat(val).toFixed(1)}
  max={props.mvalue}
  angle={160}
  fontFamily='squada-one'
  width={props.size}
  height={props.size}
>
  <Background angle={200} />
  <Arc/>
  <Needle/>
  <Progress color={color}/>
  <Marks step={25}/>
  <Indicator suffix=' %' fontSize={30}>
  </Indicator>
</Speedometer>
        </div>
  );
}

export default Gauge;
