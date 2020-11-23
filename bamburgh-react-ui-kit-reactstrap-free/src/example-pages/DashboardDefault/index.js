import React, { Fragment } from 'react';

import { PageTitle } from '../../layout-components';
import {
  Button,
  Input,
  Form,
  Label,
  FormGroup, 
  FormText, 
} from 'reactstrap';

import DashboardDefaultSection1 from '../../example-components/DashboardDefault/DashboardDefaultSection1';

import XLSX from 'xlsx';

export default function DashboardDefault() {
  const [open3, setOpen3] = React.useState(false);
  const [file, setFile] = React.useState();
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

  const handleSubmit3 = () => {
    readExcel(file);
    setOpen3(false);
  };
  
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

    fetch('http://0.0.0.0:4000/getLimited')
    .then(res => res.json())
    .then((data) => {
      setLimits(data);
      setTestNames(Array.from(new Set(data.map(item => item.test_name))))
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
      //setTestNames(data);
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

  const readExcel= async(file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader= new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload= (e)=>{
        const bufferArray= e.target.result;
        const wb= XLSX.read(bufferArray, {type:'buffer'});
        const wsname= wb.SheetNames[0];
        const ws= wb.Sheets[wsname];
        const data= XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror= ((error)=>{
        reject(error);
      });
    });

    promise.then(async (d)=>{
      fetch('http://0.0.0.0:4000/addXlsx',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          node_array: d
        })
      })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
      }).catch(console.log);
      
    })
  };

  return (
    <Fragment>
        <PageTitle
          titleHeading="Default"
        />

        <DashboardDefaultSection1 failed={failed} passed={passed} loadingPassed={loadingPassed} loadingFailed={loadingFailed} products={products} serials={serials} loadingAll={loadingAll} loadingSerials={loadingSerials} loadingTestNames={loadingTestNames} loadingTestFields={loadingTestFields} testNames={testNames} testFields={testFields} limits={limits} loadingLimits={loadingLimits}/>
        <Form className="padding-excel">
          <FormGroup>
            <Label for="exampleFile">File</Label>
            <Input type="file" name="file" id="exampleFile" onChange={(e)=>{
                const file = e.target.files[0];
                console.log(file);
                setFile(file);
              }} />
            <FormText color="muted">
              Please attatch the .xlsx file   
            </FormText>
          </FormGroup>
          <Button 
            className="button-add"
            variant="contained"
            color="first"
            onClick={handleSubmit3}>
            Submit
          </Button>
        </Form>
      </Fragment>
  );
}