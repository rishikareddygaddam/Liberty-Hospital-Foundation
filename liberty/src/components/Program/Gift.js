import React, { useState, useEffect } from "react";
import Header from "../Header";
import { Formik, Field, FieldArray } from "formik";
import { giftServices } from "./services";
import { get, update, create, download } from "api/program";
import { Helmet } from "react-helmet";
import { numberChange } from "lib/number";

export default function PatientAssistance() {
  const [key, setKey] = useState(+new Date());
  const [initial, setInitial] = useState({
    services: giftServices,
    no_of_unduplicated: null,
    story_patient: null,
    patient_contact: null,
    type: "gift",
  });
  const [submitting, setSubmitting] = useState(null);

  useEffect(() => {
    async function getData() {
      let res = await get("gift");
      if (Object.keys(res.data).length) {
        setInitial({ ...res.data, type: "gift" });
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
        <title>Liberty Hospital Foundation - Kyleigh's Gift</title>
      </Helmet>
      <Header />
      <div className="main-container" key={key}>
        <h3 className="title">Kyleigh's Gift</h3>
        <div className="download-container">
          <button onClick={() => download("gift")}>Export to excel</button>
        </div>
        <Formik
          initialValues={initial}
          // validationSchema={ScholarshipSchema}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            validateForm,
            setFieldValue,
          }) => (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-container sibling-container">
                <div className="services">
                  <div className="row">
                    <div className="col-sm-3 th">Services Provided</div>
                    <div className="col-sm-3 th">Number Served</div>
                    <div className="col-sm-3 th">Funding Used</div>
                    <div className="col-sm-3 th">Notes</div>
                  </div>
                  <FieldArray
                    name="services"
                    render={(arrayHelpers) => (
                      <div className="input-container">
                        {values.services.length > 0
                          ? values.services.map((service, idx) => (
                              <div
                                className="sibling sibling-item row"
                                key={idx}
                              >
                                <div className="col-sm-3 input-field">
                                  <div className="service-name">
                                    {service.service}
                                  </div>
                                </div>
                                <div className="col-sm-3 input-field">
                                  <input
                                    type="text"
                                    name={`services[${idx}].no_served`}
                                    onChange={(e) =>
                                      numberChange(
                                        e,
                                        setFieldValue,
                                        `services[${idx}].no_served`
                                      )
                                    }
                                    value={service.no_served}
                                  />
                                </div>
                                <div className="col-sm-3 input-field">
                                  <input
                                    type="text"
                                    name={`services[${idx}].funding_used`}
                                    onChange={(e) =>
                                      numberChange(
                                        e,
                                        setFieldValue,
                                        `services[${idx}].funding_used`
                                      )
                                    }
                                    value={service.funding_used}
                                  />
                                </div>
                                <div className="col-sm-3 input-field">
                                  <Field
                                    type="text"
                                    name={`services[${idx}].notes`}
                                  />
                                </div>
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
