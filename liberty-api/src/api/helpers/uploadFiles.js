// function uploadFiles(id, files, params) {
//   return new Promise(async (resolve, reject) => {
//     var last = Object.keys(files).pop();
//     for (const key in files) {
//       let filePath = `uploads/${id}-${files[key].name}`;
//       files[key].mv(filePath, function(err, file) {
//         if (err) reject(err);
//         params[key] = `${id}-${files[key].name}`;
//         if (key === last) resolve(params);
//       });
//     }
//   });
// }

function uploadFiles(id, files, params) {
  return new Promise(async (resolve, reject) => {
    try {
      var last = Object.keys(files).pop();
      for (const key in files) {
        let filePath = `uploads/${id}-${files[key].name}`;
        await files[key].mv(filePath);
        params[key] = `${id}-${files[key].name}`;
        if (key === last) resolve(params);
      }
    } catch (ex) {
      reject(ex);
    }
  });
}

exports.uploadFiles = uploadFiles;
