import React from 'react';
import style from '../App.css';
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
    const { data } = this.props;

    return (

      <div>
        <Modal show={this.props.isShow} onHide={this.props.handleClick} >
        <img
            onClick={this.props.handleClick}
            src={this.props.employee.avatar}
            alt={this.props.employee.firstName}
          />

          <Modal.Header closeButton>
            <Modal.Title>{this.props.employee.firstName}  {this.props.employee.lastName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.employee.bio}</Modal.Body>
        </Modal>

      </div>
    );
  }
}

export default PopUp