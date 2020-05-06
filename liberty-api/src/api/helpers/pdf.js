var pdf = require("html-pdf");

const getTableCode = (data, columns) => {
  let headerColumns = columns.map((e) => `<th>${e.name}</th>`).join("");
  let header = `<thead><tr>${headerColumns}</tr></thead>`;
  let colValues = columns.map((e) => e.value);
  let isUpdate = typeof data === "string" ? true : false;
  if (!Array.isArray(data)) {
    data = JSON.parse(data);
  }
  let bodyData = data
    .map((e) => {
      e = isUpdate ? e : e.toJSON();
      let keys = Object.keys(e).filter((key) => colValues.indexOf(key) >= 0);
      let obj = keys.reduce(
        (obj2, key) => Object.assign(obj2, { [key]: e[key] }),
        {}
      );
      return obj;
    })
    .map((e) => `<tr>${getRowContent(e, colValues)}</tr>`)
    .join("");
  let body = `<tbody>${bodyData}</tbody>`;
  let table = `<table border="1">${header}${body}</table>`;
  return table;
};

const getRowContent = (data, columns) => {
  return columns
    .map((e) => `<td>${data[e] === true ? "Yes" : data[e] || "NA"}</td>`)
    .join("");
};

const createPDF = (data, fields, pdfTitle) => {
  const dynamic = fields
    .map((e) => {
      console.log(
        e,
        data[e.value],
        e.columns,
        !e.isTable || (e.isTable && data[e.value].length == 0)
      );
      return `
    <div class="main-header">${e.main_header ? e.main_header : ""}</div>
    <div class="header">${e.header ? e.header : ""}</div>
    <div class="sub-header">${e.subheader ? e.subheader : ""}</div>
    ${
      !e.isTable || (e.isTable && data[e.value].length == 0)
        ? `<div class="field">
        <label class="text">${e.text}: </label>
        <label class="value">
          ${data[e.value] === true ? "Yes" : data[e.value] || "NA"}
        </label>
      </div>`
        : getTableCode(data[e.value], e.columns)
    }
    `;
    })
    .join("");

  var html = `<html>
  <head>
    <style>
      body {
        font-family:"Google Sans";
        padding: 30px 40px;
        font-size: 12px;
      }
      .field {
        margin-bottom: 20px;
      }
      .text {
        margin-bottom: 8px;
        font-weight: 500;
        margin-right: 10px;
      }
      .main-header {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .header {
        font-size: 13px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .sub-header {
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      h3 {
        font-size: 18px;
      }
      table {
        border-collapse: collapse;
      }
      th, td {
        font-size: 10px;
        text-align: center;
      }
    </style>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Google+Sans:400,500,700">
  </head>
  <body>
    <h3>${pdfTitle}</h3>
    <div>
      ${dynamic}
    </div>
  </body>
</html>`;

  var options = {
    format: "A4",
    border: {
      top: "0.5in", // default is 0, units: mm, cm, in, px
      right: "0.5in",
      bottom: "0.5in",
      left: "0.5in",
    },
  };
  return new Promise((resolve, reject) => {
    pdf.create(html, options).toFile(`./${data.id}.pdf`, function (err, res) {
      if (err) reject();
      resolve(res);
    });
  });
};

exports.createPDF = createPDF;
