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

const loadingAll2 = (props) => {
  if (props.loadingAll){
    return(
      <div className="spinner-border text-light" role="status">
        <span className="sr-only">Loading...</span>
      </div>        
    );
  } else {
    return(
      new Set(props.products.map((item) =>
      <span className="font-size-xxl mt-1">{item.sn}</span>
      ))
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

  const [testValues, setTestValues] = React.useState([]);
  const [testInfo, setTestInfo] = React.useState([]);
  const [activeSerial, setActiveSerial] = React.useState('SERIAL NUMBER');
  const [activeTN, setActiveTN] = React.useState('TEST NAME');
  const [activeTF, setActiveTF] = React.useState('TEST FIELD');
  const [activeTS, setActiveTS] = React.useState('ALL');

  function callAPI(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "sn": activeSerial })
    };
    fetch('http://0.0.0.0:4000/getBySerial',requestOptions)
        .then(res => res.json())
        .then((data) => {
          setTestInfo(data);
          console.log(data.map((test) => test.test_value));
          console.log(data.map((test) => test.test_name));
    });
  }

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
          console.log(data);
    });
  }
  const handleClick2 = event => () => {
    console.log(event)
    setActiveTN(event)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "test_field": activeTF })
    };
    fetch('http://0.0.0.0:4000/getByField',requestOptions)
        .then(res => res.json())
        .then((data) => {
          setTestInfo(data);
          console.log(data.map((test) => test.test_value));
          console.log(data.map((test) => test.test_name));
    });
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
          console.log(data);
    });
  }

  const handleClick4 = event => () => {
    console.log(event)
    setActiveTS(event)
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
        props.testFields.map((spec_name, index) => 
        <div role="menuitem"><a className="dropdown-item" key={index} onClick={handleClick3(spec_name)} >{spec_name}</a></div>
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
        <Row>
          <Col lg="4">
            <Card className="card-box bg-premium-dark border-0 text-light mb-5">
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
                        icon={['far', 'chart-bar']}
                        className="font-size-xl"
                      />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-box bg-midnight-bloom text-light mb-5">
              <CardBody>
                <div className="d-flex align-items-start">
                  <div className="font-weight-bold">
                    <small className="text-white-50 d-block mb-1 text-uppercase">
                      Failed Tests
                    </small>
                    <span className="font-size-xxl mt-1">{loadingFailed(props)}</span>
                  </div>
                  <div className="ml-auto">
                    <div className="bg-white text-center text-primary d-50 rounded-circle">
                      <FontAwesomeIcon
                        icon={['far', 'lightbulb']}
                        className="font-size-xl"
                      />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-box bg-plum-plate text-light mb-5">
              <CardBody>
                <div className="d-flex align-items-start">
                  <div className="font-weight-bold">
                    <small className="text-white-50 d-block mb-1 text-uppercase">
                      Warnings
                    </small>
                    <span className="font-size-xxl mt-1">{loadingAll(props)}</span>
                  </div>
                  <div className="ml-auto">
                    <div className="bg-white text-center text-primary d-50 rounded-circle">
                      <FontAwesomeIcon
                        icon={['far', 'chart-bar']}
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
                      {activeTF}
            </DropdownToggle>
                    <DropdownMenu >
                      {testFields(props)}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown tag="span" className="m-2">
                    <DropdownToggle color="second" caret>
                      {activeTS}
            </DropdownToggle>
                    <DropdownMenu >
                    <div role="menuitem"><a className="dropdown-item" onClick={handleClick4("PASS")} >PASS</a></div>
                    <div role="menuitem"><a className="dropdown-item" onClick={handleClick4("FAIL")} >FAIL</a></div>
                    <div role="menuitem"><a className="dropdown-item" onClick={handleClick4("WARNING")} >WARNING</a></div>
                    <div role="menuitem"><a className="dropdown-item" onClick={handleClick4("FATAL WARNING")} >FATAL WARNING</a></div>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <Button className="m-2" outline color="second" onClick={() => {
                            setActiveSerial("SERIAL NUMBER");
                            setActiveTF("TEST FIELD");
                            setTestValues([]);
                            setActiveTS("ALL");
                        }}>
                          CLEAR</Button>
                  </div>
                  </Col> 
                </TabPane>
                <TabPane tabId="2">
                <div className="mb-0 p-3">
                  <UncontrolledDropdown tag="span" className="m-2">
                    <DropdownToggle color="second" caret>
                      {activeTN}
            </DropdownToggle>
                    <DropdownMenu >
                      {testNames(props)}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  </div>  
                </TabPane>
                <TabPane tabId="3">
                <div className="mb-0 p-3">
                  <UncontrolledDropdown tag="span" className="m-2">
                    <DropdownToggle color="second" caret>
                      {activeTF}
            </DropdownToggle>
                    <DropdownMenu >
                      {testFields(props)}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  </div>  
                </TabPane>
            </TabContent>
            <DashboardDefaultSection5 testInfo={testInfo} testValues={testValues}/>
      </Fragment>
    );
  
}
