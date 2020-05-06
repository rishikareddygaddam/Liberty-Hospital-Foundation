import React, { useState } from "react";
import Header from "../Header";
import { get } from "api/scholarship";
import { Formik, Field } from "formik";
import { Helmet } from "react-helmet";

export default function Status() {
  const onSubmit = async ({ id }) => {
    let scholarship = await get(id);
    setScholarship(scholarship.data);
  };

  const [initial] = useState({
    id: null
  });
  const [scholarship, setScholarship] = useState(null);

  return (
    <div>
      <Helmet>
        <title>Liberty Hospital Foundation - Check Scholarship Status</title>
      </Helmet>
      <Header />
      <div className="scholarship-list check-status">
        <Formik
          initialValues={initial}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ values }) => (
            <form onSubmit={e => e.preventDefault()}>
              <div className="input-container">
                <label className="">
                  Enter your reference number to Check your Scholarship Status
                </label>
                <Field type="text" className="" name="id" />
              </div>
              <div className="actions-container MT30">
                <button
                  onClick={() => {
                    onSubmit(values);
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </Formik>
        {scholarship ? (
          <div className="status-container">
            <div className="status-item">
              <div className="label">Status: </div>
              <div className="value capitalize">{scholarship.status}</div>
            </div>
            {scholarship.score ? (
              <>
                <div className="status-item">
                  <div className="label">Score: </div>
                  <div className="value">{scholarship.score}</div>
                </div>
                <div className="status-item">
                  <div className="label">Comments: </div>
                  <div className="value">{scholarship.comments}</div>
                </div>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
