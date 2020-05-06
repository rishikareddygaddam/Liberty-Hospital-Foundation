const express = require("express");
const {
  create,
  get,
  update,
  list,
  // delete: deleteGrant,
  download
} = require("../../controllers/program.controller");

const router = express.Router();

router.route("/:type").get(get);
router.route("/:type/download").get(download);
router.route("/:type").put(update);
router.route("/:type").post(create);
router.route("/").get(list);
// router.route("/").post(create);
// router.route("/:id").get(get);
// router.route("/:id").put(update);
// router.route("/:id").delete(deleteGrant);

module.exports = router;
