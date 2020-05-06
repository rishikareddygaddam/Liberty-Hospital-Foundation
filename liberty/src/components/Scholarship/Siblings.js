import React, { useState } from "react";
import { Field, FieldArray } from "formik";
import { numberChange } from "lib/number";

export default function Siblings({ siblings, setFieldValue, deleteSibling }) {
  return (
    <div className="sibling-container">
      <div className="row">
        <div className="col-sm-4 th">Sibling Names</div>
        <div className="col-sm-1 th">Attending College?</div>
        <div className="col-sm-4 th">Where?</div>
        <div className="col-sm-2 th">Year in School</div>
        <div className="col-sm-1 th">Action</div>
      </div>
      <FieldArray
        name="siblings"
        render={(arrayHelpers) => (
          <div className="input-container">
            {siblings.length > 0
              ? siblings.map((sibling, idx) => (
                  <div className="sibling sibling-item row" key={idx}>
                    <div className="col-sm-4 input-field">
                      <Field type="text" name={`siblings[${idx}].name`} />
                    </div>
                    <div className="col-sm-1 input-field">
                      <Field
                        type="checkbox"
                        name={`siblings[${idx}].college_attending`}
                      />
                    </div>
                    <div className="col-sm-4 input-field">
                      <Field type="text" name={`siblings[${idx}].where`} />
                    </div>
                    <div className="col-sm-2 input-field">
                      <input
                        type="text"
                        value={siblings[idx].year}
                        onChange={(e) =>
                          numberChange(
                            e,
                            setFieldValue,
                            `siblings[${idx}].year`
                          )
                        }
                      />
                    </div>
                    <div className="col-sm-1 ">
                      <label
                        className="delete-sibling"
                        onClick={() =>
                          deleteSibling(idx, setFieldValue, siblings)
                        }
                      >
                        Delete
                      </label>
                    </div>
                  </div>
                ))
              : null}
            <button
              className="add-sibling"
              onClick={() => arrayHelpers.push({ year: "" })}
            >
              Add Sibling
            </button>
          </div>
        )}
      ></FieldArray>
    </div>
  );
}
