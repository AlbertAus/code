import React, { Component } from 'react';
import '../App.css';
import { Container, Row, Col, CardColumns, Card, Modal, Button } from 'react-bootstrap';
import PopUp from './PopUp';

class App extends Component {
  constructor(props) {
    super(props)
    this.toggleShow = this.toggleShow.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.updateselectedValue =this.updateselectedValue.bind(this);
    this.employee = {};

    this.state = {
      error: null,
      isLoaded: false,
      data: {},
      isShow: false,
      highLight: '',
      inputValue:'',
      selectedValue:'firstName'
    };
  }

  // showDetails will show the pop-up windows to show the employee deatils.
  toggleShow = (i) => {
    console.log("i is: ", i)
    if (Number.isInteger(i)) {
      this.employee = this.state.data.employees[i];
      this.setState({ highLight: this.state.data.employees[i].id });
    } else {
      this.employee = this.state.data.employees[0];
    }
    this.setState(state => ({ isShow: !state.isShow }));
  }

  // update the InputValue state
  updateInputValue=(evt) =>{
    this.setState({
      inputValue: evt.target.value
    });
  }

    // update the selectedValue state
    updateselectedValue=(evt) =>{
      this.setState({
        selectedValue: evt.target.value
      });
      console.log("selected value is: ",this.state.selectedValue);
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
      let className = null;

      let employeeInfoFilter = [];
      this.state.data.employees.map((employee,i) => {
        employee.dateJoined = employee.dateJoined.slice(0, 10)
        if (employee.id == this.state.highLight && this.state.isShow) {
          className = 'card card-highlight'
        } else {
          className = null
        }

        if ((this.state.selectedValue==="firstName" && employee.firstName.includes(this.state.inputValue)) || 
            (this.state.selectedValue==="lastName" &&  employee.lastName.includes(this.state.inputValue)) || this.state.inputValue=="") {
          employeeInfoFilter.push(
            <Col
              xs={12} sm={6} md={4}
              onClick={() => this.toggleShow(i)}
            >
              <div key={employee.id} className={className} style={{ marginBottom: 1 + 'rem' }}>
                <div class="card-body clearfix" style={{ padding: 0 }}>
                  <div class="row">
                    <div class="col-6 text-left">
                      <img class="img2" src={employee.avatar} alt={employee.firstName + " " + employee.lastName} />
                    </div>
                    <div class="col-6">
                      <h5 class="card-title">{employee.firstName} {employee.lastName}</h5>
                      <p class="card-text">{employee.bio.slice(0, 30)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          )
        }

      });


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
                  <select name="sort" placeholder="first name" onChange={this.updateselectedValue}>
                  <option value="firstName">first name</option>
                  <option value="lastName">last name</option>
                </select>
              </Col>

              <Col xs={12} sm={12} md={4}>
                Serach&nbsp; <input id="search-name" onChange={this.updateInputValue}></input>
              </Col>
            </Row>

            {/* Showing all the employees info in the Row with employeeInfo columns */}
            <Row>
              {employeeInfoFilter}
            </Row>

          </div>
        </Container >
      );
    }
  }
}
export default App;
