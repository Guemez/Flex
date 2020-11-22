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

import DashboardDefaultSection5 from 'example-components/DashboardDefault/DashboardDefaultSection5';

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


export default function LivePreviewExample(props) {



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
        <Chart options={options} series={series} type="line" />
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
        name: "Media",
        data: Array(base.length).fill(mean)
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
                        Search By Serial Number
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={clsx({active: activeTab === '2'})}
                        onClick={() => {
                            toggle('2');
                        }}
                    >
                        Search By Test Name
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={clsx({active: activeTab === '3'})}
                        onClick={() => {
                            toggle('3');
                        }}
                    >
                        Search By Test Field
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent className="mb-5" activeTab={activeTab}>
                <TabPane tabId="1">
                  <Col>
                  <div className="mb-0 p-3">
                  <UncontrolledDropdown tag="span" className="m-2">
                    <DropdownToggle color="second" caret>
                      {activeSerial}
            </DropdownToggle>
                    <DropdownMenu >
                      {serials(props)}
                    </DropdownMenu>
                  </UncontrolledDropdown>
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
                </TabPane>
                <TabPane tabId="2">
                </TabPane>
            </TabContent>
            {makeGraphs2(props)}
            {makeGraphs(props)}
            <DashboardDefaultSection5 testInfo={testInfo} testValues={testValues}/>
      </Fragment>
    );
  
}
