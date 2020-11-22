import React, { Fragment, useState } from 'react';

import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Row,
   Col, 
   CardBody, 
   Card, 
   UncontrolledDropdown, 
   DropdownToggle, 
   DropdownMenu, 
   Nav, 
   NavItem, 
   NavLink, 
   TabContent, 
   TabPane,
   Button } from 'reactstrap';

import Chart from 'react-apexcharts';

const loadingPassed = (props) => {
  if (props.loadingPassed){
    return(
      <div className="spinner-border text-light" role="status">
        <span className="sr-only">Loading...</span>
      </div>        
    );
  } else {
    return(
      <span className="font-size-xxl mt-1">{props.passed.length}</span>
    );
  }
};

const loadingFailed = (props) => {
  if (props.loadingFailed){
    return(
      <div className="spinner-border text-light" role="status">
        <span className="sr-only">Loading...</span>
      </div>        
    );
  } else {
    return(
      <span className="font-size-xxl mt-1">{props.failed.length}</span>
    );
  }
};

const loadingLimits = (props) => {
  if (props.loadingLimits){
    return(
      <div className="spinner-border text-light" role="status">
        <span className="sr-only">Loading...</span>
      </div>        
    );
  } else {
    return(
      <span className="font-size-xxl mt-1">{props.limits.filter(item => item.warning == true ).length}</span>
    );
  }
};

const loadingAll = (props) => {
  if (props.loadingAll){
    return(
      <div className="spinner-border text-light" role="status">
        <span className="sr-only">Loading...</span>
      </div>        
    );
  } else {
    return(
      <span className="font-size-xxl mt-1">{props.products.length}</span>
    );
  }
};

const displayFailed = (props) => {
  return (
    props.failed.map( item => 
    <span className="font-size-l mt-1">{item.sn}{item.test_name}{item.spec_name}</span>
    )
  );
}

const displayWarnings = (props) => {
  return (
    props.limits.filter(item => item.warning == true ).map( item => 
    <span className="font-size-l mt-1">{item.sn}{item.test_name}{item.spec_name}</span>
    )
  );
}


