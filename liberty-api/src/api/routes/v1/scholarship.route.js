const express = require("express");
const {
  create,
  get,
  update,
  list,
  delete: deleteScholarship,
  download,
  createPDF
} = require("../../controllers/scholarship.controller");

const router = express.Router();

router.route("/").get(list);
// router.route("/pdf").get(createPDF);
router.route("/").post(create);
router.route("/download").get(download);
router.route("/:id").get(get);
router.route("/:id").put(update);
router.route("/:id").delete(deleteScholarship);

module.exports = router;
