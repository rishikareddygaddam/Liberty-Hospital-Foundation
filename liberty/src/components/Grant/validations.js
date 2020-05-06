import * as Yup from "yup";

export const GrantSchema = Yup.object().shape({
  agency: Yup.string().required("Required"),
  tax_id: Yup.string().required("Required"),
  contact: Yup.string().required("Required"),
  info: Yup.string().required("Required"),
  person_title: Yup.string().required("Required"),
  fax: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  email: Yup.string()
    .required("Required")
    .email("Not a valid email"),
  phone: Yup.string()
    .required("Required")
    .length(10, "Must be of length 10"),
  title: Yup.string().required("Required"),
  new_or_current: Yup.string().required("Required"),
  funding_past: Yup.string().required("Required"),
  synopsis: Yup.string().required("Required"),
  director: Yup.string().required("Required"),
  funding: Yup.string().required("Required"),
  implementation: Yup.string().required("Required"),
  main_outcomes: Yup.string().required("Required"),
  outcomes: Yup.string().required("Required"),
  sustainability: Yup.string().required("Required"),
  signature: Yup.string().required("Required"),
  annual_file: Yup.mixed().required("Required"),
  roster_file: Yup.mixed().required("Required"),
  audit_file: Yup.mixed().required("Required"),
  proof_file: Yup.mixed().required("Required"),
  letters_file: Yup.mixed().required("Required"),
  budget_file: Yup.mixed().required("Required"),
  score: Yup.number().when("isEmployee", {
    is: true,
    then: Yup.number().required("Required")
  }),
  comments: Yup.string().when("isEmployee", {
    is: true,
    then: Yup.string().required("Required")
  })
});
