import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(4, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
});

export const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(4, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords don't match!")
    .required("Required"),
  name: Yup.string().required("Required"),
  phone: Yup.string().required("Required").length(10, "Must be of length 10"),
});

export const ForgotSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

export const ResetSchema = Yup.object().shape({
  password: Yup.string()
    .min(4, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  confirm: Yup.string()
    .min(4, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
});