export default function LivePreviewExample(props) {

  function diferencia (arr) {
    if (typeof arr != "undefined"){
      var newarr = Array(38).fill(0)
      for(var x = 0; x < arr.length-1; x++){
        newarr[x] = arr[x+1] - arr[x]
      }
      return newarr
    }
  }



  const makeGraphs = (props) => {
    const options = {
      xaxis: {
        categories: props.products.filter(item => item.sn == activeSerial).filter(item => item.test_name == activeTN).map(item => item.spec_name)
      }
    };
    const series = [
      {
        name: activeTN,
        data: props.products.filter(item => item.sn == activeSerial).filter(item => item.test_name == activeTN).map(item => item.test_value).map(n => parseFloat(n).toFixed(4))
      }
    ];
    return (
      <Fragment>
        <Chart options={options} series={series} type="area" />
      </Fragment>
    );
  }

  const makeGraphs2 = (props) => {

    const base = props.products.filter(item => item.test_name == activeTN).filter(item => item.spec_name == activeTF)
    const mean = (base.map(item => item.test_value).map(n => parseFloat(n)).reduce((acc, val) => acc + val, 0) / base.length ) 

    const options = {
      xaxis: {
        categories: base.map(item => item.sn)
      }
    };
    const series = [
      {
        name: activeTN,
        data: base.map(item => item.test_value).map(n => parseFloat(n).toFixed(4))
      },
      {
        name: "Mean",
        data: Array(base.length).fill(mean)
      }
    ];
    return (
      <Fragment>
        <Chart options={options} series={series} type="line" />
      </Fragment>
    );
  }


  const makeGraphs3 = (props) => {
    
    const base = props.limits.filter(item => item.test_name == activeTN).filter(item => item.spec_name == activeTF)
    const mean = (base.map(item => item.test_value).map(n => parseFloat(n)).reduce((acc, val) => acc + val, 0) / base.length )

    const minArr = base.map(item => item.limits_min).map(n => parseFloat(n))
    const minMean = (minArr.reduce((acc, val) => acc + val, 0) / minArr.length)
    const maxArr = base.map(item => item.limits_max).map(n => parseFloat(n))
    const maxMean = (maxArr.reduce((acc, val) => acc + val, 0) / maxArr.length)
    const minVal =  minMean
    const maxVal =  maxMean
    const r = (maxVal-minVal)/11.0
    const primero = base.map(item => item.test_value).map(n => parseFloat(n)).filter(n => n > minVal).filter(n => n < (minVal+r)).length
    const segundo = base.map(item => item.test_value).map(n => parseFloat(n)).filter(n => n > minVal+r).filter(n => n < (minVal+r*2)).length
    const tercero = base.map(item => item.test_value).map(n => parseFloat(n)).filter(n => n > minVal+r*2).filter(n => n < (minVal+r*3)).length
    const cuarto = base.map(item => item.test_value).map(n => parseFloat(n)).filter(n => n > minVal+r*3).filter(n => n < (minVal+r*4)).length
    const quinto = base.map(item => item.test_value).map(n => parseFloat(n)).filter(n => n > minVal+r*4).filter(n => n < (minVal+r*5)).length
    const sexto = base.map(item => item.test_value).map(n => parseFloat(n)).filter(n => n > minVal+r*5).filter(n => n < (minVal+r*6)).length
    const septimo = base.map(item => item.test_value).map(n => parseFloat(n)).filter(n => n > minVal+r*6).filter(n => n < (minVal+r*7)).length
    const ocho = base.map(item => item.test_value).map(n => parseFloat(n)).filter(n => n > minVal+r*7).filter(n => n < (minVal+r*8)).length
    const nueve = base.map(item => item.test_value).map(n => parseFloat(n)).filter(n => n > minVal+r*8).filter(n => n < (minVal+r*9)).length
    const diez = base.map(item => item.test_value).map(n => parseFloat(n)).filter(n => n > minVal+r*9).filter(n => n < (minVal+r*10)).length
    const once = base.map(item => item.test_value).map(n => parseFloat(n)).filter(n => n > minVal+r*10).filter(n => n < (minVal+r*11)).length
    const ds = Math.sqrt(base.map(item => item.test_value).map(n => parseFloat(n)).map(n => Math.pow(n-mean,2)).reduce((acc, val) => acc + val, 0) / base.length )
    const options = {
      xaxis: {
        categories: [minVal.toString(), (minVal+r).toString(), (minVal+r*2).toString(), (minVal+r*3).toString(), (minVal+r*4).toString(), (minVal+r*5).toString(), (minVal+r*6).toString(), (minVal+r*7).toString(), (minVal+r*8).toString(), (minVal+r*9).toString(), (minVal+r*10).toString(), maxVal.toString()]
      }
    };
    const series = [
      {
        name: activeTN,
        data: [primero,segundo,tercero,cuarto,quinto, sexto, septimo, ocho, nueve, diez, once]
      }
    ];
    return (
      <Fragment>
        <Chart options={options} series={series} type="bar" />
      </Fragment>
    );
  }

  const makeGraphs4 = (props) => {
    
    const base = props.products.filter(item => item.test_name == activeTN).filter(item => item.spec_name == activeTF)
    const mean = (base.map(item => item.test_value).map(n => parseFloat(n)).reduce((acc, val) => acc + val, 0) / base.length ) 
    const tmp1 = base.map(item => item.test_value).map(n => parseFloat(n))
    const tmp2 = diferencia(tmp1)
    const dmean = tmp2.reduce((acc, val) => Math.abs(acc) + Math.abs(val), 0) / tmp2.length 

    const options = {
      xaxis: {
        categories: [0]
      }
    };
    const series = [
      {
        name: activeTN,
        data: tmp2
      },
      {
        name: "Moving Range",
        data: Array(base.length).fill(dmean/4.301)
      }
    ];
    return (
      <Fragment>
        <Chart options={options} series={series} type="line" />
      </Fragment>
    );
  }


  const [testValues, setTestValues] = React.useState([]);
  const [testInfo, setTestInfo] = React.useState([]);
  const [activeSerial, setActiveSerial] = React.useState('SERIAL NUMBER');
  const [activeTN, setActiveTN] = React.useState('TEST NAME');
  const [activeTF, setActiveTF] = React.useState('TEST FIELD');
  const [activeTS, setActiveTS] = React.useState('TEST STATUS');
  const [fields, setFields] = React.useState([]);

  const handleClick = event => () => {
    console.log(event)
    setActiveSerial(event)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "sn": activeSerial })
    };
    fetch('http://0.0.0.0:4000/getBySerial',requestOptions)
        .then(res => res.json())
        .then((data) => {
          setTestInfo(data);
          console.log(testInfo);
    });
  }
  const handleClick2 = event => () => {
    console.log(event)
    setActiveTN(event)
    setTestInfo(props.products.filter( test => test.test_name == activeTN))
    console.log(testInfo)
    setFields(Array.from(new Set(props.products.filter( test => test.test_name == activeTN).map(item => item.spec_name))))
    console.log(fields)
    makeGraphs2(props)
  }
  const handleClick3 = event => () => {
    console.log(event)
    setActiveTF(event)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "test_field": activeTF })
    };
    fetch('http://0.0.0.0:4000/getByField',requestOptions)
        .then(res => res.json())
        .then((data) => {
          setTestInfo(data);
          console.log(testInfo);
    });
    console.log("====================")
    console.log(props.products.filter(item => item.test_name == activeTN).filter(item => item.spec_name == activeTF).map(item => item.sn))
  }

  const handleClick4 = event => () => {
    setActiveTS(event)
    if (activeTS == "WARNING"){
      setTestInfo(props.limits.filter(item => item.warning == true))
    } else if(activeTS == "PASS"){
        setTestInfo(props.products.filter(item => item.test_result == "Pass"))
      } else if (activeTS == "FAIL"){
        setTestInfo(props.products.filter(item => item.test_result == "Fail"))
      } else {
        setTestInfo(props.products)
    }
    console.log(testInfo)
  }

  const serials = (props) => {
    if (props.loadingSerials){
      return(
        <div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>        
      );
    } else {
      return(
        props.serials.map((sn, id) => 
        <div role="menuitem"><a className="dropdown-item" key={id} onClick={handleClick(sn)} >{sn}</a></div>
      )
      );
    }
  }

  const testNames = (props) => {
    if (props.loadingTestNames){
      return(
        <div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>        
      );
    } else {
      return(
        props.testNames.map((test_name, index) => 
        <div role="menuitem"><a className="dropdown-item" key={index} onClick={handleClick2(test_name)} >{test_name}</a></div>
      )
      );
    }
  }

  const testFields = (props) => {
    if (props.loadingTestFields){
      return(
        <div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>        
      );
    } else {
      return(
        fields.map( item => 
        <div role="menuitem"><a className="dropdown-item" onClick={handleClick3(item)} >{item}</a></div>
      )
      );
    }
  }

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
      if (activeTab !== tab) setActiveTab(tab);
  }
    return (
      <Fragment>
        <Row className="padding-top-cards">
          <Col lg="4">
            <Card className="card-box bg-happy-green border-0 text-light mb-5">
              <CardBody>
                <div className="d-flex align-items-start">
                  <div className="font-weight-bold">
                    <small className="text-white-50 d-block mb-1 text-uppercase">
                      Passed Tests
                    </small>
                    <span className="font-size-xxl mt-1">{loadingPassed(props)}</span>
                  </div>
                  <div className="ml-auto">
                    <div className="bg-white text-center text-success d-50 rounded-circle">
                      <FontAwesomeIcon
                        icon={['far', 'check-circle']}
                        className="font-size-xl"
                      />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-box bg-love-kiss text-light mb-5">
              <CardBody>
                <div className="d-flex align-items-start">
                  <div className="font-weight-bold">
                    <small className="text-white-50 d-block mb-1 text-uppercase">
                      Failed Tests
                    </small>
                    <span className="font-size-xxl mt-1">{loadingFailed(props)}</span>
                  </div>
                  <div className="ml-auto">
                    <div className="bg-white text-center text-danger d-50 rounded-circle">
                      <FontAwesomeIcon
                        icon={['fas', 'times-circle']}
                        className="font-size-xl"
                      />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-box bg-sunny-morning text-light mb-5">
              <CardBody>
                <div className="d-flex align-items-start">
                  <div className="font-weight-bold">
                    <small className="text-white-50 d-block mb-1 text-uppercase">
                      Warnings
                    </small>
                    <span className="font-size-xxl mt-1">{loadingLimits(props)}</span>
                  </div>
                  <div className="ml-auto">
                    <div className="bg-white text-center text-warning d-50 rounded-circle">
                      <FontAwesomeIcon
                        icon={['fas', 'exclamation-triangle']}
                        className="font-size-xl"
                      />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div className="divider mb-4" />
        <Nav tabs>
                <NavItem>
                    <NavLink
                        className={clsx({active: activeTab === '1'})}
                        onClick={() => {
                            toggle('1');
                        }}
                    >
                        Search Test
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={clsx({active: activeTab === '2'})}
                        onClick={() => {
                            toggle('2');
                        }}
                    >
                        See Failed
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={clsx({active: activeTab === '3'})}
                        onClick={() => {
                            toggle('3');
                        }}
                    >
                        See Warnings
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent className="mb-5" activeTab={activeTab}>
                <TabPane tabId="1">
                  <Col>
                  <div className="mb-0 p-3">
                  <UncontrolledDropdown tag="span" className="m-2">
                    <DropdownToggle color="second" caret>
                      {activeTN}
            </DropdownToggle>
                    <DropdownMenu >
                      {testNames(props)}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                   <UncontrolledDropdown tag="span" className="m-2">
                    <DropdownToggle color="second" caret>
                      {activeTF}
            </DropdownToggle>
                    <DropdownMenu >
                      {testFields(props)}
                    </DropdownMenu>
                  </UncontrolledDropdown>  
                  <UncontrolledDropdown tag="span" className="m-2">
                    <DropdownToggle color="second" caret>
                      {activeSerial}
            </DropdownToggle>
                    <DropdownMenu >
                      {serials(props)}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  {/*<UncontrolledDropdown tag="span" className="m-2">
                    <DropdownToggle color="second" caret>
                      {activeTS}
            </DropdownToggle>
                    <DropdownMenu >
                    <div role="menuitem"><a className="dropdown-item" onClick={handleClick4("ALL")} >ALL</a></div>
                    <div role="menuitem"><a className="dropdown-item" onClick={handleClick4("PASS")} >PASS</a></div>
                    <div role="menuitem"><a className="dropdown-item" onClick={handleClick4("FAIL")} >FAIL</a></div>
                    <div role="menuitem"><a className="dropdown-item" onClick={handleClick4("WARNING")} >WARNING</a></div>
                    </DropdownMenu>
                      </UncontrolledDropdown> */}
                  <Button className="m-2" outline color="second" onClick={() => {
                            setActiveSerial("SERIAL NUMBER");
                            setActiveTF("TEST FIELD");
                            setActiveTN("TEST NAME");
                            setTestValues([]);
                            setActiveTS("TEST STATUS");
                        }}>
                          CLEAR</Button>
                  </div>
                  </Col> 
                  <Col>
                  <Row className="padding-top-cards"></Row>
                  <h2>I CHART</h2>
                  <Card>{makeGraphs2(props)}</Card>
                  <Row className="padding-top-graphs"></Row>
                  <h2>CAPABILITY HISTOGRAM</h2>
                  <Card>{makeGraphs3(props)}</Card>
                  <Row className="padding-top-graphs"></Row>
                  <h2>MOVING RANGE CHART</h2>
                  <Card>{makeGraphs4(props)}</Card>
                  <Row className="padding-top-graphs"></Row>
                  <h2>OBSERVATIONS</h2>
                  <Card>{makeGraphs(props)}</Card>
                  </Col>
                </TabPane>
                <TabPane tabId="2">
                  {displayFailed(props)}
                </TabPane>
                <TabPane tabId="3">
                  {displayWarnings(props)}
                </TabPane>
            </TabContent>
      </Fragment>
    );
  
}
