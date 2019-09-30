import React, { Component } from 'react';
import '../App.css';
import { Container, Row, Col, CardColumns, Card, Modal, Button } from 'react-bootstrap';
import PopUp from './PopUp';

class App extends Component {
  constructor(props) {
    super(props)
    this.toggleShow = this.toggleShow.bind(this);
    this.employee={};

    this.state = {
      error: null,
      isLoaded: false,
      data: {},
      isShow: false,
      highLight : ''
    };
  }

  // showDetails will show the pop-up windows to show the employee deatils.
  toggleShow = (i) => {    
    console.log("i is: ",i)    
    if(Number.isInteger(i)){
      this.employee =this.state.data.employees[i];
      this.setState({highLight: this.state.data.employees[i].id});
    }else{
      this.employee =this.state.data.employees[0];
    }    
    this.setState(state => ({isShow: !state.isShow }));
  }

  // Using componentDidMount to fetch the sample-data.json file.
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

      // Generate the employee Info to each Column, then use in the Row.
      const employeeInfo = [];
      let className =null;
      for (let i = 0; i < data.employees.length; i++) {
        data.employees[i].dateJoined=data.employees[i].dateJoined.slice(0,10);
        if(data.employees[i].id==this.state.highLight && this.state.isShow){
           className= 'card card-highlight'
        }else{
          className=null 
        }
        employeeInfo.push(
          <Col            
            xs={12} sm={6} md={4}
            onClick={() => this.toggleShow(i)}
          >
            <div key={data.employees[i].id} className={className}  style={{ marginBottom: 1 + 'rem' }}>
              <div class="card-body clearfix" style={{ padding: 0 }}>
                <div class="row">
                  <div class="col-6 text-left">
                    <img class="img2" src={data.employees[i].avatar} alt={data.employees[i].firstName + " " + data.employees[i].lastName} />
                  </div>
                  <div class="col-6">
                    <h5 class="card-title">{data.employees[i].firstName} {data.employees[i].lastName}</h5>
                    <p class="card-text">{data.employees[i].bio.slice(0, 30)}</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        )
      }
      return (
        <Container>

          {/* Show or hide the PopUp window */}
          <PopUp employee={this.employee} isShow={this.state.isShow} handleClick={this.toggleShow} />

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
                    Since {data.companyInfo.companyEst.slice(0, 10)}
                  </h4>
                </Col>
              </Row>
            </div>

            <hr />

            <Row>
              <Col xs={6} sm={6} md={4}>
                <h3 class="text-left">Our Employees</h3>
              </Col>

              <Col xs={6} sm={6} md={4}>
                Sort by:&nbsp;
                  <select name="sort" placeholder="first name">
                  <option value="firstName">first name</option>
                  <option value="lastName">last name</option>
                </select>
              </Col>

              <Col xs={12} sm={12} md={4}>
                Serach&nbsp; <input></input>
              </Col>
            </Row>

            {/* Showing all the employees info in the Row with employeeInfo columns */}
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
