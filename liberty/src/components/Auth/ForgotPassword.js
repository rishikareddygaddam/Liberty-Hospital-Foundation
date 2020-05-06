import React, { useState } from "react";
import { Formik } from "formik";
import { forgot } from "api/login";
import { ForgotSchema } from "./schema";
import styles from "./login.module.scss";

export default function ForgotPassword(props) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  async function onSubmit(values) {
    const { email } = values;
    try {
      setLoading(true);
      await forgot({
        email
      });
      setSuccess("Sent a password reset link to your email.");
    } catch (ex) {
      setError("Email or Password is wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`${styles.container} auth-container`}>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={ForgotSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            <h3>Forgot Password</h3>
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
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Submit
            </button>
            {loading ? <span className="auth-loading">Loading...</span> : null}
            <span className="success-msg">{success}</span>
            <span
              className={`${styles.validation_error} ${styles.auth_error} auth-error`}
            >
              {error}
            </span>
          </form>
        )}
      </Formik>
    </div>
  );
}
