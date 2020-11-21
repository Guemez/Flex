import React, { Fragment } from 'react';

import Chart from 'react-apexcharts';

import { Card, Row, Col, CardBody } from 'reactstrap';

export default function LivePreviewExample(props) {

    const [testInfo, setTestInfo] = React.useState([]);
    const [testValues, setTestValues] = React.useState([]);
    
  const options = {
    xaxis: {
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  };
  const series = [
    {
        name: 'series-1',
      },
      {
        name: 'series-2',
      }
  ];

  return (
    <Fragment>
        <Row>
            <Col xl="6">
            <Card className="card-box mb-5">
            <div className="card-header pr-2">
                <div className="card-header--title">NAME OF TEST</div>
                <div className="card-header--actions">
                </div>
            </div>
            <CardBody>
                <Chart options={options} series={series} type="area" />
            </CardBody>
            </Card>
        </Col>
      </Row>
    </Fragment>
  );
}
