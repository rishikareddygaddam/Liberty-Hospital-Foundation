import React from "react";
import { Link } from "react-router-dom";

export default function Approval() {
  return (
    <div className="approval-container">
      <div>
        <div>Awaiting approval from the admin</div>
        <Link to="/login">Login with different account.</Link>
      </div>
    </div>
  );
}
