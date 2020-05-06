import React from "react";
import { Field, FieldArray } from "formik";

export default function Activities({ activities }) {
  return (
    <div className="sibling-container">
      <div className="row">
        <div className="col-sm-4 th">Organization/Activity Name</div>
        <div className="col-sm-2 th">School Year 2015-2016</div>
        <div className="col-sm-1 th">2016-2017</div>
        <div className="col-sm-1 th">2017-2018</div>
        <div className="col-sm-1 th">2018-2019</div>
        <div className="col-sm-3 th">Involvement/Leadership role</div>
      </div>
      <FieldArray
        name="activities"
        render={arrayHelpers => (
          <div className="input-container">
            {activities.length > 0
              ? activities.map((sibling, idx) => (
                  <div className="sibling sibling-item row" key={idx}>
                    <div className="col-sm-4 input-field">
                      <Field type="text" name={`activities[${idx}].name`} />
                    </div>
                    <div className="col-sm-2 input-field">
                      <Field
                        type="checkbox"
                        name={`activities[${idx}].year1516`}
                      />
                    </div>
                    <div className="col-sm-1 input-field">
                      <Field
                        type="checkbox"
                        name={`activities[${idx}].year1617`}
                      />
                    </div>
                    <div className="col-sm-1 input-field">
                      <Field
                        type="checkbox"
                        name={`activities[${idx}].year1718`}
                      />
                    </div>
                    <div className="col-sm-1 input-field">
                      <Field
                        type="checkbox"
                        name={`activities[${idx}].year1819`}
                      />
                    </div>
                    <div className="col-sm-3 input-field">
                      <Field type="text" name={`activities[${idx}].role`} />
                    </div>
                  </div>
                ))
              : null}
            <button
              className="add-sibling"
              onClick={() => arrayHelpers.push("")}
            >
              Add Curricular Activity
            </button>
          </div>
        )}
      ></FieldArray>
    </div>
  );
}
