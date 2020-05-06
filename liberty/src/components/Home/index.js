import React, { useState } from "react";
import { Link } from "react-router-dom";

const userItems = [
  {
    name: "Scholarship",
    route: "/scholarship",
  },
  {
    name: "Grants",
    route: "/grant",
  },
];

const employeeItems = [
  {
    name: "Scholarship",
    route: "/scholarship/applications",
  },
  {
    name: "Grants",
    route: "/grant/applications",
  },
  {
    name: "Program Management",
    route: "/programs",
  },
];

const adminItems = [
  ...employeeItems,
  {
    name: "Employee Approval",
    route: "/employee-approval",
  },
];

export default function Home() {
  const user = localStorage.user ? JSON.parse(localStorage.user) : null;
  const type = user?.type;
  const [items] = useState(
    type !== "user"
      ? type === "admin"
        ? adminItems
        : employeeItems
      : userItems
  );
  return (
    <div className="home-items">
      {items.map((e, idx) => (
        <Link to={e.route} className="item" key={idx}>
          {e.name}
        </Link>
      ))}
    </div>
  );
}
