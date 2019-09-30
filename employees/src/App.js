import React, { Component } from 'react';
import './App.css';
import { Alert, Container, Row, Col } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isLoaded: false,
      data: {}
    };
  }

  componentDidMount() {
    fetch('./data/sample-data.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then((response) => response.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return (
        <div>
          Error: {error.message}
        </div>);
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const employeeInfo = [];
      for (let i = 0; i < data.employees.length - 2; i = i + 3) {
        employeeInfo.push(
          <Row>
            <Col key={data.employees[i].id} xs={6} md={4}>
              <img src={data.employees[i].avatar} alt={data.employees[i].firstName + " " + data.employees[i].lastName} />
              {data.employees[i].firstName} {data.employees[i].lastName}<br />
              {data.employees[i].bio.slice(0, 50)}...
            </Col>

            <Col key={data.employees[i + 1].id} xs={6} md={4}>
              <img src={data.employees[i + 1].avatar} alt={data.employees[i + 1].firstName + " " + data.employees[i + 1].lastName} />
              {data.employees[i + 1].firstName} {data.employees[i + 1].lastName}<br />
              {data.employees[i + 1].bio.slice(0, 50)}...
            </Col>

            <Col key={data.employees[i + 2].id} xs={6} md={4}>
              <img src={data.employees[i + 2].avatar} alt={data.employees[i + 2].firstName + " " + data.employees[i + 2].lastName} />
              {data.employees[i + 2].firstName} {data.employees[i + 2].lastName}<br />
              {data.employees[i + 2].bio.slice(0, 50)}...
            </Col>
          </Row>
        )
      }
      return (
        <Container>
          <div className="App">
            {console.log("data is: ", data)}
            <div class="page-header">
              <p style={{ textAlign: 'left' }}><h2>{data.companyInfo.companyName}</h2></p>
              <Row>
                <Col>
                  <h4 class="text-left">
                    {data.companyInfo.companyMotto}
                  </h4>
                </Col>
                <Col>
                  <h4 class="text-right">
                    Since {data.companyInfo.companyEst}
                  </h4>
                </Col>
              </Row>
            </div>

            <hr />
            <h3  class="text-left">Our Employees</h3>
            {employeeInfo}
          </div>
        </Container>
      );
    }
  }
}
export default App;
