const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("../api/routes/v1");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();

// request logging. dev: console | production: file
app.use(morgan());
app.use(cors());
app.use(fileUpload());

// parse body params and attach them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", routes);

app.use(express.static(path.join(__dirname, "../../uploads")));

module.exports = app;
