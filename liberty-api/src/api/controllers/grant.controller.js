const models = require("../models");
const shortid = require("shortid");
const { sendMail } = require("../helpers/mail");
const { createPDF } = require("../helpers/pdf");
const { fields } = require("../helpers/grant.fields");
const { uploadFiles } = require("../helpers/uploadFiles");
const { tablefields } = require("../helpers/export-table");
const { download } = require("../helpers/excel");

exports.create = async (req, res) => {
  try {
    let id = shortid.generate();
    let params = req.body;

    let files = req.files;
    if (files) params = await uploadFiles(id, files, params);

    let grant = await models.Grant.create({
      id,
      ...params,
    });
    if (req.body.status === "pending") {
      let pdf = await createPDF(grant, fields, "Grant Application");
      await sendMail(
        `Successfully submitted Grant Application. This is your tracking number. ${id}`,
        "Liberty Hospital",
        req.body.email,
        [
          {
            filename: "grant.pdf", // <= Here: made sure file name match
            path: pdf.filename, // <= Here
            contentType: "application/pdf",
          },
        ]
      );
      res.status(200).send(grant);
    } else res.status(200).send(grant);
  } catch (ex) {
    res.status(500).send({
      error: ex.stack,
    });
  }
};

exports.get = async (req, res) => {
  try {
    let grant = await models.Grant.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send(grant[0]);
  } catch (ex) {
    res.status(500).send({
      error: ex.stack,
    });
  }
};

exports.list = async (req, res) => {
  try {
    let grants = await models.Grant.findAll();
    res.status(200).send(grants);
  } catch (ex) {
    res.status(500).send({
      error: ex.stack,
    });
  }
};

exports.update = async (req, res) => {
  try {
    let params = req.body;
    let files = req.files;
    let id = req.params.id;
    if (files) params = await uploadFiles(id, files, params);

    let existing = await models.Grant.findAll({
      where: {
        id,
      },
    });

    existing = existing[0];

    let grant = await models.Grant.update(params, {
      where: {
        id,
      },
    });

    if (existing && existing.status == "draft" && params.status == "pending") {
      let pdf = await createPDF(params, fields, "Grant Application");
      await sendMail(
        `Successfully submitted Grant Application. This is your tracking number. ${id}`,
        "Liberty Hospital",
        req.body.email,
        [
          {
            filename: "grant.pdf", // <= Here: made sure file name match
            path: pdf.filename, // <= Here
            contentType: "application/pdf",
          },
        ]
      );
    }
    res.status(200).send(grant);
  } catch (ex) {
    res.status(500).send({
      error: ex.stack,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    let grant = await models.Grant.findAll({
      where: {
        id: req.params.id,
      },
    });
    if (grant.length) {
      await models.Grant.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send(204).send({
        msg: "Grant deleted successfully",
      });
    } else {
      res.send(404).send({
        msg: "Grant doesn't exist",
      });
    }
  } catch (ex) {
    res.status(500).send({
      error: ex.stack,
    });
  }
};

exports.download = async (req, res) => {
  let query = {};
  let { type, user } = req.query;
  if (type === "user") {
    query = {
      where: {
        user_id: user,
      },
    };
  }
  let grants = await models.Grant.findAll(query);

  let rows = [];
  grants = grants.map((e) => {
    rows.push([
      e.agency,
      e.id,
      e.status || "NA",
      e.score || "NA",
      e.comments || "NA",
    ]);
  });

  const file = await download(tablefields, rows);

  res.download(file, "grant_list.xslx");
};
