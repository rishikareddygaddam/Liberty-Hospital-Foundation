import api from "api";

export const list = () => {
  return api({
    method: "GET",
    url: "/admin/projects?page=1&per_page=20&searchParams=%7B%7D"
  });
};
