import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import Header from "../Header";
import { list, deleteGrant, download } from "api/grant";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function List() {
  const [grants, setGrants] = useState([]);
  const userDetails = localStorage.user ? JSON.parse(localStorage.user) : null;
  const type = userDetails?.type;
  const [isDownloads] = useState(type != "user");

  useEffect(() => {
    async function getData() {
      let res = await list();
      let dataList = res.data;
      if (userDetails.type !== "user") {
        dataList = dataList.filter((e) => {
          return (
            e.status !== "draft" || e.user_id === userDetails.id.toString()
          );
        });
      } else {
        dataList = dataList.filter((e) => {
          return e.user_id === userDetails.id.toString();
        });
      }
      setGrants(dataList);
    }
    getData();
  }, []);

  const deleteItem = async (id) => {
    await deleteGrant(id);
    setGrants(grants.filter((e) => e.id !== id));
  };

  return (
    <>
      <Helmet>
        <title>Liberty Hospital Foundation - Review Grants</title>
      </Helmet>
      <Header />
      <div className="grant-list">
        {isDownloads ? (
          <div className="download-container">
            <button onClick={() => download()}>Download List</button>
          </div>
        ) : null}
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Confirmation Number</th>
              <th>Grant</th>
              <th>Status</th>
              {type !== "employee" && type !== "admin" ? (
                <th>Actions</th>
              ) : (
                <>
                  <th>Score</th>
                  <th>Comments</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {grants.map((e) => (
              <tr key={e.id}>
                <td>{e.agency}</td>
                <td>{e.id}</td>
                <td>
                  <Link to={`/grant/${e.id}`}>Link</Link>
                </td>
                <td className="capitalize">{e.status || "NA"}</td>
                {type !== "employee" && type !== "admin" ? (
                  <td>
                    <button onClick={() => deleteItem(e.id)}>Delete</button>
                  </td>
                ) : (
                  <>
                    <td className="capitalize">{e.score || "NA"}</td>
                    <td className="capitalize">{e.comments || "NA"}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default List;
