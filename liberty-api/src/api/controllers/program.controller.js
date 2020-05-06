const models = require("../models");
const { download } = require("../helpers/excel");
const {
  patientFields,
  giftFields,
  familyFields
} = require("../helpers/program-fields");

exports.get = async (req, res) => {
  try {
    const type = req.params.type;
    let program;
    switch (type) {
      case "patient":
        program = await patientGet(req, res, type);
        break;
      case "gift":
        program = await giftGet(req, res, type);
        break;
      case "family":
        program = await familyGet(req, res, type);
        break;

      default:
        break;
    }
    res.status(200).send(program);
  } catch (ex) {
    res.status(500).send({
      error: ex.stack
    });
  }
};

exports.list = async (req, res) => {
  try {
    // await models.Program.destroy({
    //   where: {},
    //   truncate: true
    // });
    let programs = await models.Program.findAll();
    res.status(200).send(programs);
  } catch (ex) {
    res.status(500).send({
      error: ex.stack
    });
  }
};

exports.update = async (req, res) => {
  try {
    const type = req.params.type;
    let program;
    switch (type) {
      case "patient":
        program = await patientUpdate(req, res, type);
        break;
      case "gift":
        program = await giftUpdate(req, res, type);
        break;
      case "family":
        program = await familyUpdate(req, res, type);
        break;

      default:
        break;
    }
    res.status(200).send(program);
  } catch (ex) {
    res.status(500).send({
      error: ex.stack
    });
  }
};

exports.create = async (req, res) => {
  try {
    const type = req.params.type;
    let program;
    switch (type) {
      case "patient":
        program = await patientCreate(req, res, type);
        break;
      case "gift":
        program = await giftCreate(req, res, type);
        break;
      case "family":
        program = await familyCreate(req, res, type);
        break;

      default:
        break;
    }
    res.status(200).send(program);
  } catch (ex) {
    res.status(500).send({
      error: ex.stack
    });
  }
};

exports.download = async (req, res) => {
  let type = req.params.type;
  switch (type) {
    case "patient":
      await patientDownload(req, res);
      break;
    case "gift":
      await giftDownload(req, res);
      break;
    case "family":
      await familyDownload(req, res);
      break;

    default:
      break;
  }
};

async function patientGet(req, res) {
  return new Promise(async (resolve, reject) => {
    try {
      let program = await models.Patient.findAll({
        where: {
          month: req.query.month
        }
      });
      if (program.length) {
        program = program[0].toJSON();
        let services = await models.PatientService.findAll({
          where: {
            patientId: program.id
          }
        });
        program.services = services;
        resolve(program);
      } else {
        resolve({});
      }
    } catch (ex) {
      reject(ex);
    }
  });
}

async function patientUpdate(req, res) {
  return new Promise(async (resolve, reject) => {
    try {
      let patient = await models.Patient.update(req.body, {
        where: {
          id: req.body.id
        }
      });
      await Promise.all(
        req.body.services.map(e => {
          return models.PatientService.update(e, {
            where: {
              id: e.id
            }
          });
        })
      );
      resolve(patient);
    } catch (ex) {
      res.status(500).send({
        error: ex.stack
      });
    }
  });
}

async function patientCreate(req, res) {
  return new Promise(async (resolve, reject) => {
    try {
      let patient = await models.Patient.create(req.body);
      await Promise.all(
        req.body.services.map(e => {
          e = {
            ...e,
            patientId: patient.id
          };
          return models.PatientService.create(e);
        })
      );
      resolve(patient);
    } catch (ex) {
      reject(ex);
    }
  });
}

async function patientDownload(req, res) {
  let typeModel = "Patient";
  let itemModel = "PatientService";
  let idName = "patientId";
  let main = await models[typeModel].findAll({
    where: {
      month: req.query.month
    }
  });
  if (main.length) {
    main = main[0].toJSON();
    let items = await models[itemModel].findAll({
      where: {
        [idName]: main.id
      }
    });
    main.items = items;
  }

  let rows = [];
  main.items.map(e => {
    rows.push([e.service, e.no_served, e.funding_used, e.notes]);
  });

  rows.push("", "", "");
  rows.push([
    "Total # of unduplicated patients served ",
    main.no_of_unduplicated
  ]);
  rows.push(["Additional Services Provided ", main.additional_services]);
  rows.push([
    "Please briefly share a patient story of a patient served by this program",
    main.story_patient
  ]);
  rows.push([
    "Can this patient be contacted to further share their story?",
    main.patient_contact
  ]);

  const file = await download(patientFields, rows);

  res.download(file, "program.xslx");
}

