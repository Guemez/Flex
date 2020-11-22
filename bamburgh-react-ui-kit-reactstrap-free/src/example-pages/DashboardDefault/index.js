import React, { Fragment, Component } from 'react';

import { PageTitle } from '../../layout-components';

import DashboardDefaultSection1 from '../../example-components/DashboardDefault/DashboardDefaultSection1';
import DashboardDefaultSection5 from '../../example-components/DashboardDefault/DashboardDefaultSection5';

export default function DashboardDefault() {
  const [open3, setOpen3] = React.useState(false);
  const [failed, setFailed] = React.useState([]);
  const [passed, setPassed] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [loadingFailed, setLoadingFailed] = React.useState(true);
  const [loadingPassed, setLoadingPassed] = React.useState(true);
  const [loadingAll, setLoadingAll] = React.useState(true);
  const [loadingSerials, setLoadingSerials] = React.useState(true);
  const [serials, setSerials] = React.useState([]);
  const [loadingTestNames, setLoadingTestNames] = React.useState(true);
  const [testNames, setTestNames] = React.useState([]);
  const [loadingTestFields, setLoadingTestFields] = React.useState(true);
  const [testFields, setTestFields] = React.useState([]);
  const [loadingLimits, setLoadingLimits] = React.useState(true);
  const [limits, setLimits] = React.useState([]);

  const descriptionElementRef = React.useRef(null);
  
  React.useEffect(() => {
    fetch('http://0.0.0.0:4000/getFailed')
    .then(res => res.json())
    .then((data) => {
      setFailed(data);
      setLoadingFailed(false);
    })

    fetch('http://0.0.0.0:4000/getPassed')
    .then(res => res.json())
    .then((data) => {
      setPassed(data);
      setLoadingPassed(false);
    })

    fetch('http://0.0.0.0:4000/getAllTests')
    .then(res => res.json())
    .then((data) => {
      setProducts(data);
      setLoadingAll(false);
    })

    fetch('http://0.0.0.0:4000//getLimited')
    .then(res => res.json())
    .then((data) => {
      setLimits(data);
      setLoadingLimits(false);
    })
    
    fetch('http://0.0.0.0:4000/getSerialNos')
    .then(res => res.json())
    .then((data) => {
      setSerials(data);
      setLoadingSerials(false);
    })

    fetch('http://0.0.0.0:4000/getTestNames')
    .then(res => res.json())
    .then((data) => {
      setTestNames(data);
      setLoadingTestNames(false);
    })

    fetch('http://0.0.0.0:4000/getTestFields')
    .then(res => res.json())
    .then((data) => {
      setTestFields(data);
      setLoadingTestFields(false);
    })


    if (open3) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open3]);

  return (
    <Fragment>
        <PageTitle
          titleHeading="Default"
        />

        <DashboardDefaultSection1 failed={failed} passed={passed} loadingPassed={loadingPassed} loadingFailed={loadingFailed} products={products} serials={serials} loadingAll={loadingAll} loadingSerials={loadingSerials} loadingTestNames={loadingTestNames} loadingTestFields={loadingTestFields} testNames={testNames} testFields={testFields} limits={limits} loadingLimits={loadingLimits}/>
        <DashboardDefaultSection5 />
      </Fragment>
  );
}