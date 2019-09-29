import React, { Component } from 'react';
import './App.css';

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
      return (
        <div className="App">
          {console.log("data is: ", data)}
          Company Name<br />
          {data.companyInfo.companyName} <br />
          {data.companyInfo.companyMotto} <br />
          {data.companyInfo.companyEst} <br />
          Our Employees
          <ul>
            {data.employees.map(employee => (
              <li key={employee.id}>
                <img src={employee.avatar} alt={employee.firstName + " " + employee.lastName}/>
                {employee.firstName} {employee.lastName}<br />
                {employee.bio.slice(0,50)}...
              </li>
            ))
            }
          </ul>
        </div>
      );
    }
  }
}
export default App;
