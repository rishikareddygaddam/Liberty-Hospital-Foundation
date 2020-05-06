const app = require("./src/config/express");
const PORT = process.env.PORT || 4000;
const models = require("./src/api/models");

app.listen(PORT, () => {
  console.log("Listening at Port " + PORT);
});
