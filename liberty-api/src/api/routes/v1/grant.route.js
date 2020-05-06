const express = require("express");
const {
  create,
  get,
  update,
  list,
  delete: deleteGrant,
  download
} = require("../../controllers/grant.controller");

const router = express.Router();

router.route("/").get(list);
router.route("/").post(create);
router.route("/download").get(download);
router.route("/:id").get(get);
router.route("/:id").put(update);
router.route("/:id").delete(deleteGrant);

module.exports = router;
