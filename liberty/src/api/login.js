import api from "api";

export const login = (data) => {
  return api({
    method: "POST",
    url: "/auth/login",
    data,
  });
};

export const signup = (data) => {
  return api({
    method: "POST",
    url: "/auth/signup",
    data,
  });
};

export const forgot = (data) => {
  return api({
    method: "POST",
    url: "/auth/forgot",
    data,
  });
};

export const reset = (data) => {
  return api({
    method: "POST",
    url: "/auth/reset",
    data,
  });
};

export const unapproved = () => {
  return api({
    method: "GET",
    url: "/auth/unapproved",
  });
};

export const approvalAction = (data) => {
  return api({
    method: "POST",
    url: "/auth/approval",
    data,
  });
};
