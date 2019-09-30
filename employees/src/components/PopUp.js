import React from 'react';
import '../App.css';
import { Container, Row, Col, CardColumns, Card, Modal, Button } from 'react-bootstrap';

class PopUp extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.state = {
      show: false,
      setShow: false,
    }
  }

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  render() {
    
    return (

      <div>

        <Modal show={this.props.isShow} onHide={this.props.handleClick} >
          <div class="closeBtn" onClick={this.props.handleClick}><h4>X</h4></div>
          <Container>
            <Row>
              <Col xs={3} sm={3} md={3}>
                <p>
                  <img class="img3"
                    onClick={this.props.handleClick}
                    src={this.props.employee.avatar}
                    alt={this.props.employee.firstName}
                  />
                </p>
                <p class="smallFont">{this.props.employee.jobTitle}</p>
                <p class="smallFont">{this.props.employee.age}</p>
                <p class="smallFont">{this.props.employee.dateJoined} </p>
              </Col>
              <Col xs={9} sm={9} md={9}>
                <Modal.Header style={{marginTop:5 +'rem', marginLeft:1.5 + 'rem'}}>
                  <Modal.Title>{this.props.employee.firstName}  {this.props.employee.lastName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.employee.bio}</Modal.Body>
              </Col>
            </Row>
          </Container>

        </Modal>



      </div>
    );
  }
}

export default PopUp