const models = require("../models");
const shortid = require("shortid");
const { sendMail } = require("../helpers/mail");
const { createPDF } = require("../helpers/pdf");
const { fields } = require("../helpers/scholarship.fields");
const { uploadFiles } = require("../helpers/uploadFiles");
const { tablefields } = require("../helpers/export-table");
const { download } = require("../helpers/excel");

exports.create = async (req, res) => {
  try {
    let id = shortid.generate();
    let params = req.body;

    let files = req.files;
    if (files) {
      params = await uploadFiles(id, files, params);
    }

    let scholarship = await models.Scholarship.create({
      id,
      ...params,
    });

    let siblings = JSON.parse(params.siblings);
    siblings = await Promise.all(
      siblings.map((e) => {
        return models.Sibling.create({
          ...e,
          scholarshipId: id,
        });
      })
    );

    let activities = JSON.parse(params.activities);
    activities = await Promise.all(
      activities.map((e) => {
        return models.Activity.create({
          ...e,
          scholarshipId: id,
        });
      })
    );

    scholarship = scholarship.toJSON();
    scholarship.siblings = siblings;
    scholarship.activities = activities;
    scholarship.name = scholarship.firstname + " " + scholarship.lastname;

    if (req.body.status === "pending") {
      let pdf = await createPDF(scholarship, fields, "Scholarship Application");
      await sendMail(
        `Successfully submitted Scholarship Application. This is your tracking number. ${id}`,
        "Liberty Hospital",
        req.body.email,
        [
          {
            filename: "scholarship.pdf", // <= Here: made sure file name match
            path: pdf.filename, // <= Here
            contentType: "application/pdf",
          },
        ]
      );
      res.status(200).send(scholarship);
    } else res.status(200).send(scholarship);
  } catch (ex) {
    res.status(500).send({
      error: ex.stack,
    });
  }
};

exports.get = async (req, res) => {
  try {
    let siblings = await models.Sibling.findAll({
      where: {
        scholarshipId: req.params.id,
      },
    });
    let activities = await models.Activity.findAll({
      where: {
        scholarshipId: req.params.id,
      },
    });
    let scholarship = await models.Scholarship.findAll({
      where: {
        id: req.params.id,
      },
    });
    scholarship = scholarship[0].toJSON();
    scholarship.siblings = siblings;
    scholarship.activities = activities;
    res.status(200).send(scholarship);
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
    if (files) {
      params = await uploadFiles(req.params.id, files, params);
    }

    let existing = await models.Scholarship.findAll({
      where: {
        id,
      },
    });
    existing = existing[0];

    let scholarship = await models.Scholarship.update(params, {
      where: {
        id: req.params.id,
      },
    });

    await models.Sibling.destroy({
      where: {
        scholarshipId: id,
      },
    });

    await models.Activity.destroy({
      where: {
        scholarshipId: id,
      },
    });

    let siblings = JSON.parse(params.siblings);
    siblings = await Promise.all(
      siblings.map((e) => {
        return models.Sibling.create({
          ...e,
          scholarshipId: id,
        });
      })
    );

    let activities = JSON.parse(params.activities);
    activities = await Promise.all(
      activities.map((e) => {
        return models.Activity.create({
          ...e,
          scholarshipId: id,
        });
      })
    );

    if (existing && existing.status == "draft" && params.status == "pending") {
      params.name = params.firstname + " " + params.lastname;
      let pdf = await createPDF(params, fields, "Scholarship Application");
      await sendMail(
        `Successfully submitted Scholarship Application. This is your tracking number. ${id}`,
        "Liberty Hospital",
        req.body.email,
        [
          {
            filename: "scholarship.pdf", // <= Here: made sure file name match
            path: pdf.filename, // <= Here
            contentType: "application/pdf",
          },
        ]
      );
    }

    res.status(200).send(scholarship);
  } catch (ex) {
    res.status(500).send({
      error: ex.stack,
    });
  }
};

exports.list = async (req, res) => {
  try {
    let scholarships = await models.Scholarship.findAll();
    res.status(200).send(scholarships);
  } catch (ex) {
    res.status(500).send({
      error: ex.stack,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    let scholarship = await models.Scholarship.findAll({
      where: {
        id: req.params.id,
      },
    });
    if (scholarship.length) {
      await models.Sibling.destroy({
        where: {
          scholarshipId: req.params.id,
        },
      });
      await models.Activity.destroy({
        where: {
          scholarshipId: req.params.id,
        },
      });
      await models.Scholarship.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send(204).send({
        msg: "Scholarship deleted successfully",
      });
    } else {
      res.send(404).send({
        msg: "Scholarship doesn't exist",
      });
    }
    res.status(200).send(scholarship);
  } catch (ex) {
    res.status(500).send({
      error: ex.stack,
    });
  }
};

exports.download = async (req, res) => {
  let scholarships = await models.Scholarship.findAll();

  let rows = [];
  scholarships = scholarships.map((e) => {
    rows.push([
      `${e.firstname} ${e.lastname}`,
      e.id,
      e.status || "NA",
      e.score || "NA",
      e.comments || "NA",
    ]);
  });

  const file = await download(tablefields, rows);

  res.download(file, "scholarship_list.xslx");
};
