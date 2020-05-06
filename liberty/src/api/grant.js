import api from "api";
import { download as downloadFile } from "lib/download";

export const create = data => {
  let formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return api({
    method: "POST",
    url: "/grant",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data: formData
  });
};

export const get = id => {
  return api({
    method: "GET",
    url: `/grant/${id}`
  });
};

export const list = () => {
  return api({
    method: "GET",
    url: `/grant`
  });
};

export const update = obj => {
  let formData = new FormData();
  for (const key in obj) {
    formData.append(key, obj[key]);
  }
  return api({
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    url: `/grant/${obj.id}`,
    data: formData
  });
};

export const deleteGrant = id => {
  return api({
    method: "DELETE",
    url: `/grant/${id}`
  });
};

export const download = () => {
  let user = localStorage.user ? JSON.parse(localStorage.user) : null;
  let type = user?.type;
  let userId = user?.id;
  return api({
    method: "GET",
    url: `/grant/download?type=${type}&user=${userId}`,
    responseType: "blob"
  }).then(response => {
    downloadFile(response, "grant_list");
  });
};
