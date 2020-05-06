import React, { useState } from "react";
import Header from "../Header";
import { get } from "api/grant";
import { Formik, Field } from "formik";
import { Helmet } from "react-helmet";

export default function Status() {
  const onSubmit = async ({ id }) => {
    let grant = await get(id);
    setGrant(grant.data);
  };

  const [initial] = useState({
    id: null
  });
  const [grant, setGrant] = useState(null);

  return (
    <div>
      <Helmet>
        <title>Liberty Hospital Foundation - Check Grant Status</title>
      </Helmet>
      <Header />
      <div className="grant-list check-status">
        <Formik
          initialValues={initial}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ values }) => (
            <form onSubmit={e => e.preventDefault()}>
              <div className="input-container">
                <label className="">
                  Enter your reference number to Check your Grant Status
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
        {grant ? (
          <div className="status-container">
            <div className="status-item">
              <div className="label">Status: </div>
              <div className="value capitalize">{grant.status}</div>
            </div>
            {grant.score ? (
              <>
                <div className="status-item">
                  <div className="label">Score: </div>
                  <div className="value">{grant.score}</div>
                </div>
                <div className="status-item">
                  <div className="label">Comments: </div>
                  <div className="value">{grant.comments}</div>
                </div>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
