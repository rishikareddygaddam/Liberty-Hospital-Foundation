export const download = (response, name) => {
  const type = response.headers["content-type"];
  const url = window.URL.createObjectURL(
    new Blob([response.data], {
      type: type,
      encoding: "UTF-8"
    })
  );
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", name + ".xlsx"); //or any other extension
  document.body.appendChild(link);
  link.click();
};
