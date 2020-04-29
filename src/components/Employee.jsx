import React, { Component } from "react";

import { Table, Button, ButtonToolbar } from "react-bootstrap";
import { AddEmpModal } from "./AddEmpModal";
import { EditEmpModal } from "./EditEmpModal";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = { emps: [], addModalShow: false, editModalShow: false };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList() {
    fetch("https://localhost:44340/api/employee")
      .then(response => response.json())
      .then(data => {
        this.setState({ emps: data });
      });
  }
  componentDidUpdate() {
    this.refreshList();
  }
  deleteEmp(empid) {
    if (window.confirm("Are You Sure?")) {
      fetch("https://localhost:44340/api/employee/" + empid, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
    }
  }

  render() {
    const { emps, empid, empname, department, mailid, doj } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });

    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Mail ID</th>
              <th>Date of Joined</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {emps.map(emp => (
              <tr key={emp.EmployeeID}>
                <td>{emp.EmployeeID}</td>
                <td>{emp.EmployeeName}</td>
                <td>{emp.Department}</td>
                <td>{emp.MailID}</td>
                <td>{emp.DOJ}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="info"
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          empid: emp.EmployeeID,
                          empname: emp.EmployeeName,
                          department: emp.Department,
                          mailid: emp.MailID,
                          doj: emp.DOJ
                        })
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      className="mr-2"
                      onClick={() => this.deleteEmp(emp.EmployeeID)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({ addModalShow: true })}
          >
            Add Employee
          </Button>
          <AddEmpModal show={this.state.addModalShow} onHide={addModalClose} />
          <EditEmpModal
            show={this.state.editModalShow}
            onHide={editModalClose}
            empid={empid}
            empname={empname}
            department={department}
            mailid={mailid}
            doj={doj}
          />
        </ButtonToolbar>
      </div>
    );
  }
}
