import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col, CardColumns, Card } from 'react-bootstrap';

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
      for (let i = 0; i < data.employees.length; i++) {
        employeeInfo.push(
          // <Col key={data.employees[i].id} xs={6} sm={6} md={4}>
          //   <div class="clearfix div-img">
          //     <img class="img2" src={data.employees[i].avatar} alt={data.employees[i].firstName + " " + data.employees[i].lastName}
          //       style={{
          //         width: 80 + 'px',
          //         height: 80 + 'px'
          //       }}
          //     />
          //     {data.employees[i].firstName} {data.employees[i].lastName}<br />
          //     {data.employees[i].bio.slice(0, 30)}
          //   </div>
          // </Col>

          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-6 text-right">
                    <img class="img2"  src={data.employees[i].avatar} alt={data.employees[i].firstName + " " + data.employees[i].lastName}
                      style={{
                        width: 80 + 'px',
                        height: 80 + 'px'
                      }}
                    />
                  </div>
                  <div class="col-sm-6">
                    <h5 class="card-title">{data.employees[i].firstName} {data.employees[i].lastName}</h5>
                    <p class="card-text">{data.employees[i].bio.slice(0, 30)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

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

            <Row>
              <Col xs={6} sm={6} md={5}>
                <h3 class="text-left">Our Employees</h3>
              </Col>

              <Col xs={6} sm={6} md={4}>
                <div class="option-right">
                  Sort by:&nbsp;
                  <select name="sort" placeholder="first name">
                    <option value="firstName">first name</option>
                    <option value="lastName">last name</option>
                  </select>
                </div>
              </Col>

              <Col xs={6} sm={6} md={3}>
                <div class="option-right">
                  Serach&nbsp; <input></input>
                </div>
              </Col>
            </Row>
            <Row>
              {employeeInfo}
            </Row>
          </div>
        </Container >
      );
    }
  }
}
export default App;
