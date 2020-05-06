import * as Yup from "yup";

export const ScholarshipSchema = Yup.object().shape({
  firstname: Yup.string().required("Required"),
  lastname: Yup.string().required("Required"),
  street: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  zip: Yup.string().required("Required"),
  home_phone: Yup.string()
    .required("Required")
    .length(10, "Must be of length 10"),
  cell: Yup.string().length(10, "Must be of length 10"),
  email: Yup.string().required("Required").email("Not a valid email"),
  birthdate: Yup.string().required("Required"),
  is_relatives: Yup.string().required("Required"),
  relatives: Yup.string().when("is_relatives", {
    is: true,
    then: Yup.string().required("Required"),
  }),
  no_of_siblings: Yup.number().required("Required"),
  no_in_college: Yup.number().required("Required"),
  k12: Yup.number().required("Required"),
  live_with_parents: Yup.string().required("Required"),
  explain_living: Yup.string().when("live_with_parents", {
    is: "Other",
    then: Yup.string().required("Required"),
  }),
  school: Yup.string().required("Required"),
  school_address: Yup.string().required("Required"),
  school_year: Yup.number().required("Required"),
  class_rank: Yup.number().required("Required"),
  gpa: Yup.number().required("Required"),
  act: Yup.number().nullable(),
  english: Yup.number().nullable(),
  science: Yup.number().nullable(),
  math: Yup.number().nullable(),
  reading: Yup.number().nullable(),
  composite: Yup.number().nullable(),
  counselor: Yup.string().required("Required"),
  counselor_phone: Yup.string()
    .required("Required")
    .length(10, "Must be of length 10"),
  colleges_applied: Yup.string().required("Required"),
  college_planned: Yup.string().required("Required"),
  accepted_nursing: Yup.string().required("Required"),
  signature: Yup.string().required("Required"),
  when_apply: Yup.string()
    .when("accepted_nursing", {
      is: "cant_apply_yet",
      then: Yup.string().required("Required"),
    })
    .nullable(),
  field_of_interest: Yup.string().required("Required"),
  graduate_month: Yup.string().required("Required"),
  transcripts_file: Yup.mixed().required("Required"),
  acceptance_file: Yup.mixed().required("Required"),
  statement_file: Yup.mixed().required("Required"),
  recommendation_file: Yup.mixed().required("Required"),
});
