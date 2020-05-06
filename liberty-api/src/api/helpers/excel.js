const Excel = require("exceljs");

exports.download = async (tablefields, rows) => {
  return new Promise(async (resolve, reject) => {
    try {
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet("list");

      worksheet.columns = tablefields;
      worksheet.addRows(rows);
      worksheet.findRow(1).font = {
        bold: true
      };

      await workbook.xlsx.writeFile("export.xlsx");
      const file = `export.xlsx`;
      resolve(file);
    } catch (ex) {
      reject(ex);
    }
  });
};
