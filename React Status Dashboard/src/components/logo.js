import "./logo.css";

const sightGlassLogo = require("../assets/images/sightglass.png");

function Logo(props) {
  return (
    <div>
      <header className='App-header'>
        <div className='Logo-wrapper'>
          <img src={sightGlassLogo} className='App-logo' alt='sightglass logo' />
          <p>{props.pagename}</p>
        </div>
      </header>
    </div>
  );
}

export default Logo;
