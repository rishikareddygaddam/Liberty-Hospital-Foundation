import React, { useState, useEffect } from "react";
import { unapproved, approvalAction } from "api/login";
import { Table } from "reactstrap";
import Header from "../Header";

export default function EmployeeApproval() {
  const [users, setUsers] = useState([]);
  const userDetails = localStorage.user ? JSON.parse(localStorage.user) : null;
  const type = userDetails?.type;

  useEffect(() => {
    async function getData() {
      let res = await unapproved();
      let dataList = res.data;
      setUsers(dataList);
    }
    if (type === "admin") getData();
  }, []);

  const action = async (id, action) => {
    try {
      await approvalAction({
        id,
        action,
      });
      setUsers(users.filter((e) => e.id != id));
    } catch (ex) {}
  };

  return (
    <div>
      <Header />
      <div className="grant-list approval-list">
        <h3>Employee Approval</h3>
        <Table striped>
          <tr>
            <th>Employee Name</th>
            <th>Actions</th>
          </tr>
          <tbody>
            {users.map((e) => (
              <tr>
                <td>{e.name}</td>
                <td>
                  <div className="approval-actions">
                    <button onClick={() => action(e.id, "approved")}>
                      Approve
                    </button>
                    <button onClick={() => action(e.id, "rejected")}>
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
