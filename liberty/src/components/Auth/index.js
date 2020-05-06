import React, { useState } from "react";
import { Formik } from "formik";
import { Redirect, Link } from "react-router-dom";
import styles from "./login.module.scss";
import { login } from "api/login";
import { LoginSchema } from "./schema";
import { useHistory, useLocation } from "react-router-dom";

export default function Login(props) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const isLoggedIn = localStorage.access_token;
  const history = useHistory();
  const location = useLocation();
  const referer = props.location.state
    ? props.location.state.referer || "/"
    : "/";
  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

  async function onSubmit(values, { setSubmitting }) {
    // setSubmitting(false);
    const { email, password } = values;
    try {
      setLoading(true);
      let res = await login({
        email,
        password,
      });
      const user = res.data.user;
      let from = location.state?.referer?.pathname || {
        pathname: "/",
      };

      if (user.type !== "employee" || user.is_approved) {
        localStorage.user = JSON.stringify(res.data.user);
        localStorage.access_token = res.data.token;
      } else if (!user.is_approved) {
        from = {
          pathname: "/approval",
        };
      }
      history.replace(from);
    } catch (ex) {
      setError("Email or Password is wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`${styles.container} auth-container`}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
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
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="logo"></div>
            <h3>Login</h3>
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
            <div className="forgot-container">
              <Link to="/forgot" className="forgot-password">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Submit
            </button>
            {loading ? <span className="auth-loading">Loading...</span> : null}
            <span
              className={`${styles.validation_error} ${styles.auth_error} auth-error`}
            >
              {error}
            </span>
            <div className="links-container">
              <Link to="/signup" className="link-signup">
                Signup
              </Link>
              <Link to="/signup/employee" className="link-signup">
                Admin Signup
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
