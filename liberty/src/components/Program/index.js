import React, { useState, useEffect } from "react";
import { list } from "api/program";
import Header from "../Header";
import { Link } from "react-router-dom";
import { programs } from "./programs";
import { Helmet } from "react-helmet";

export default function Program() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="programs">
      <Helmet>
        <title>Liberty Hospital Foundation - Program Management</title>
      </Helmet>
      <Header />
      <div className="main-container">
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <div className="program-list">
            {programs.map(e => (
              <div className="program">
                <Link to={`/programs/${e.link}`} className="program" key={e.id}>
                  {e.name}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
