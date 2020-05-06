import React, { useState } from "react";
import { Formik } from "formik";
import { reset } from "api/login";
import { ResetSchema } from "./schema";
import styles from "./login.module.scss";
import { useParams } from "react-router";

export default function ResetPassword() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { token } = useParams();
  const [loading, setLoading] = useState(false);

  async function onSubmit(values) {
    setError(null);
    setSuccess(null);
    const { password, confirm } = values;
    try {
      if (password === confirm) {
        setLoading(true);
        await reset({
          password,
          token
        });
        setSuccess(
          "Successfully reset the password. Please login with your new password"
        );
      } else setError("Passwords do not match.");
    } catch (ex) {
      setError(ex.response.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`${styles.container} auth-container`}>
      <Formik
        initialValues={{ password: "", confirm: "" }}
        validationSchema={ResetSchema}
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
              <label className="col-sm-4 required">Confirm Password:</label>
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
