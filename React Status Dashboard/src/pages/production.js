import { useEffect, useState } from "react";
import moment from "moment";
import sightglassLogo from "../assets/images/sightglass.png";
import { Row, Col, Container } from "react-bootstrap";
import BoxTitle from "../components/news/boxtitle";
import ProductionFigureSmall from "../components/production/ProductionFigureSmall";
import dayjs from "dayjs";
import ProductionFigureRT from "../components/production/ProductionFigureRT";

function Production(props) {
  var utc = require("dayjs/plugin/utc");
  var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
  dayjs.extend(utc);
  dayjs.extend(timezone);
  var weekday = require("dayjs/plugin/weekday");
  dayjs.extend(weekday);

  const refreshRate = 1000 * 900;
  const facility = props.facility;
  const [lastUpdated, setlastUpdated] = useState(null);
  const [proddata, setproddata] = useState(
   <COMPANY DATA>
  );

  const [rtdata, setrtdata] = useState(
    {
      "NUBeerfeedTarget": 2350,
      "SUBeerfeedTarget": 2350,
      "NUBeerfeedActual": 2350,
      "SUBeerfeedActual": 2350
    }
  );

  const LAST_UPDATED_FMT = "MM/DD/YYYY h:mm:ss A";

  const reorderDates = (datearr, time) => {
    let newarr = [];

    datearr.forEach((e) => {
      let dstr = e.Timestamp.toString();
      let dt = new Date(dstr);
      //const dayofweek = dayjs.utc(dt, true).tz(time).add(dayjs.utc(dt, true).tz(time).utcOffset(), "minutes");
      newarr[dayjs(dt).day()] = e;
    });
    return newarr;
  };
  //update effect

  useEffect(() => {
    setlastUpdated(moment().format(LAST_UPDATED_FMT));
    getProduction();
    const interval = setInterval(() => {
      getProduction();
      setlastUpdated(moment().format(LAST_UPDATED_FMT));
      console.log(lastUpdated);
    }, refreshRate);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    setlastUpdated(moment().format(LAST_UPDATED_FMT));
    getRTdata();
    const interval = setInterval(() => {
      getRTdata();
      setlastUpdated(moment().format(LAST_UPDATED_FMT));
      console.log(lastUpdated);
    }, 60*5*1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProduction = async () => {
    try {
      let data = null;
      let cache = Math.floor(Math.random() * 100);
      if (facility === "illinois") {
        data = await fetch(`https://<HOST NAME>.azurewebsites.net/api/GetPARCData?code=<USER SECRET----------------------------->&cache=${cache}`).then((response) =>
          response.json()
        );
      } else {
        data = await fetch(`https://<HOST NAME>.azurewebsites.net/api/GetPARCData?code=<USER SECRET----------------------------->&cache=${cache}`).then((response) => response.json());
        console.log("got not illinois facility");
      }

      const timeZone = dayjs.tz.guess();

      data.NUBeerWeekly = reorderDates(data.NUBeerWeekly, timeZone);
      data.SUBeerWeekly = reorderDates(data.SUBeerWeekly, timeZone);
      console.log(data.SUTransfersWeekly);
      data.NUTransfersWeekly = reorderDates(data.NUTransfersWeekly, timeZone);
      data.SUTransfersWeekly = reorderDates(data.SUTransfersWeekly, timeZone);
      console.log(data.SUTransfersWeekly);
      data.NUOilWeekly = reorderDates(data.NUOilWeekly, timeZone);
      data.SUOilWeekly = reorderDates(data.SUOilWeekly, timeZone);
      data.NU<COMPANY PRODUCT>Weekly = reorderDates(data.NU<COMPANY PRODUCT>Weekly, timeZone);
      data.SU<COMPANY PRODUCT>Weekly = reorderDates(data.SU<COMPANY PRODUCT>Weekly, timeZone);

      //Update service status
      setproddata(data);
      console.log(data);

      //Catch errors
    } catch (error) {
      console.log(error);
    }
  };

  const getRTdata = async () => {
    try {
      let data = null;
      let cache = Math.floor(Math.random() * 100);
      if (facility === "illinois") {
        data = await fetch(`https://<HOST NAME>.azurewebsites.net/api/getPARCRealtime?code=<USER SECRET----------------------------->&cache=${cache}`).then((response) =>
          response.json()
        );
      } else {
        data = await fetch(`https://<HOST NAME>.azurewebsites.net/api/getPARCRealtime?code=<USER SECRET----------------------------->&cache=${cache}`).then((response) => response.json());
        console.log("got not illinois facility");
      }


      //Update service status
      setrtdata(data);

      //Catch errors
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className='colLeft'>
        <div className='colBox'>
          <div className='colBox2'>
            <img src={sightglassLogo} className='prodsg' alt='sglogo'></img>
            <BoxTitle title='Ethanol' color='#73bf45'></BoxTitle>
            <Container className='textGrid' fluid>
              <Row>
                <Col></Col>
                <Col><p className="ptitle">NU Beerfeed</p></Col>
                <Col><p className="ptitle">NU Transfers</p></Col>
                <Col><p className="ptitle">SU Beerfeed</p></Col>
                <Col><p className="ptitle">SU Transfers</p></Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Tuesday</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUBeerWeekly[2].Value} suffix='' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUTransfersWeekly[2].Value} suffix='' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUBeerWeekly[2].Value} suffix='' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUTransfersWeekly[2].Value} suffix='' round={true}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Wednesday</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUBeerWeekly[3].Value} suffix='' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUTransfersWeekly[3].Value} suffix='' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUBeerWeekly[3].Value} suffix='' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUTransfersWeekly[3].Value} suffix='' round={true} />
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Thursday</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUBeerWeekly[4].Value} suffix='' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUTransfersWeekly[4].Value} suffix='' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUBeerWeekly[4].Value} suffix='' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUTransfersWeekly[4].Value} suffix='' round={true}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Friday</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUBeerWeekly[5].Value} suffix='' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUTransfersWeekly[5].Value} suffix='' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUBeerWeekly[5].Value} suffix='' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUTransfersWeekly[5].Value} suffix='' round={true}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Saturday</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUBeerWeekly[6].Value} suffix='' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUTransfersWeekly[6].Value} suffix='' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUBeerWeekly[6].Value} suffix='' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUTransfersWeekly[6].Value} suffix='' round={true}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Sunday</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUBeerWeekly[0].Value} suffix='' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUTransfersWeekly[0].Value} suffix='' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUBeerWeekly[0].Value} suffix='' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUTransfersWeekly[0].Value} suffix='' round={true}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Monday</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUBeerWeekly[1].Value} suffix='' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUTransfersWeekly[1].Value} suffix='' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUBeerWeekly[1].Value} suffix='' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUTransfersWeekly[1].Value} suffix='' round={true}/>
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr className='textGrid_hr'></hr>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Total</p></Col>
                <Col>
                  <ProductionFigureSmall figure='n/a' suffix='' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUTransfersTotal} suffix='' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure='n/a' suffix='' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUTransfersTotal} suffix='' round={false}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Annualized Rate</p></Col>
                <Col>
                  <ProductionFigureSmall figure='n/a' suffix='' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUTransfersTotal * 52} suffix='' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure='n/a' suffix='' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUTransfersTotal * 52} suffix='' round={false}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">YTD</p></Col>
                <Col>
                  <ProductionFigureSmall figure='n/a' suffix='' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUTransfersYTD} suffix='' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure='n/a' suffix='' round={false} />
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUTransfersYTD} suffix='' round={false}/>
                </Col>
              </Row>

              <Row>
              <Col><p className="ptitle">Realtime Beer Output</p></Col>
                <Col>
                  <ProductionFigureRT figure={rtdata.NUBeerfeedActual} target={rtdata.NUBeerfeedTarget} suffix='gal/min' round={false}/>
                </Col>
                <Col>
                <ProductionFigureRT figure='n/a' suffix='' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureRT figure={rtdata.SUBeerfeedActual} target={rtdata.SUBeerfeedTarget} suffix='gal/min' round={false}/>
                </Col>
                <Col>
                <ProductionFigureRT figure='n/a' suffix='' round={false}/>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
      <div className='colMiddle'>
        <div className='colBox'>
          <div className='colBox2'>
            <BoxTitle title='Oil' color='#73bf45'></BoxTitle>
            <Container className='textGrid' fluid>
              <Row>
                <Col></Col>
                <Col>NU</Col>
                <Col>SU</Col>
                <Col>Site</Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Tuesday</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUOilWeekly[2].Value} suffix='gpm' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUOilWeekly[2].Value} suffix='gpm' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUOilWeekly[2].Value + proddata.SUOilWeekly[2].Value} suffix='gpm' round={true}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Wednesday</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUOilWeekly[3].Value} suffix='gpm' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUOilWeekly[3].Value} suffix='gpm' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUOilWeekly[3].Value + proddata.SUOilWeekly[3].Value} suffix='gpm' round={true}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Thursday</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUOilWeekly[4].Value} suffix='gpm' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUOilWeekly[4].Value} suffix='gpm' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUOilWeekly[4].Value + proddata.SUOilWeekly[4].Value} suffix='gpm' round={true}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Friday</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUOilWeekly[5].Value} suffix='gpm' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUOilWeekly[5].Value} suffix='gpm' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUOilWeekly[5].Value + proddata.SUOilWeekly[5].Value} suffix='gpm' round={true}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Saturday</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUOilWeekly[6].Value} suffix='gpm' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUOilWeekly[6].Value} suffix='gpm' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUOilWeekly[6].Value + proddata.SUOilWeekly[6].Value} suffix='gpm' round={true}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Sunday</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUOilWeekly[0].Value} suffix='gpm' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUOilWeekly[0].Value} suffix='gpm' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUOilWeekly[0].Value + proddata.SUOilWeekly[0].Value} suffix='gpm' round={true}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Monday</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUOilWeekly[1].Value} suffix='gpm' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUOilWeekly[1].Value} suffix='gpm' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUOilWeekly[1].Value + proddata.SUOilWeekly[1].Value} suffix='gpm' round={true}/>
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr className='textGrid_hr'></hr>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Weekly Average</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUOilWeeklyAVG} suffix='gpm' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUOilWeeklyAVG} suffix='gpm' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUOilWeeklyAVG + proddata.SUOilWeeklyAVG} suffix='gpm' round={false}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Estimated Yearly</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUOilWeeklyAVG * 1440 * 52} suffix='gal' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUOilWeeklyAVG * 1440 * 52} suffix='gal' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={(proddata.NUOilWeeklyAVG + proddata.SUOilWeeklyAVG) * 1440 * 52} suffix='gal' round={false}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">YTD Average</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUOilYTD} suffix='gpm' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SUOilYTD} suffix='gpm' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NUOilYTD + proddata.SUOilYTD} suffix='gpm' round={false}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">YTD Yield</p></Col>
                <Col>
                  <ProductionFigureSmall figure={(proddata.NUOilYTD*1440*7.5)/proddata.NUOilYTDYield} suffix='lbs/bu' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={(proddata.SUOilYTD*1440*7.5)/proddata.SUOilYTDYield} suffix='lbs/bu' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={(((proddata.NUOilYTD*1440*7.5)/proddata.NUOilYTDYield) + ((proddata.SUOilYTD*1440*7.5)/proddata.SUOilYTDYield)) / 2} suffix='lbs/bu' round={false}/>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>

      <div className='colRight'>
        <div className='colBox'>
          <div className='colBox2'>
            <BoxTitle title='<COMPANY PRODUCT>' color='#73bf45'></BoxTitle>
            <Container className='textGrid' fluid>
              <Row>
                <Col></Col>
                <Col><p className="ptitle">NU</p></Col>
                <Col><p className="ptitle">SU</p></Col>
                <Col><p className="ptitle">Site</p></Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Tuesday</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NU<COMPANY PRODUCT>Weekly[2].Value / 2000} suffix='tons/day' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SU<COMPANY PRODUCT>Weekly[2].Value / 2000} suffix='tons/day' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NU<COMPANY PRODUCT>Weekly[2].Value / 2000 + proddata.SU<COMPANY PRODUCT>Weekly[2].Value / 2000} suffix='tons/day' round={true}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Wednesday</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NU<COMPANY PRODUCT>Weekly[3].Value / 2000} suffix='tons/day' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SU<COMPANY PRODUCT>Weekly[3].Value / 2000} suffix='tons/day' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NU<COMPANY PRODUCT>Weekly[3].Value / 2000 + proddata.SU<COMPANY PRODUCT>Weekly[3].Value / 2000} suffix='tons/day' round={true}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Thursday</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NU<COMPANY PRODUCT>Weekly[4].Value / 2000} suffix='tons/day' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SU<COMPANY PRODUCT>Weekly[4].Value / 2000} suffix='tons/day' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NU<COMPANY PRODUCT>Weekly[4].Value / 2000 + proddata.SU<COMPANY PRODUCT>Weekly[4].Value / 2000} suffix='tons/day' round={true}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Friday</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NU<COMPANY PRODUCT>Weekly[5].Value / 2000} suffix='tons/day' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SU<COMPANY PRODUCT>Weekly[5].Value / 2000} suffix='tons/day' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NU<COMPANY PRODUCT>Weekly[5].Value / 2000 + proddata.SU<COMPANY PRODUCT>Weekly[5].Value / 2000} suffix='tons/day' round={true}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Saturday</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NU<COMPANY PRODUCT>Weekly[6].Value / 2000} suffix='tons/day' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SU<COMPANY PRODUCT>Weekly[6].Value / 2000} suffix='tons/day' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NU<COMPANY PRODUCT>Weekly[6].Value / 2000 + proddata.SU<COMPANY PRODUCT>Weekly[6].Value / 2000} suffix='tons/day' round={true}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Sunday</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NU<COMPANY PRODUCT>Weekly[0].Value / 2000} suffix='tons/day' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SU<COMPANY PRODUCT>Weekly[0].Value / 2000} suffix='tons/day' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NU<COMPANY PRODUCT>Weekly[0].Value / 2000 + proddata.SU<COMPANY PRODUCT>Weekly[0].Value / 2000} suffix='tons/day' round={true}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Monday</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NU<COMPANY PRODUCT>Weekly[1].Value / 2000} suffix='tons/day' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SU<COMPANY PRODUCT>Weekly[1].Value / 2000} suffix='tons/day' round={true}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NU<COMPANY PRODUCT>Weekly[1].Value / 2000 + proddata.SU<COMPANY PRODUCT>Weekly[1].Value / 2000} suffix='tons/day' round={true}/>
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr className='textGrid_hr'></hr>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Weekly Average</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NU<COMPANY PRODUCT>WeeklyAVG / 2000} suffix='tons/day' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SU<COMPANY PRODUCT>WeeklyAVG / 2000} suffix='tons/day' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NU<COMPANY PRODUCT>WeeklyAVG / 2000 + proddata.SU<COMPANY PRODUCT>WeeklyAVG / 2000 } suffix='tons/day' round={false}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">Estimated Yearly</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NU<COMPANY PRODUCT>WeeklyAVG * 0.1825} suffix='tons/yr' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SU<COMPANY PRODUCT>WeeklyAVG * 0.1825} suffix='tons/yr' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={(proddata.NU<COMPANY PRODUCT>WeeklyAVG + proddata.SU<COMPANY PRODUCT>WeeklyAVG) * 0.1825} suffix='tons/yr' round={false}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">YTD Average</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NU<COMPANY PRODUCT>YTD / 2000} suffix='tons/day' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SU<COMPANY PRODUCT>YTD / 2000} suffix='tons/day' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={(proddata.NU<COMPANY PRODUCT>YTD + proddata.SU<COMPANY PRODUCT>YTD) / 2000} suffix='tons/day' round={false}/>
                </Col>
              </Row>
              <Row>
                <Col><p className="ptitle">YTD Yield</p></Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.NU<COMPANY PRODUCT>YTD / proddata.NUOilYTDYield} suffix='lbs/bu' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={proddata.SU<COMPANY PRODUCT>YTD / proddata.SUOilYTDYield} suffix='lbs/bu' round={false}/>
                </Col>
                <Col>
                  <ProductionFigureSmall figure={((proddata.NU<COMPANY PRODUCT>YTD / proddata.NUOilYTDYield) + (proddata.SU<COMPANY PRODUCT>YTD / proddata.SUOilYTDYield)) / 2} suffix='lbs/bu' round={false}/>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Production;
