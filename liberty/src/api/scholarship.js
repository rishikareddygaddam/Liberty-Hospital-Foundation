import api from "api";
import { download as downloadFile } from "lib/download";

export const create = data => {
  let formData = new FormData();
  for (const key in data) {
    let val = data[key];
    if (key === "siblings" || key === "activities") {
      val = JSON.stringify(val);
    }
    formData.append(key, val);
  }
  return api({
    method: "POST",
    url: "/scholarship",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data: formData
  });
};

export const get = id => {
  return api({
    method: "GET",
    url: `/scholarship/${id}`
  });
};

export const list = () => {
  return api({
    method: "GET",
    url: `/scholarship`
  });
};

export const update = obj => {
  let formData = new FormData();
  for (const key in obj) {
    let val = obj[key];
    if (key === "siblings" || key === "activities") {
      val = JSON.stringify(val);
    }
    formData.append(key, val);
  }
  return api({
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    url: `/scholarship/${obj.id}`,
    data: formData
  });
};

export const deleteGrant = id => {
  return api({
    method: "DELETE",
    url: `/scholarship/${id}`
  });
};

export const download = () => {
  return api({
    method: "GET",
    url: `/scholarship/download`,
    responseType: "blob"
  }).then(response => {
    downloadFile(response, "scholarship_list");
  });
};
