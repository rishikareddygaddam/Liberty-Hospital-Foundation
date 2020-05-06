const express = require("express");
const {
  signup,
  login,
  forgot,
  reset,
  isValid,
  getUnapprovedUsers,
  approvalAction,
} = require("../../controllers/auth.controller");
const { isAuthorized } = require("../../middleware/auth");

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/forgot").post(forgot);
router.route("/validReset").get(isValid);
router.route("/reset").post(reset);
router.get("/unapproved", isAuthorized(), getUnapprovedUsers);
router.post("/approval", isAuthorized(), approvalAction);

module.exports = router;
