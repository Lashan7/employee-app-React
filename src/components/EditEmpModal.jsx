import React, { Component } from "react";

import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";

export class EditEmpModal extends Component {
  constructor(props) {
    super(props);

    this.state = { deps: [], snackbaropen: false, snackbarmsg: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://localhost:44340/api/department")
      .then(response => response.json())
      .then(data => {
        this.setState({ deps: data });
      });
  }
  snackbarClose = event => {
    this.setState({ snackbaropen: false });
  };

  handleSubmit(event) {
    event.preventDefault();
    //alert(event.target.EmployeeName.value);
    fetch("https://localhost:44340/api/employee", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        EmployeeID: event.target.EmployeeID.value,
        EmployeeName: event.target.EmployeeName.value,
        Department: event.target.Department.value,
        MailID: event.target.MailID.value,
        DOJ: event.target.DOJ.value
      })
    })
      .then(res => res.json())
      .then(
        result => {
          //alert(result);
          this.setState({ snackbaropen: true, snackbarmsg: result });
        },
        error => {
          //alert("Failed");
          this.setState({ snackbaropen: true, snackbarmsg: "Faild" });
        }
      );
  }

  render() {
    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.snackbaropen}
          autoHideDuration={3000}
          onClose={this.snackbarClose}
          message={<span id="message-id">{this.state.snackbarmsg}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.snackbarClose}
            >
              x
            </IconButton>
          ]}
        />
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Employee
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="EmployeeID">
                    <Form.Label>Employee ID:</Form.Label>
                    <Form.Control
                      type="text"
                      name="EmployeeID"
                      required
                      disabled
                      defaultValue={this.props.empid}
                      placeholder="Employee ID"
                    />
                  </Form.Group>
                  <Form.Group controlId="EmployeeName">
                    <Form.Label>Employee Name:</Form.Label>
                    <Form.Control
                      type="text"
                      name="EmployeeName"
                      required
                      defaultValue={this.props.empname}
                      placeholder="Employee Name"
                    />
                  </Form.Group>
                  <Form.Group controlId="Department">
                    <Form.Label>Department:</Form.Label>
                    <Form.Control as="select">
                      {this.state.deps.map(dep => (
                        <option key={dep.DepartmentID}>
                          {dep.DepartmentName}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="MailID">
                    <Form.Label>Mail ID:</Form.Label>
                    <Form.Control
                      type="text"
                      name="MailID"
                      required
                      defaultValue={this.props.mailid}
                      placeholder="Mail ID"
                    />
                  </Form.Group>
                  <Form.Group controlId="DOJ">
                    <Form.Label>Date of Joined:</Form.Label>
                    <Form.Control
                      type="date"
                      name="DOJ"
                      required
                      defaultValue={this.props.doj}
                      placeholder="DOJ"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Update Employee
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