async function giftGet(req, res) {
  return new Promise(async (resolve, reject) => {
    try {
      let program = await models.Gift.findAll({
        where: {
          month: req.query.month
        }
      });
      if (program.length) {
        program = program[0].toJSON();
        let services = await models.GiftService.findAll({
          where: {
            giftId: program.id
          }
        });
        program.services = services;
        resolve(program);
      } else {
        resolve({});
      }
    } catch (ex) {
      reject(ex);
    }
  });
}

async function giftUpdate(req, res) {
  return new Promise(async (resolve, reject) => {
    let gift = await models.Gift.update(req.body, {
      where: { id: req.body.id }
    });
    await Promise.all(
      req.body.services.map(e => {
        return models.GiftService.update(e, {
          where: {
            id: e.id
          }
        });
      })
    );
    resolve(gift);
  });
}

async function giftCreate(req, res) {
  return new Promise(async (resolve, reject) => {
    try {
      let gift = await models.Gift.create(req.body);
      await Promise.all(
        req.body.services.map(e => {
          e = {
            ...e,
            giftId: gift.id
          };
          return models.GiftService.create(e);
        })
      );
      resolve(gift);
    } catch (ex) {
      reject(ex);
    }
  });
}

async function giftDownload(req, res) {
  let typeModel = "Gift";
  let itemModel = "GiftService";
  let idName = "giftId";
  let main = await models[typeModel].findAll({
    where: {
      month: req.query.month
    }
  });
  if (main.length) {
    main = main[0].toJSON();
    let items = await models[itemModel].findAll({
      where: {
        [idName]: main.id
      }
    });
    main.items = items;
  }

  let rows = [];
  main.items.map(e => {
    rows.push([e.service, e.no_served, e.funding_used, e.notes]);
  });

  rows.push("", "", "");
  rows.push([
    "Total # of unduplicated patients served ",
    main.no_of_unduplicated
  ]);
  rows.push([
    "Please briefly share a patient story of a patient served by this program",
    main.story_patient
  ]);
  rows.push([
    "Can this patient be contacted to further share their story?",
    main.patient_contact
  ]);

  const file = await download(giftFields, rows);

  res.download(file, "program.xslx");
}

async function familyGet(req, res) {
  // await models.FamilyCrisis.destroy({
  //   where: {},
  //   truncate: true
  // });
  // await models.Family.destroy({
  //   where: {}
  // });
  return new Promise(async (resolve, reject) => {
    try {
      let program = await models.Family.findAll({
        where: {
          month: req.query.month
        }
      });
      if (program.length) {
        program = program[0].toJSON();
        let crisis = await models.FamilyCrisis.findAll({
          where: {
            familyId: program.id
          }
        });
        program.crisis = crisis;
        resolve(program);
      } else resolve({});
    } catch (ex) {
      reject(ex);
    }
  });
}

async function familyUpdate(req, res) {
  return new Promise(async (resolve, reject) => {
    try {
      let family = await models.Family.update(req.body, {
        where: {
          id: req.body.id
        }
      });
      await Promise.all(
        req.body.crisis.map(e => {
          return models.FamilyCrisis.update(e, {
            where: {
              id: e.id
            }
          });
        })
      );
      resolve(family);
    } catch (ex) {
      reject(ex);
    }
  });
}

async function familyCreate(req, res) {
  return new Promise(async (resolve, reject) => {
    try {
      let family = await models.Family.create(req.body);
      await Promise.all(
        req.body.crisis.map(e => {
          e = {
            ...e,
            familyId: family.id
          };
          return models.FamilyCrisis.create(e);
        })
      );
      resolve(family);
    } catch (ex) {
      reject(ex);
    }
  });
}

async function familyDownload(req, res) {
  let typeModel = "Family";
  let itemModel = "FamilyCrisis";
  let idName = "familyId";
  let main = await models[typeModel].findAll({
    where: {
      month: req.query.month
    }
  });
  if (main.length) {
    main = main[0].toJSON();
    let items = await models[itemModel].findAll({
      where: {
        [idName]: main.id
      }
    });
    main.items = items;
  }

  let rows = [];
  main.items.map(e => {
    rows.push([e.name, e.no_served, e.assistance, e.funding_used, e.notes]);
  });

  rows.push("", "", "");
  rows.push([
    "Total # of unduplicated patients served ",
    main.no_of_unduplicated
  ]);
  rows.push(["Additional Services Provided ", main.additional_services]);
  rows.push([
    "Please briefly share a patient story of a patient served by this program",
    main.story_patient
  ]);
  rows.push([
    "Can this patient be contacted to further share their story?",
    main.patient_contact
  ]);

  const file = await download(familyFields, rows);

  res.download(file, "program.xslx");
}
