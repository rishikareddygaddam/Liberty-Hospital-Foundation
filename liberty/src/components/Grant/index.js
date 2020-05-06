import React, { useState, useEffect, useRef } from "react";
import Header from "../Header";
import "./grant.scss";
import { Formik, Field } from "formik";
import { create, get, update } from "api/grant";
import { GrantSchema } from "./validations";
import { Input } from "reactstrap";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { options } from "./file-options";
import { Helmet } from "react-helmet";
import { numberChange } from "lib/number";

export default function Grant({ match }) {
  let userDetails = JSON.parse(localStorage.user);
  const [grant, setGrant] = useState(null);
  const [grant_id] = useState(match.params.id);
  const [success, setSuccess] = useState(false);
  const [initial, setInitial] = useState({
    agency: "",
    primary: "",
    tax_id: "",
    contact: "",
    person_title: "Mr",
    address: "",
    phone: "",
    fax: "",
    email: "",
    annual: false,
    roster: false,
    audit: false,
    proof: false,
    income: false,
    letters: false,
    info: "",
    docs: "",
    title: "",
    new_or_current: false,
    funding_past: "",
    synopsis: "",
    priority: "",
    main_outcomes: "",
    outcomes: "",
    collaborative: "",
    sources: "",
    sustainability: "",
    describe: "",
    no_of_people: 0,
    socio: "",
    age: "",
    gender: "",
    clients: "",
    budget: "",
    isAdditional: "",
    additional: "",
    head: "",
    head_title: "",
    date: new Date(),
    signature: "",
    director: "",
    funding: 0,
    implementation: "",
    rfp: "",
    zip: "",
    equity: "",
    population: "",
    annual_file: "",
    roster_file: "",
    audit_file: "",
    proof_file: "",
    letters_file: "",
    budget_file: "",
    additional_file: "",
    score: "",
    comments: "",
    isEmployee: false,
    user_id: userDetails.id,
  });
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [actions, setActions] = useState(true);
  const [type, setType] = useState("user");
  const [user, setUser] = useState({});
  const [fileOptions] = useState(options);
  const [defaultOption, changeOption] = useState(options[0]);
  const fileRef = useRef();
  const [submitting, setSubmitting] = useState(false);
  const [allActionsDisable, setAllActionsDisable] = useState(false);
  const budgetRef = useRef();

  const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const onSubmit = async (values) => {
    try {
      setSubmitting(true);
      if (!grant_id) {
        let res = await create(values);
        setGrant(res.data);
      } else {
        // values.status = "draft";
        let res = await update(values);
        setGrant(res.data);
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

  const removeFile = (file_type) => {};

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

  useEffect(() => {
    setUser(userDetails);
    setType(userDetails.type || "user");
    if (userDetails.type !== "user") {
      GrantSchema.shape({
        score: Yup.number().required("Required"),
        comments: Yup.string().required("Required"),
      });
    }
    async function getData() {
      let res = await get(grant_id);
      if (res.data.status !== "draft") {
        setDisabled(true);
        setActions(false);
      }
      if (res.data.status === "accepted" || res.data.status === "rejected") {
        setAllActionsDisable(true);
      }
      setGrant(res.data);

      res.data = {
        ...res.data,
        date: new Date(res.data.date),
        isEmployee: userDetails.type !== "user",
      };
      setInitial(res.data);
      setLoading(false);
    }
    if (grant_id) {
      setLoading(true);
      getData();
    }
  }, [grant_id]);

  return (
    <div className="grants">
      <Helmet>
        <title>Liberty Hospital Foundation - Grant Application</title>
      </Helmet>
      <Header />
      {!success ? (
        <div className="main-container">
          <h3 className="title">LiveWell Grant Application Form</h3>
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            <Formik
              initialValues={initial}
              validationSchema={GrantSchema}
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
                  <div className="input-container row">
                    <label className="col-sm-8"></label>
                    <label className="col-sm-1 required">DATE:</label>
                    <DatePicker
                      selected={values.date}
                      dateFormat="MMMM d, yyyy"
                      name="date"
                      onChange={(date) => setFieldValue("date", date)}
                    />
                  </div>
                  <h5 className="sub-title">Agency Information:</h5>
                  <div className="agency-info">
                    <div className="input-container row ">
                      <label className="col-sm-4 required">
                        Name of Agency:
                      </label>
                      <input
                        maxlength="50"
                        className="col-sm-8"
                        type="text"
                        name="agency"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.agency}
                      />
                    </div>
                    <div className="input-container row">
                      <label className="col-sm-4 required">
                        Primary Agency Tax ID:
                      </label>
                      <input
                        maxlength="50"
                        className="col-sm-8"
                        type="text"
                        name="tax_id"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.tax_id}
                      />
                    </div>
                    <div className="flex-container row DNI">
                      <div className="input-container col-sm-6 row ">
                        <label className="col-sm-4 required">
                          Primary Agency:
                        </label>
                        <input
                          maxlength="50"
                          className="col-sm-8"
                          type="text"
                          name="primary"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.primary}
                        />
                      </div>
                    </div>
                    <div className="flex-container row">
                      <div className="input-container col-sm-6 row">
                        <label className="col-sm-4 required">
                          Contact Person:
                        </label>
                        <input
                          maxlength="50"
                          className="col-sm-8"
                          type="text"
                          name="contact"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.contact}
                        />
                      </div>
                      <div className="input-container col-sm-6 row">
                        <label className="col-sm-4 required">Title:</label>
                        {/* <input maxlength="50"
                        className="col-sm-8"
                        type="text"
                        name="person_title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.person_title}
                      /> */}
                        <Input
                          type="select"
                          id="exampleSelect"
                          name="person_title"
                          className="col-sm-8"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.person_title}
                        >
                          <option>Mr</option>
                          <option>Mrs</option>
                          <option>Ms</option>
                          <option>Others</option>
                        </Input>
                      </div>
                    </div>
                    <div className="input-container row">
                      <label className="col-sm-3 required">
                        Mailing Address:
                      </label>
                      <input
                        maxlength="50"
                        className="col-sm-9"
                        type="text"
                        name="address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                      />
                    </div>
                    <div className="flex-container row">
                      <div className="input-container col-sm-4 row">
                        <label className="col-sm-4 required">Phone:</label>
                        <input
                          maxlength="50"
                          className="col-sm-8"
                          type="number"
                          name="phone"
                          onChange={(e) =>
                            numberChange(e, setFieldValue, "phone")
                          }
                          onBlur={handleBlur}
                          value={values.phone}
                        />
                        <span className="validation-error ML34">
                          {errors.phone || touched.phone}
                        </span>
                      </div>
                      <div className="input-container col-sm-4 row">
                        <label className="col-sm-4 required">Fax:</label>
                        <input
                          maxlength="50"
                          className="col-sm-8"
                          type="text"
                          name="fax"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.fax}
                        />
                      </div>
                      <div className="input-container col-sm-4 row ML34">
                        <label className="col-sm-4 required">E-Mail:</label>
                        <input
                          maxlength="50"
                          className="col-sm-8"
                          type="text"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        <span className="validation-error">
                          {errors.email || touched.email}
                        </span>
                      </div>
                    </div>
                    <div className="input-container row">
                      <label className="col-sm-4 required">
                        Briefly summarize the mission of your agency:
                      </label>
                      <input
                        maxlength="50"
                        className="col-sm-8"
                        type="text"
                        name="info"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.info}
                      />
                    </div>
                  </div>
                  <div className="copies-container separate-container">
                    <div className="p-text">
                      Please attach copies of the following documents with your
                      grant application for each of the requesting agencies:
                    </div>
                    {true ? null : (
                      <div className="check-container">
                        <div className="chk-container disable-chk">
                          <label htmlFor="annual">
                            <Field
                              type="checkbox"
                              value="true"
                              id="annual"
                              checked={values.annual}
                            />
                            Latest annual report
                          </label>
                          {values.annual_file && grant_id ? (
                            <a
                              className="view-file"
                              target="blank"
                              href={`http://localhost:4000/${values.annual_file}`}
                            >
                              View File
                            </a>
                          ) : (
                            <input
                              maxlength="50"
                              type="file"
                              accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                              name="annual_file"
                              onChange={(e) => {
                                setFieldValue(
                                  "annual_file",
                                  e.currentTarget.files[0]
                                );
                                setFieldValue("annual", true);
                              }}
                            />
                          )}
                        </div>
                        <div className="chk-container disable-chk">
                          <label htmlFor="roster">
                            <Field
                              type="checkbox"
                              value="true"
                              id="roster"
                              checked={values.roster}
                            />
                            Current roster of Board of Directors and staff
                          </label>
                          {values.roster_file && grant_id ? (
                            <a
                              className="view-file"
                              target="blank"
                              href={`http://localhost:4000/${values.roster_file}`}
                            >
                              View File
                            </a>
                          ) : (
                            <input
                              maxlength="50"
                              type="file"
                              accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                              name="roster_file"
                              onChange={(e) => {
                                setFieldValue(
                                  "roster_file",
                                  e.currentTarget.files[0]
                                );
                                setFieldValue("roster", true);
                              }}
                            />
                          )}
                        </div>
                        <div className="chk-container disable-chk">
                          <label htmlFor="audit">
                            <Field
                              type="checkbox"
                              value="true"
                              id="audit"
                              checked={values.audit}
                            />
                            Latest financial audit
                          </label>
                          {values.audit_file && grant_id ? (
                            <a
                              className="view-file"
                              target="blank"
                              href={`http://localhost:4000/${values.audit_file}`}
                            >
                              View File
                            </a>
                          ) : (
                            <input
                              maxlength="50"
                              type="file"
                              accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                              name="audit_file"
                              onChange={(e) => {
                                setFieldValue(
                                  "audit_file",
                                  e.currentTarget.files[0]
                                );
                                setFieldValue("audit", true);
                              }}
                            />
                          )}
                        </div>
                        <div className="chk-container disable-chk">
                          <label htmlFor="proof">
                            <Field
                              type="checkbox"
                              value="true"
                              id="proof"
                              checked={values.proof}
                            />
                            Proof of organization’s active 501(c)(3) non-profit
                            status from the Internal Revenue Service
                          </label>
                          {values.proof_file && grant_id ? (
                            <a
                              className="view-file"
                              target="blank"
                              href={`http://localhost:4000/${values.proof_file}`}
                            >
                              View File
                            </a>
                          ) : (
                            <input
                              maxlength="50"
                              type="file"
                              accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                              name="proof_file"
                              onChange={(e) => {
                                setFieldValue(
                                  "proof_file",
                                  e.currentTarget.files[0]
                                );
                                setFieldValue("proof", true);
                              }}
                            />
                          )}
                        </div>
                        <div className="chk-container disable-chk DNI">
                          <label htmlFor="income">
                            <Field
                              type="checkbox"
                              value="true"
                              id="income"
                              checked={values.income}
                            />
                            Last fiscal year income statement detailing sources
                            and use of funds
                          </label>
                        </div>
                        <div className="chk-container disable-chk">
                          <label htmlFor="letters">
                            <Field
                              type="checkbox"
                              value="true"
                              id="letters"
                              checked={values.letters}
                            />
                            Letters of Support/ Memorandums of Agreement from
                            collaborating agencies/ partners
                          </label>
                          {values.letters_file && grant_id ? (
                            <a
                              className="view-file"
                              target="blank"
                              href={`http://localhost:4000/${values.letters_file}`}
                            >
                              View File
                            </a>
                          ) : (
                            <input
                              maxlength="50"
                              type="file"
                              accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                              name="letters_file"
                              onChange={(e) => {
                                setFieldValue(
                                  "letters_file",
                                  e.currentTarget.files[0]
                                );
                                setFieldValue("letters", true);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    )}
                    <div>{getFiles(values, setFieldValue)}</div>
                    <div className="row files-dropdown">
                      <Dropdown
                        options={options}
                        onChange={optionChange}
                        value={defaultOption}
                        placeholder="Select an option"
                        className="col-sm-8"
                      />
                      <div className="col-sm-4">
                        <button className="file-btn" onClick={openFileSelector}>
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
                  <h5 className="sub-title MT30">Project Information:</h5>
                  <div>
                    <div className="input-container row">
                      <label className="col-sm-2 required">
                        Project Title:
                      </label>
                      <input
                        maxlength="50"
                        maxlength="50"
                        className="col-sm-10"
                        type="text"
                        name="title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                      />
                    </div>
                    <div className="input-container row">
                      <label className="col-sm-2 required">
                        Project Director:
                      </label>
                      <input
                        maxlength="50"
                        maxlength="50"
                        className="col-sm-10"
                        type="text"
                        name="director"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.director}
                      />
                    </div>
                    <div className="input-container row">
                      <label className="col-sm-2 required">
                        Amount of funding requested:
                      </label>
                      <input
                        maxlength="50"
                        maxlength="50"
                        className="col-sm-10"
                        type="text"
                        name="funding"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.funding}
                      />
                    </div>
                    <div className="input-container row">
                      <label className="col-sm-6 required">
                        Is this a new project or a continuation of a current
                        project?:
                      </label>
                      {/* <input maxlength="50" maxlength="50"
                        className="col-sm-6"
                        type="text"
                        name="new_or_current"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.new_or_current}
                      /> */}
                      <label className="col-sm-2">
                        <input
                          maxlength="50"
                          maxlength="50"
                          type="radio"
                          name="new_or_current"
                          value="Yes"
                          checked={values.new_or_current === "Yes"}
                          onChange={() =>
                            setFieldValue("new_or_current", "Yes")
                          }
                        />
                        Yes
                      </label>
                      <label className="col-sm-2">
                        <input
                          maxlength="50"
                          maxlength="50"
                          type="radio"
                          name="new_or_current"
                          value="No"
                          checked={values.new_or_current === "No"}
                          onChange={() => setFieldValue("new_or_current", "No")}
                        />
                        No
                      </label>
                    </div>
                    <div className="input-container row">
                      <label className="col-sm-6 required">
                        Have you received funding from the LiveWell Grant
                        Program in the past? Please detail previous grant
                        amount(s), and if outcomes from previous award(s) were
                        met.
                      </label>
                      <input
                        maxlength="50"
                        maxlength="50"
                        className="col-sm-6"
                        type="text"
                        name="funding_past"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.funding_past}
                      />
                    </div>
                    <div className="input-container row">
                      <label className="col-sm-6 required">
                        Project Narrative (150 word maximum):
                      </label>
                      <input
                        maxlength="50"
                        maxlength="50"
                        className="col-sm-6"
                        type="text"
                        name="synopsis"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.synopsis}
                      />
                    </div>
                    <div className="input-container row">
                      <label className="col-sm-6 required">
                        Project Implementation (250 word maximum):
                      </label>
                      <input
                        maxlength="50"
                        maxlength="50"
                        className="col-sm-6"
                        type="text"
                        name="implementation"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.implementation}
                      />
                    </div>
                    <div className="input-container row">
                      <label className="col-sm-6 required">
                        How does this project directly address one or more of
                        the current priorities of the 2020 LiveWell Grant cycle?
                        (List provided in RFP):
                      </label>
                      <input
                        maxlength="50"
                        className="col-sm-6"
                        type="text"
                        name="rfp"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.rfp}
                      />
                    </div>
                    <div className="input-container row">
                      <label className="col-sm-6 required">
                        Which of the six key ZIP codes will be served by this
                        project? List all that apply. How will funds be tracked
                        to ensure proper allocation? (List provided in RFP):
                      </label>
                      <input
                        maxlength="50"
                        className="col-sm-6"
                        type="text"
                        name="zip"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.zip}
                      />
                    </div>
                    <div className="input-container row">
                      <label className="col-sm-6 required">
                        What are the suspected outcomes of this project?
                      </label>
                      <input
                        maxlength="50"
                        className="col-sm-6"
                        type="text"
                        name="main_outcomes"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.main_outcomes}
                      />
                    </div>
                    <div className="input-container row">
                      <label className="col-sm-6 required">
                        How will outcomes be evaluated?
                      </label>
                      <input
                        maxlength="50"
                        className="col-sm-6"
                        type="text"
                        name="outcomes"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.outcomes}
                      />
                    </div>
                    <div className="input-container row">
                      <label className="col-sm-6">
                        Describe how this project addresses health equity:
                      </label>
                      <input
                        maxlength="50"
                        className="col-sm-6"
                        type="text"
                        name="equity"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.equity}
                      />
                    </div>
                    <div className="input-container row">
                      <label className="col-sm-6">
                        Describe any collaborative efforts and list supporting
                        organizations (if applicable):
                      </label>
                      <input
                        maxlength="50"
                        className="col-sm-6"
                        type="text"
                        name="collaborative"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.collaborative}
                      />
                    </div>
                    <div className="input-container row">
                      <label className="col-sm-6">
                        Identify other sources of support for this project
                        (indicate if funding has been secured):
                      </label>
                      <input
                        maxlength="50"
                        className="col-sm-6"
                        type="text"
                        name="sources"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.sources}
                      />
                    </div>
                    <div className="input-container row">
                      <label className="col-sm-6 required">
                        What is the sustainability plan for this project?
                      </label>
                      <input
                        maxlength="50"
                        className="col-sm-6"
                        type="text"
                        name="sustainability"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.sustainability}
                      />
                    </div>
                    <div className="input-container row DNI">
                      <label className="col-sm-6">
                        The Liberty Hospital Half Marathon is the primary source
                        of funds for the LiveWell Grant Program. An effort to
                        recruit volunteers and participants, and promotion of
                        the event is expected of awardee organizations. Please
                        describe how your organization(s) will support and raise
                        awareness of the event.
                      </label>
                      <input
                        maxlength="50"
                        className="col-sm-6"
                        type="text"
                        name="describe"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.describe}
                      />
                    </div>
                    <div className="p-text MT30">
                      Please complete the following information on project
                      beneficiaries:
                    </div>
                    <div className="input-container row">
                      <label className="col-sm-6 required">
                        1. How many people will this project serve?
                      </label>
                      <input
                        maxlength="50"
                        className="col-sm-6"
                        type="text"
                        name="no_of_people"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.no_of_people}
                      />
                    </div>
                    <div className="input-container row">
                      <label className="col-sm-6 required">
                        2. Describe the population served (socioeconomic status,
                        age, gender, etc.)
                      </label>
                      <input
                        maxlength="50"
                        className="col-sm-6"
                        type="text"
                        name="socio"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.socio}
                      />
                    </div>
                    <div className="input-container row DNI">
                      <label className="col-sm-6 required">
                        3. What are the age demographics for the population
                        served?
                      </label>
                      <input
                        maxlength="50"
                        className="col-sm-6"
                        type="text"
                        name="age"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.age}
                      />
                    </div>
                    <div className="input-container row DNI">
                      <label className="col-sm-6 required">
                        4. What are the gender demographics for the population
                        served?
                      </label>
                      <input
                        maxlength="50"
                        className="col-sm-6"
                        type="text"
                        name="gender"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.gender}
                      />
                    </div>
                    <div className="input-container row">
                      <label className="col-sm-6 required">
                        3. How are clients/ recipients of service selected or
                        found?
                      </label>
                      <input
                        maxlength="50"
                        className="col-sm-6"
                        type="text"
                        name="clients"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.clients}
                      />
                    </div>
                    <div className="input-container row">
                      <label className="col-sm-6 required">
                        4. Is the population served medically underinsured/
                        underserved?
                      </label>
                      <input
                        maxlength="50"
                        className="col-sm-6"
                        type="text"
                        name="population"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.population}
                      />
                    </div>
                  </div>
                  <div className="copies-container separate-container">
                    <div className="p-text">
                      Please attach copies of the following documents with your
                      grant application:
                    </div>
                    <div className="chk-container disable-chk">
                      <label htmlFor="budget">
                        <Field
                          type="checkbox"
                          value="true"
                          id="budget"
                          checked={values.budget}
                        />
                        Completed budget for proposed project, with detailed
                        income and expenses
                      </label>
                      {values.budget_file && grant_id ? (
                        <a
                          className="view-file"
                          target="blank"
                          href={`http://localhost:4000/${values.budget_file}`}
                        >
                          View File
                        </a>
                      ) : (
                        <input
                          maxlength="50"
                          type="file"
                          accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                          name="budget_file"
                          ref={budgetRef}
                          onChange={(e) => {
                            setFieldValue(
                              "budget_file",
                              e.currentTarget.files[0]
                            );
                            setFieldValue("budget", true);
                          }}
                        />
                      )}
                      {values.budget_file ? (
                        <label
                          className="remove-file"
                          onClick={() => {
                            budgetRef.current.value = null;
                            setFieldValue("budget", null);
                            setFieldValue("budget_file", null);
                          }}
                        ></label>
                      ) : null}
                    </div>
                    <div className="chk-container disable-chk">
                      <label htmlFor="isAdditional">
                        <Field
                          type="checkbox"
                          value="true"
                          id="isAdditional"
                          checked={values.isAdditional}
                        />
                        Any Additional:
                      </label>
                    </div>
                    {values.isAdditional ? (
                      <div className="additional-textarea">
                        <textarea
                          name="additional"
                          onBlur={handleBlur}
                          value={values.additional}
                          onChange={handleChange}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <h5 className="sub-title MT30">Submission</h5>
                  <div className="copies-container separate-container">
                    <div className="p-text">
                      With my signature I certify the following: The above
                      information is correct; I am authorized by the governing
                      board of this organization to submit this grant
                      application to the Liberty Hospital Foundation; this
                      organization is in good standing with the IRS, retains its
                      501(c)(3) tax-exempt status; this organization does not
                      discriminate on the basis of race, religion, sexual
                      preference, physical circumstances, or national origin.
                    </div>
                  </div>
                  <div className="flex-container row">
                    <div className="input-container col-sm-6 row">
                      <input
                        maxlength="50"
                        className="col-sm-12"
                        type="text"
                        name="head"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.head}
                        placeholder="Printed Name, Head of Primary Agency"
                      />
                    </div>
                    <div className="input-container col-sm-6 row">
                      <input
                        maxlength="50"
                        className="col-sm-12"
                        type="text"
                        name="head_title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.head_title}
                        placeholder="Title"
                      />
                    </div>
                  </div>
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
                        placeholder="Signature, Head of Primary Agency (Required)"
                      />
                    </div>
                    <div className="input-container col-sm-6 row bottom">
                      <DatePicker
                        selected={values.date}
                        dateFormat="MMMM d, yyyy"
                        name="date"
                        onChange={(date) => setFieldValue("date", date)}
                      />
                      {/* <input maxlength="50"
                        className="col-sm-12"
                        type="text"
                        name="date"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.date}
                        placeholder="Date"
                      /> */}
                    </div>
                  </div>
                  {submitting ? (
                    <div className="loading">Loading...</div>
                  ) : null}
                  <div className="p-text MT20 DNI">
                    Please submit grant applications with all required
                    attachments via e-mail by 12:00 p.m. on Wednesday, March 4
                    to:
                    <div className="send-to">
                      Maddison Watkins, Operations Coordinator
                      <br /> Liberty Hospital Foundation
                      <br />
                      <a href="mailto:maddison.watkins@libertyhospital.org">
                        maddison.watkins@libertyhospital.org
                      </a>
                      <br /> Hard copy applications will not be accepted.
                    </div>
                  </div>
                  {actions ? (
                    <div
                      className={`actions-container ${
                        submitting ? "pointer-none" : ""
                      }`}
                    >
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
                      className={`employee-actions ${
                        allActionsDisable ? "all-disable" : ""
                      }`}
                    >
                      <div className="flex-container row">
                        <div className="input-container col-sm-6 row">
                          <label className="col-sm-4 required">Score:</label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="number"
                            name="score"
                            onChange={(e) =>
                              numberChange(e, setFieldValue, "score")
                            }
                            onBlur={handleBlur}
                            value={values.score}
                          />
                        </div>
                        <div className="input-container col-sm-6 row">
                          <label className="col-sm-4 required">Comments:</label>
                          <input
                            maxlength="50"
                            className="col-sm-8"
                            type="text"
                            name="comments"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.comments}
                          />
                        </div>
                      </div>
                      {allActionsDisable ? null : (
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
                      )}
                    </div>
                  ) : null}
                  {!isObjectEmpty(errors) ? (
                    <div className="error-msg">Please fill out all fields</div>
                  ) : null}
                </form>
              )}
            </Formik>
          )}
        </div>
      ) : (
        <div className="success-message grant-success">
          <h3 className="title">
            Successfully {grant_id ? "updated" : "created"} Grant application
          </h3>
          <p>
            This is your grant number <code>{grant.id || grant_id}</code>. You
            can use this to check status of your grant.
          </p>
        </div>
      )}
    </div>
  );
}
