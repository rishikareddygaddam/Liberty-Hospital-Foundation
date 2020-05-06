import api from "api";
import { download as downloadFile } from "lib/download";

let month = new Date().getMonth();
let year = new Date().getFullYear();

month = `${month}${year}`;

export const create = data => {
  data = {
    ...data,
    month
  };
  return api({
    method: "POST",
    url: `/program/${data.type}`,
    data
  });
};

export const get = id => {
  return api({
    method: "GET",
    url: `/program/${id}`,
    params: {
      month
    }
  });
};

export const list = () => {
  return api({
    method: "GET",
    url: `/program`
  });
};

export const update = obj => {
  return api({
    method: "PUT",
    url: `/program/${obj.type}`,
    data: obj
  });
};

export const download = type => {
  return api({
    method: "GET",
    url: `/program/${type}/download`,
    responseType: "blob",
    params: {
      month
    }
  }).then(response => {
    downloadFile(response, type);
  });
};
