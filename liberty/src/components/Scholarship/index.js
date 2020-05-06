import React, { useState, useEffect, useRef } from "react";
import Header from "../Header";
import { Formik, Field } from "formik";
import { ScholarshipSchema } from "./validations";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import { initialValues } from "./initial";
import Siblings from "./Siblings";
import Activities from "./Activities";
import { create, get, update } from "api/scholarship";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { options } from "./file-options";
import { Helmet } from "react-helmet";
import { numberChange } from "lib/number";

export default function Scholarship({ match }) {
  const [initial, setInitial] = useState(initialValues);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [scholarship_id] = useState(match.params.id);
  const [actions, setActions] = useState(true);
  const [scholarship, setScholarship] = useState(null);
  const [employeeActions, setEmployeeActions] = useState(false);
  const [fileOptions] = useState(options);
  const [defaultOption, changeOption] = useState(options[0]);
  const fileRef = useRef();
  const [submitting, setSubmitting] = useState(false);

  const [type, setType] = useState("user");
  let userDetails = JSON.parse(localStorage.user);

  const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const onSubmit = async (values) => {
    try {
      setSubmitting(true);
      if (!scholarship_id) {
        let res = await create(values);
        setScholarship(res.data);
      } else {
        let res = await update(values);
        setScholarship(res.data);
      }
      setSuccess(true);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
    }
  };

  const openFileSelector = () => {
    fileRef.current.click();
  };

  const optionChange = (obj) => {
    changeOption(obj);
  };

  const getFiles = (values, setFieldValue) => {
    return options.map((e, idx) => {
      if (values[e.file_name]) {
        return (
          <div className="file-container" key={idx}>
            <label>{e.label}</label>
            {typeof values[e.file_name] === "object" ? (
              <a>{values[e.file_name].name}</a>
            ) : (
              <a
                target="blank"
                href={`http://localhost:4000/${values[e.file_name]}`}
              >
                {values[e.file_name].substr(37)}
              </a>
            )}
            <label
              className="remove-file"
              onClick={() => {
                setFieldValue(e.value, null);
                setFieldValue(e.file_name, null);
              }}
            ></label>
          </div>
        );
      } else return null;
    });
  };

  const deleteSibling = (idx, setFieldValue, siblings) => {
    siblings.splice(idx, 1);
    setFieldValue("siblings", siblings);
  };

  useEffect(() => {
    setType(userDetails.type || "user");
    if (userDetails.type !== "user") {
      ScholarshipSchema.shape({
        score: Yup.number().required("Required"),
        comments: Yup.string().required("Required"),
      });
    }
    async function getData() {
      let res = await get(scholarship_id);
      if (res.data.status !== "draft") {
        setDisabled(true);
        setActions(false);
      }
      if (
        (res.data.status === "pending" || res.data.status === "in progress") &&
        userDetails.type !== "user"
      ) {
        setEmployeeActions(true);
      }
      setScholarship(res.data);

      res.data = {
        ...res.data,
        graduate_month: new Date(res.data.graduate_month),
        birthdate: new Date(res.data.birthdate),
        date: new Date(res.data.date),
        isEmployee: userDetails.type !== "user",
      };
      setInitial(res.data);
      setLoading(false);
    }
    if (scholarship_id) {
      setLoading(true);
      getData();
    }
  }, [scholarship_id]);

  return (
    <div className="scholarship">
      <Helmet>
        <title>Liberty Hospital Foundation - Scholarship Application</title>
      </Helmet>
      <Header />
      {!success ? (
        <div className="main-container">
          <h3 className="title">
            <br />
            Nursing Scholarship Application
          </h3>
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            <Formik
              initialValues={initial}
              validationSchema={ScholarshipSchema}
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
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className={disabled ? "disabled" : ""}
                >
                  <div className="form-container">
                    <div className="personal-info">
                      <h5 className="sub-title">Personal Information</h5>
                      <div className="flex-container row">
                        <div className="input-container col-sm-6 row">
                          <label className="col-sm-4 required">
                            First Name:
                          </label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="firstname"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstname}
                          />
                        </div>
                        <div className="input-container col-sm-6 row">
                          <label className="col-sm-4 required">
                            Last Name:
                          </label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="lastname"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastname}
                          />
                        </div>
                      </div>
                      <div className="sub-heading-line">Home Address:</div>
                      <div className="flex-container row">
                        <div className="input-container col-sm-3 row">
                          <label className="col-sm-4 required">Street:</label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="street"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.street}
                          />
                        </div>
                        <div className="input-container col-sm-3 row">
                          <label className="col-sm-4 required">City:</label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="city"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.city}
                          />
                        </div>
                        <div className="input-container col-sm-3 row ML34">
                          <label className="col-sm-4 required">State:</label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="state"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.state}
                          />
                        </div>
                        <div className="input-container col-sm-3 row ML34">
                          <label className="col-sm-4 required">Zip:</label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="zip"
                            onChange={(e) =>
                              numberChange(e, setFieldValue, "zip")
                            }
                            value={values.zip}
                          />
                        </div>
                      </div>
                      <div className="flex-container row">
                        <div className="input-container col-sm-6 row">
                          <label className="col-sm-4 required">
                            Home Telephone Number:
                          </label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="home_phone"
                            onChange={(e) =>
                              numberChange(e, setFieldValue, "home_phone")
                            }
                            value={values.home_phone}
                          />
                          <span className="validation-error ML34">
                            {errors.home_phone || touched.home_phone}
                          </span>
                        </div>
                        <div className="input-container col-sm-6 row">
                          <label className="col-sm-4">Cell Number:</label>
                          <input
                            className="col-sm-8"
                            type="text"
                            name="cell"
                            onChange={(e) =>
                              numberChange(e, setFieldValue, "cell")
                            }
                            value={values.cell}
                          />
                          <span className="validation-error ML34">
                            {errors.cell || touched.cell}
                          </span>
                        </div>
                      </div>
                      <div className="flex-container row">
                        <div className="input-container col-sm-6 row">
                          <label className="col-sm-4 required">E-mail:</label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          <span className="validation-error ML34">
                            {errors.email || touched.email}
                          </span>
                        </div>
                        <div className="input-container col-sm-6 row">
                          <label className="col-sm-4 required">
                            Birth Date:
                          </label>
                          {/* <input maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="cell"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.cell}
                          /> */}
                          <div className="col-sm-8 full">
                            <DatePicker
                              selected={values.birthdate}
                              dateFormat="MMMM d, yyyy"
                              name="birthdate"
                              onChange={(date) =>
                                setFieldValue("birthdate", date)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="input-container row">
                        <label className="col-sm-4">
                          How did you learn about this scholarship?:
                        </label>
                        <input
                          maxlength="50"
                          className="col-sm-8"
                          type="text"
                          name="learn"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.learn}
                        />
                      </div>
                      <div className="input-container row">
                        <label className="col-sm-8 required">
                          Do you have any relatives employed by New Liberty
                          Hospital District (“Liberty Hospital”) or the Liberty
                          Hospital Foundation?
                        </label>
                        <label className="col-sm-2 radio-label">
                          <input
                            maxlength="50"
                            type="radio"
                            name="is_relatives"
                            value="Yes"
                            checked={values.is_relatives === "Yes"}
                            onChange={() =>
                              setFieldValue("is_relatives", "Yes")
                            }
                          />
                          Yes
                        </label>
                        <label className="col-sm-2 radio-label">
                          <input
                            maxlength="50"
                            type="radio"
                            name="is_relatives"
                            value="No"
                            checked={values.is_relatives === "No"}
                            onChange={() => setFieldValue("is_relatives", "No")}
                          />
                          No
                        </label>
                      </div>
                      <div className="input-container row">
                        <label className="col-sm-4">
                          If yes, please state the name(s) and relationship:
                        </label>
                        <input
                          maxlength="50"
                          className="col-sm-8"
                          type="text"
                          name="relatives"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.relatives}
                        />
                      </div>
                    </div>
                    <div className="family-info">
                      <h5 className="sub-title">Family Information</h5>
                      <div className="flex-container row">
                        <div className="input-container col-sm-6 row">
                          <label className="col-sm-4">
                            Parent/Guardian Name:
                          </label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="guardian1_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.guardian1_name}
                          />
                        </div>
                        <div className="input-container col-sm-6 row">
                          <label className="col-sm-4">
                            Guardian Occupation
                          </label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="guardian1_occupation"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.guardian1_occupation}
                          />
                        </div>
                      </div>
                      <div className="sub-heading-line">Home Address:</div>
                      <div className="flex-container row">
                        <div className="input-container col-sm-3 row">
                          <label className="col-sm-4">Street:</label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="guardian1_street"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.guardian1_street}
                          />
                        </div>
                        <div className="input-container col-sm-3 row">
                          <label className="col-sm-4">City:</label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="guardian1_city"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.guardian1_city}
                          />
                        </div>
                        <div className="input-container col-sm-3 row ML34">
                          <label className="col-sm-4">State:</label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="g1_state"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.g1_state}
                          />
                        </div>
                        <div className="input-container col-sm-3 row ML34">
                          <label className="col-sm-4">Zip:</label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="guardian1_zip"
                            onChange={(e) =>
                              numberChange(e, setFieldValue, "guardian1_zip")
                            }
                            value={values.guardian1_zip}
                          />
                        </div>
                      </div>
                      <div className="flex-container row MT30">
                        <div className="input-container col-sm-6 row">
                          <label className="col-sm-4">
                            Parent/Guardian Name:
                          </label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="guardian2_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.guardian2_name}
                          />
                        </div>
                        <div className="input-container col-sm-6 row">
                          <label className="col-sm-4">
                            Guardian Occupation
                          </label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="guardian2_occupation"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.guardian2_occupation}
                          />
                        </div>
                      </div>
                      <div className="sub-heading-line">Home Address:</div>
                      <div className="flex-container row">
                        <div className="input-container col-sm-3 row">
                          <label className="col-sm-4">Street:</label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="guardian2_street"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.guardian2_street}
                          />
                        </div>
                        <div className="input-container col-sm-3 row">
                          <label className="col-sm-4">City:</label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="guardian2_city"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.guardian2_city}
                          />
                        </div>
                        <div className="input-container col-sm-3 row ML34">
                          <label className="col-sm-4">State:</label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="g2_state"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.g2_state}
                          />
                        </div>
                        <div className="input-container col-sm-3 row ML34">
                          <label className="col-sm-4">Zip:</label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="guardian2_zip"
                            onChange={(e) =>
                              numberChange(e, setFieldValue, "guardian2_zip")
                            }
                            value={values.guardian2_zip}
                          />
                        </div>
                      </div>
                      <div className="flex-container row">
                        <div className="input-container col-sm-4 row">
                          <label className="col-sm-6 required">
                            # of Siblings (not including applicant):
                          </label>
                          <input
                            maxlength="50"
                            className="col-sm-6"
                            type="text"
                            name="no_of_siblings"
                            onChange={(e) =>
                              numberChange(e, setFieldValue, "no_of_siblings")
                            }
                            value={values.no_of_siblings}
                          />
                        </div>
                        <div className="input-container col-sm-4 row">
                          <label className="col-sm-4 required">
                            # in College::
                          </label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="no_in_college"
                            onChange={(e) =>
                              numberChange(e, setFieldValue, "no_in_college")
                            }
                            value={values.no_in_college}
                          />
                        </div>
                        <div className="input-container col-sm-4 row ML34">
                          <label className="col-sm-4 required"># K-12:</label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="k12"
                            onChange={(e) =>
                              numberChange(e, setFieldValue, "k12")
                            }
                            value={values.k12}
                          />
                        </div>
                      </div>
                      <div className="sibling-container">
                        <Siblings
                          siblings={values.siblings}
                          setFieldValue={setFieldValue}
                          deleteSibling={deleteSibling}
                        />
                      </div>
                      <div className="input-container row">
                        <label className="col-sm-6 required">
                          Do you live with your parents?:
                        </label>
                        <label className="col-sm-2 radio-label">
                          <input
                            maxlength="50"
                            type="radio"
                            name="live_with_parents"
                            value="Yes"
                            checked={values.live_with_parents === "Yes"}
                            onChange={() =>
                              setFieldValue("live_with_parents", "Yes")
                            }
                          />
                          Yes
                        </label>
                        <label className="col-sm-2 radio-label">
                          <input
                            maxlength="50"
                            type="radio"
                            name="live_with_parents"
                            value="No"
                            checked={values.live_with_parents === "No"}
                            onChange={() =>
                              setFieldValue("live_with_parents", "No")
                            }
                          />
                          No
                        </label>
                        {/* <label className="col-sm-2 radio-label">
                          <input
                            maxlength="50"
                            type="radio"
                            name="live_with_parents"
                            value="Other"
                            checked={values.live_with_parents === "Other"}
                            onChange={() =>
                              setFieldValue("live_with_parents", "Other")
                            }
                          />
                          Other
                        </label> */}
                      </div>
                      {values.live_with_parents === "Other" ? (
                        <div className="input-container row">
                          <label className="col-sm-4 required">
                            Explain living:
                          </label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="explain_living"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.explain_living}
                          />
                        </div>
                      ) : null}
                    </div>
                    <div className="extra-info">
                      <h5 className="sub-title">Extra Curricular Activities</h5>
                      <div className="activities-info ">
                        <p>
                          Please list your participation in school (including
                          sports, extracurricular and/or academic clubs),
                          community, church, and service organizations as well
                          as other community activities over the last four (4)
                          years:  Please indicate years of involvement, offices
                          held, honors and awards received. Please contain
                          answers to table below.
                        </p>
                        <div className="activities-table">
                          <Activities activities={values.activities} />
                        </div>
                        <div className="flex-container row">
                          <div className="input-container col-sm-6 row">
                            <label className="col-sm-4">
                              Work experience - Place of Employment:
                            </label>
                            <input
                              maxlength="50"
                              className="col-sm-8"
                              type="text"
                              name="place_employment"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.place_employment}
                            />
                          </div>
                          <div className="input-container col-sm-6 row">
                            <label className="col-sm-4">Years on job:</label>
                            <input
                              className="col-sm-8"
                              type="text"
                              name="years_on_job"
                              onChange={(e) =>
                                numberChange(e, setFieldValue, "years_on_job")
                              }
                              onBlur={handleBlur}
                              value={values.years_on_job}
                            />
                          </div>
                        </div>
                        <div className="input-container row">
                          <label className="col-sm-6">
                            Do you plan to work during the school term?:
                          </label>
                          <label className="col-sm-2 radio-label">
                            <input
                              maxlength="50"
                              type="radio"
                              name="plan_to_work"
                              value="Yes"
                              checked={values.plan_to_work === "Yes"}
                              onChange={() =>
                                setFieldValue("plan_to_work", "Yes")
                              }
                            />
                            Yes
                          </label>
                          <label className="col-sm-2  radio-label">
                            <input
                              maxlength="50"
                              type="radio"
                              name="plan_to_work"
                              value="No"
                              checked={values.plan_to_work === "No"}
                              onChange={() =>
                                setFieldValue("plan_to_work", "No")
                              }
                            />
                            No
                          </label>
                        </div>
                        {values.plan_to_work === "Yes" ? (
                          <div className="input-container row">
                            <label className="col-sm-4">Hours per week:</label>
                            <input
                              maxlength="50"
                              className="col-sm-8"
                              type="text"
                              name="hours_week"
                              onChange={(e) =>
                                numberChange(e, setFieldValue, "hours_week")
                              }
                              value={values.hours_week}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="academic-info">
                      <h5 className="sub-title">
                        High School Academic Information
                      </h5>
                      <div className="sub-heading-line">
                        High School Attended:
                      </div>
                      <div className="flex-container row">
                        <div className="input-container col-sm-4 row">
                          <label className="col-sm-4 required">Name:</label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="school"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.school}
                          />
                        </div>
                        <div className="input-container col-sm-4 row">
                          <label className="col-sm-4 required">Address:</label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="school_address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.school_address}
                          />
                        </div>
                        <div className="input-container col-sm-4 row ML34">
                          <label className="col-sm-4 required">
                            Graduation Year:
                          </label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="school_year"
                            onChange={(e) =>
                              numberChange(e, setFieldValue, "school_year")
                            }
                            value={values.school_year}
                          />
                        </div>
                      </div>
                      <div className="flex-container row">
                        <div className="input-container col-sm-4 row">
                          <label className="col-sm-4 required">
                            Class Rank:
                          </label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="class_rank"
                            onChange={(e) =>
                              numberChange(e, setFieldValue, "class_rank")
                            }
                            value={values.class_rank}
                          />
                        </div>
                        <div className="input-container col-sm-4 row">
                          <label className="col-sm-4 required">
                            GPA (MUST BE 3.0 or higher to apply):
                          </label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="gpa"
                            onChange={(e) =>
                              numberChange(e, setFieldValue, "gpa")
                            }
                            value={values.gpa}
                          />
                        </div>
                        <div className="input-container col-sm-4 row ML34">
                          <label className="col-sm-4 required">
                            Weighted GPA:
                          </label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="weighted_gpa"
                            onChange={(e) =>
                              numberChange(e, setFieldValue, "weighted_gpa")
                            }
                            value={values.weighted_gpa}
                          />
                        </div>
                      </div>
                      <div className="sub-heading-line">ACT Results:</div>
                      <div className="flex-container row">
                        <div className="input-container col-sm-4 row">
                          <label className="col-sm-4">Raw score:</label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="act"
                            onChange={(e) =>
                              numberChange(e, setFieldValue, "act")
                            }
                            value={values.act}
                          />
                        </div>
                        <div className="input-container col-sm-4 row">
                          <label className="col-sm-4">English:</label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="english"
                            onChange={(e) =>
                              numberChange(e, setFieldValue, "english")
                            }
                            value={values.english}
                          />
                        </div>
                        <div className="input-container col-sm-4 row ML34">
                          <label className="col-sm-4 ">Math:</label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="math"
                            onChange={(e) =>
                              numberChange(e, setFieldValue, "math")
                            }
                            value={values.math}
                          />
                        </div>
                      </div>
                      <div className="flex-container row">
                        <div className="input-container col-sm-4 row">
                          <label className="col-sm-4 ">Reading:</label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="reading"
                            onChange={(e) =>
                              numberChange(e, setFieldValue, "reading")
                            }
                            value={values.reading}
                          />
                        </div>
                        <div className="input-container col-sm-4 row">
                          <label className="col-sm-4 ">Science:</label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="science"
                            onChange={(e) =>
                              numberChange(e, setFieldValue, "science")
                            }
                            value={values.science}
                          />
                        </div>
                        <div className="input-container col-sm-4 row ML34">
                          <label className="col-sm-4 ">Composite:</label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="composite"
                            onChange={(e) =>
                              numberChange(e, setFieldValue, "composite")
                            }
                            value={values.composite}
                          />
                        </div>
                      </div>
                      <div className="input-container row">
                        <label className="col-sm-6">
                          Other test scores you wish to report (SAT cumulative
                          and raw scores, Advanced Placement exams, etc.):
                        </label>
                        <input
                          maxlength="50"
                          className="col-sm-6"
                          type="text"
                          name="other_scores"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.other_scores}
                        />
                      </div>
                      <div className="flex-container row">
                        <div className="input-container col-sm-6 row">
                          <label className="col-sm-4 required">
                            Name of High School Counselor:
                          </label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="counselor"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.counselor}
                          />
                        </div>
                        <div className="input-container col-sm-6 row">
                          <label className="col-sm-4 required">
                            Phone number:
                          </label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="counselor_phone"
                            onChange={(e) =>
                              numberChange(e, setFieldValue, "counselor_phone")
                            }
                            value={values.counselor_phone}
                          />
                          <span className="validation-error ML34">
                            {errors.counselor_phone || touched.counselor_phone}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="college-info">
                      <h5 className="sub-title">College Plans</h5>
                      <div className="input-container row">
                        <label className="col-sm-6 required">
                          Name(s) of College(s) you applied to or have been
                          accepted to:
                        </label>
                        <input
                          maxlength="50"
                          className="col-sm-6"
                          type="text"
                          name="colleges_applied"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.colleges_applied}
                        />
                      </div>
                      <div className="input-container row">
                        <label className="col-sm-6 required">
                          Name of College you plan to attend:
                        </label>
                        <input
                          maxlength="50"
                          className="col-sm-6"
                          type="text"
                          name="college_planned"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.college_planned}
                        />
                      </div>
                      <div className="input-container row">
                        <label className="col-sm-6 required">
                          Have you been accepted to the Nursing Program?:
                        </label>
                        <label className="col-sm-2 radio-label">
                          <input
                            maxlength="50"
                            type="radio"
                            name="accepted_nursing"
                            value="Yes"
                            checked={values.accepted_nursing === "Yes"}
                            onChange={() =>
                              setFieldValue("accepted_nursing", "Yes")
                            }
                          />
                          Yes
                        </label>
                        <label className="col-sm-2 radio-label">
                          <input
                            maxlength="50"
                            type="radio"
                            name="accepted_nursing"
                            value="waiting_to_hear"
                            checked={
                              values.accepted_nursing === "waiting_to_hear"
                            }
                            onChange={() =>
                              setFieldValue(
                                "accepted_nursing",
                                "waiting_to_hear"
                              )
                            }
                          />
                          Wating to hear
                        </label>
                        <label className="col-sm-2 radio-label">
                          <input
                            maxlength="50"
                            type="radio"
                            name="accepted_nursing"
                            value="cant_apply_yet"
                            checked={
                              values.accepted_nursing === "cant_apply_yet"
                            }
                            onChange={() =>
                              setFieldValue(
                                "accepted_nursing",
                                "cant_apply_yet"
                              )
                            }
                          />
                          Can't apply yet
                        </label>
                      </div>
                      {values.accepted_nursing === "cant_apply_yet" ? (
                        <div className="input-container row">
                          <label className="col-sm-4 required">
                            If can’t apply yet, when can you be accepted to the
                            Nursing Program?:
                          </label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="when_apply"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.when_apply}
                          />
                        </div>
                      ) : null}
                      <div className="input-container row">
                        <label className="col-sm-6 required">
                          Field of interest:
                        </label>
                        <input
                          maxlength="50"
                          className="col-sm-6"
                          type="text"
                          name="field_of_interest"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.field_of_interest}
                        />
                      </div>
                      <div className="input-container row">
                        <label className="col-sm-6 required">
                          Month/Year you expect to graduate:
                        </label>
                        <div className="col-sm-6 full">
                          <DatePicker
                            selected={values.graduate_month}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                            name="graduate_month"
                            onChange={(date) =>
                              setFieldValue("graduate_month", date)
                            }
                          />
                        </div>
                      </div>
                      <div className="flex-container row">
                        <div className="input-container col-sm-6 row">
                          <label className="col-sm-4">
                            College credit awarded/in progress-Classes taken:
                          </label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="college_classes_taken"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.college_classes_taken}
                          />
                        </div>
                        <div className="input-container col-sm-6 row">
                          <label className="col-sm-4">
                            College awarded/ing:
                          </label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="college_awarded"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.college_awarded}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="files-info">
                      <h5 className="sub-title">
                        References, Transcripts, And Reasons For Applying For
                        Nursing Scholarship:
                      </h5>
                      <div className="p-text">
                        Please submit ONLY THESE ITEMS with this Application IN
                        THE ORDER LISTED:
                      </div>
                      {true ? null : (
                        <div>
                          <div className="chk-container disable-chk">
                            <label htmlFor="transcripts">
                              <Field
                                type="checkbox"
                                value="true"
                                id="transcripts"
                                checked={values.transcripts}
                              />
                              Official high school transcripts (and college if
                              applicable)
                            </label>
                            {values.transcripts_file && scholarship_id ? (
                              <a
                                className="view-file"
                                target="blank"
                                href={`http://localhost:4000/${values.transcripts_file}`}
                              >
                                View File
                              </a>
                            ) : (
                              <input
                                maxlength="50"
                                type="file"
                                accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                                name="transcripts_file"
                                onChange={(e) => {
                                  setFieldValue(
                                    "transcripts_file",
                                    e.currentTarget.files[0]
                                  );
                                  setFieldValue("transcripts", true);
                                }}
                              />
                            )}
                          </div>
                          <div className="chk-container disable-chk">
                            <label htmlFor="acceptance">
                              <Field
                                type="checkbox"
                                value="true"
                                id="acceptance"
                                checked={values.acceptance}
                              />
                              Verification of acceptance to College or
                              University and acceptance to nursing if received
                            </label>
                            {values.acceptance_file && scholarship_id ? (
                              <a
                                className="view-file"
                                target="blank"
                                href={`http://localhost:4000/${values.acceptance_file}`}
                              >
                                View File
                              </a>
                            ) : (
                              <input
                                maxlength="50"
                                type="file"
                                accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                                name="acceptance_file"
                                onChange={(e) => {
                                  setFieldValue(
                                    "acceptance_file",
                                    e.currentTarget.files[0]
                                  );
                                  setFieldValue("acceptance", true);
                                }}
                              />
                            )}
                          </div>
                          <div className="chk-container disable-chk">
                            <label htmlFor="statement">
                              <Field
                                type="checkbox"
                                value="true"
                                id="statement"
                                checked={values.statement}
                              />
                              A personal statement describing your background,
                              personal interests, strengths, and why you’ve
                              chosen the nursing profession as a career.  Please
                              explain what qualities you have which would allow
                              you to be an outstanding health care provider. 
                              Include examples of when you have demonstrated
                              these qualities.
                            </label>
                            {values.statement_file && scholarship_id ? (
                              <a
                                className="view-file"
                                target="blank"
                                href={`http://localhost:4000/${values.statement_file}`}
                              >
                                View File
                              </a>
                            ) : (
                              <input
                                maxlength="50"
                                type="file"
                                accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                                name="statement_file"
                                onChange={(e) => {
                                  setFieldValue(
                                    "statement_file",
                                    e.currentTarget.files[0]
                                  );
                                  setFieldValue("statement", true);
                                }}
                              />
                            )}
                          </div>
                          <div className="chk-container disable-chk">
                            <label htmlFor="recommendation">
                              <Field
                                type="checkbox"
                                value="true"
                                id="recommendation"
                                checked={values.recommendation}
                              />
                              Two sealed letters of recommendation – one from a
                              scholastic source and one from a personal source –
                              on letterhead and signed
                            </label>
                            {values.recommendation_file && scholarship_id ? (
                              <a
                                className="view-file"
                                target="blank"
                                href={`http://localhost:4000/${values.recommendation_file}`}
                              >
                                View File
                              </a>
                            ) : (
                              <input
                                maxlength="50"
                                type="file"
                                accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                                name="recommendation_file"
                                onChange={(e) => {
                                  setFieldValue(
                                    "recommendation_file",
                                    e.currentTarget.files[0]
                                  );
                                  setFieldValue("recommendation", true);
                                }}
                              />
                            )}
                          </div>
                        </div>
                      )}
                      <div className="file-view">
                        {getFiles(values, setFieldValue)}
                      </div>
                      <div className="row files-dropdown">
                        <Dropdown
                          options={options}
                          onChange={optionChange}
                          value={defaultOption}
                          placeholder="Select an option"
                          className="col-sm-8"
                        />
                        <div className="col-sm-4">
                          <button
                            className="file-btn"
                            onClick={openFileSelector}
                          >
                            Select Files
                          </button>
                          <input
                            maxlength="50"
                            ref={fileRef}
                            className="DNI"
                            type="file"
                            accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                            name="file_upload"
                            onChange={(e) => {
                              setFieldValue(
                                `${defaultOption.value}_file`,
                                e.currentTarget.files[0]
                              );
                              setFieldValue(defaultOption.value, true);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="acknowlege-info">
                      <h5 className="sub-title">Acknowledgement:</h5>
                      <p className="p-text">
                        I certify that I have read the foregoing Scholarship
                        Application and the Liberty Hospital/Liberty Hospital
                        Foundation Scholarship Application Guidelines, that I
                        understand the questions, that the answers I have given
                        are true, accurate and complete, and that I have made no
                        false statements nor have I misrepresented any facts in
                        this application, and that I authorize investigation of
                        all my statements contained in this application.  I
                        understand that false answers will disqualify me from
                        consideration for a scholarship. I hereby release the
                        New Liberty Hospital District (“Liberty Hospital”) and
                        the Liberty Hospital Foundation, their respective
                        officers and agents, committee members, and employees
                        from any liability resulting from any investigation of
                        my statements contained in this application that I have
                        hereby authorized by my signature below
                        <br />
                        <br />
                        Liberty Hospital/Liberty Hospital Foundation will not
                        discriminate in any respect on any application for
                        funding under the Liberty Hospital/Liberty Hospital
                        Foundation Scholarship Award Program because of an
                        applicant’s race, sex, age, national origin, religion,
                        physical or mental impairment, or veteran status.
                      </p>
                      <div className="flex-container row">
                        <div className="input-container col-sm-6 row">
                          <input
                            maxlength="50"
                            className="col-sm-12"
                            type="text"
                            name="signature"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.signature}
                            placeholder="Signature of Applicant (Required)"
                          />
                        </div>
                        <div className="input-container col-sm-6 row bottom">
                          <DatePicker
                            selected={values.date}
                            dateFormat="MMMM d, yyyy"
                            name="date"
                            onChange={(date) => setFieldValue("date", date)}
                          />
                        </div>
                      </div>
                    </div>
                    {submitting ? (
                      <div className="loading">Loading...</div>
                    ) : null}
                    {actions ? (
                      <div className="actions-container MT30">
                        <button
                          onClick={() =>
                            validateForm().then((res) => {
                              if (isObjectEmpty(res))
                                onSubmit({
                                  ...values,
                                  status: "pending",
                                });
                            })
                          }
                        >
                          Submit
                        </button>
                        <button
                          onClick={() =>
                            onSubmit({
                              ...values,
                              status: "draft",
                            })
                          }
                        >
                          Save
                        </button>
                      </div>
                    ) : null}
                    {type !== "user" && !actions ? (
                      <div
                        className={`employee-actions MT30 ${
                          !employeeActions ? "disabled" : ""
                        }`}
                      >
                        <div className="flex-container row">
                          <div className="input-container col-sm-6 row">
                            <label className="col-sm-4 required">Score:</label>
                            <input
                              maxlength="50"
                              className="col-sm-8"
                              type="text"
                              name="score"
                              onChange={(e) =>
                                numberChange(e, setFieldValue, "score")
                              }
                              value={values.score}
                            />
                          </div>
                          <div className="input-container col-sm-6 row">
                            <label className="col-sm-4 required">
                              Comments:
                            </label>
                            <input
                              className="col-sm-8"
                              type="text"
                              name="comments"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.comments}
                            />
                          </div>
                        </div>
                        {employeeActions ? (
                          <div className="actions-container">
                            <button
                              onClick={() =>
                                validateForm().then((res) => {
                                  if (isObjectEmpty(res))
                                    onSubmit({
                                      ...values,
                                      status: "accepted",
                                    });
                                })
                              }
                            >
                              Accepted
                            </button>
                            <button
                              onClick={() =>
                                validateForm().then((res) => {
                                  if (isObjectEmpty(res))
                                    onSubmit({
                                      ...values,
                                      status: "rejected",
                                    });
                                })
                              }
                            >
                              Rejected
                            </button>
                            <button
                              onClick={() =>
                                validateForm().then((res) => {
                                  if (isObjectEmpty(res))
                                    onSubmit({
                                      ...values,
                                      status: "in progress",
                                    });
                                })
                              }
                            >
                              Save
                            </button>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                    {!isObjectEmpty(errors) ? (
                      <div className="error-msg">
                        Please fill out all fields
                      </div>
                    ) : null}
                    <div className="contact-info">
                      For any queries, please contact liberty hospital at
                      <br />
                      <a href="mailto:foundation@libertyhospital.org">
                        foundation@libertyhospital.org
                      </a>{" "}
                      or 816-792-7014
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          )}
        </div>
      ) : (
        <div className="success-message grant-success">
          <h3 className="title">
            Successfully {scholarship_id ? "updated" : "created"} Scholarship
            application
          </h3>
          <p>
            This is your scholarship number{" "}
            <code>{scholarship.id || scholarship_id}</code>. You can use this to
            check status of your scholarship.
          </p>
        </div>
      )}
    </div>
  );
}
