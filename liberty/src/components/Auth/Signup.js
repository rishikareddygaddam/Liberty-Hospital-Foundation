import React, { useState } from "react";
import styles from "./login.module.scss";
import { signup } from "api/login";
import { Formik } from "formik";
import { SignupSchema } from "./schema";
import { useHistory, useLocation, Link } from "react-router-dom";
import { numberChange } from "lib/number";

export default function Signup() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  async function onSubmit(values, { setSubmitting }) {
    setSubmitting(false);
    const { email, password, name, phone } = values;
    try {
      let type =
        location.pathname.indexOf("employee") > -1 ? "employee" : "user";
      setLoading(true);
      let res = await signup({
        name,
        email,
        password,
        type,
        phone,
        is_approved: null,
      });
      let { from } = location.state || { from: { pathname: "/" } };
      if (type === "user") {
        localStorage.user = JSON.stringify(res.data.user);
        localStorage.access_token = res.data.token;
      } else {
        from = { pathname: "/approval" };
      }
      history.replace(from);
    } catch (ex) {
      setError("There was some problem while sign up");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`${styles.container} auth-container`}>
      <Formik
        initialValues={{
          email: "",
          password: "",
          name: "",
          confirm: "",
          phone: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="logo"></div>
            <h3>Signup</h3>
            <div className="input-container row">
              <label className="col-sm-4 required">Name:</label>
              <input
                className="col-sm-8"
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <span className="validation-error">
                {errors.name && touched.name && errors.name}
              </span>
            </div>

            <div className="input-container row">
              <label className="col-sm-4 required">Email:</label>
              <input
                className="col-sm-8"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <span className="validation-error">
                {errors.email && touched.email && errors.email}
              </span>
            </div>
            <div className="input-container row">
              <label className="col-sm-4 required">Password:</label>
              <input
                className="col-sm-8"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <span className="validation-error">
                {errors.password && touched.password && errors.password}
              </span>
            </div>
            <div className="input-container row">
              <label className="col-sm-4 required">Cofirm Password:</label>
              <input
                className="col-sm-8"
                type="password"
                name="confirm"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirm}
              />
              <span className="validation-error">
                {errors.confirm && touched.confirm && errors.confirm}
              </span>
            </div>
            <div className="input-container row">
              <label className="col-sm-4 required">Phone:</label>
              <input
                className="col-sm-8"
                type="number"
                name="phone"
                onBlur={handleBlur}
                value={values.phone}
                onChange={(e) => numberChange(e, setFieldValue, "phone")}
              />
              <span className="validation-error">
                {errors.phone && touched.phone && errors.phone}
              </span>
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
            {loading ? <span className="auth-loading">Loading...</span> : null}
            <span className="submit-error">{error}</span>
            <div className="links-container justify-center">
              <Link to="/login" className="link-signup">
                Login
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
