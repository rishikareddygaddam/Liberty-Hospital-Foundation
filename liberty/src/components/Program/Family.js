import React, { useState, useEffect } from "react";
import Header from "../Header";
import { Formik, Field, FieldArray } from "formik";
import { familyCrisis } from "./familyCrisis";
import { get, update, create, download } from "api/program";
import { Helmet } from "react-helmet";
import { numberChange } from "lib/number";

export default function Family() {
  const [key, setKey] = useState(+new Date());
  const [initial, setInitial] = useState({
    crisis: familyCrisis,
    no_of_unduplicated: null,
    additional_services: null,
    story_patient: null,
    patient_contact: null,
    type: "family",
  });
  const [submitting, setSubmitting] = useState(null);

  useEffect(() => {
    async function getData() {
      let res = await get("family");
      res.data.crisis = res.data.crisis.map((e) => {
        return {
          ...e,
          funding_used: e.funding_used || 0,
          no_served: e.no_served || 0,
        };
      });
      if (Object.keys(res.data).length) {
        setInitial({ ...res.data, type: "family" });
        setKey(+new Date());
      }
    }

    getData();
  }, []);

  const onSubmit = async (values) => {
    setSubmitting(true);
    if (initial.id) {
      let res = await update(values);
    } else {
      let res = await create(values);
    }
    setSubmitting(false);
  };

  return (
    <div className="patient-assistance">
      <Helmet>
        <title>Liberty Hospital Foundation - Hughes Family Assistance</title>
      </Helmet>
      <Header />
      <div className="main-container" key={key}>
        <h3 className="title">Hughes Family Assistance</h3>
        <div className="download-container">
          <button onClick={() => download("family")}>Export to excel</button>
        </div>
        <Formik
          initialValues={initial}
          // validationSchema={ScholarshipSchema}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ values, setFieldValue }) => (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-container sibling-container">
                <div className="services">
                  <div className="row">
                    <div className="col-sm-3 th">Services Provided</div>
                    <div className="col-sm-2 th">Number Served</div>
                    <div className="col-sm-3 th">Assistance Provided</div>
                    <div className="col-sm-2 th">Funding Used</div>
                    <div className="col-sm-2 th">Notes</div>
                  </div>
                  <FieldArray
                    name="crisis"
                    render={(arrayHelpers) => (
                      <div className="input-container">
                        {values.crisis.length > 0
                          ? values.crisis.map((service, idx) => (
                              <div
                                className="sibling sibling-item row"
                                key={idx}
                              >
                                <div className="col-sm-3 input-field">
                                  <div className="service-name">
                                    {service.name}
                                  </div>
                                </div>
                                <div className="col-sm-2 input-field">
                                  <Field
                                    type="number"
                                    name={`crisis[${idx}].no_served`}
                                    onChange={(e) =>
                                      numberChange(
                                        e,
                                        setFieldValue,
                                        `crisis[${idx}].no_served`
                                      )
                                    }
                                    value={service.no_served}
                                  />
                                </div>
                                <div className="col-sm-3 input-field">
                                  <Field
                                    type="string"
                                    name={`crisis[${idx}].assistance`}
                                  />
                                </div>
                                {!service.is_crisis ? (
                                  <>
                                    <div className="col-sm-2 input-field">
                                      <Field
                                        type="number"
                                        name={`crisis[${idx}].funding_used`}
                                        onChange={(e) =>
                                          numberChange(
                                            e,
                                            setFieldValue,
                                            `crisis[${idx}].funding_used`
                                          )
                                        }
                                        value={service.funding_used}
                                      />
                                    </div>
                                    <div className="col-sm-2 input-field">
                                      <Field
                                        type="text"
                                        name={`crisis[${idx}].notes`}
                                      />
                                    </div>
                                  </>
                                ) : null}
                              </div>
                            ))
                          : null}

                        <div className="input-container row patient-row">
                          <label className="col-sm-4">
                            Total # of unduplicated patients served:
                          </label>
                          <Field
                            type="text"
                            className="col-sm-8"
                            name="no_of_unduplicated"
                          />
                        </div>
                        <div className="input-container row patient-row">
                          <label className="col-sm-4">
                            Additional Services Provided :
                          </label>
                          <Field
                            type="text"
                            className="col-sm-8"
                            name="additional_services"
                          />
                        </div>
                        <div className="input-container row patient-row">
                          <label className="col-sm-4">
                            Please briefly share a patient story of a patient
                            served by this program. :
                          </label>
                          <Field
                            type="text"
                            className="col-sm-8"
                            name="story_patient"
                          />
                        </div>
                        <div className="input-container row patient-row">
                          <label className="col-sm-4">
                            Can this patient be contacted to further share their
                            story? :
                          </label>
                          <Field
                            type="checkbox"
                            className="col-sm-8"
                            name="patient_contact"
                          />
                        </div>
                      </div>
                    )}
                  ></FieldArray>
                  {submitting === true ? (
                    <div className="submit-status">Updating...</div>
                  ) : submitting === false ? (
                    <div className="submit-status success">
                      Successfully updated the program
                    </div>
                  ) : null}
                  <div className="actions-container MT30">
                    <button
                      onClick={() => {
                        onSubmit(values);
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
