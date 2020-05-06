import api from "api";

export const list = () => {
  return api({
    method: "GET",
    url: "/admin/users?page=1&searchParams=%7B%7D",
  });
};
