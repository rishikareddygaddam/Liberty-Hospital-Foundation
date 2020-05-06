// const user = require("../models/users.model");
const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendMail } = require("../helpers/mail");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.signup = async (req, res) => {
  try {
    let { name, email, password, type, phone } = req.body;
    let user = await models.User.findAll({
      where: {
        email,
      },
    });
    if (user.length == 0) {
      password = bcrypt.hashSync(password, 10);
      models.User.create({
        name,
        email,
        password,
        type,
        phone,
      })
        .then((user) => {
          const token = jwt.sign(
            { id: user.id, type: user.type },
            "config.secret"
          );
          user = user.toJSON();
          delete user.password;
          res.status(200).send({
            user,
            token,
          });
        })
        .catch((err) => {
          res.status(500).send({
            success: false,
            msg: err,
          });
        });
    } else {
      res.status(422).send({
        msg: "User already exists",
      });
    }
  } catch (ex) {
    res.status(500).send({
      error: ex.stack,
    });
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await models.User.findAll({
      where: {
        email,
      },
    });
    if (user.length == 0) {
      res.status(422).send({
        msg: "Email doesn't exist",
      });
    } else {
      user = user[0];
      if (user && bcrypt.compareSync(password, user.password)) {
        user = user.toJSON();
        delete user.password;
        const token = jwt.sign(
          { id: user.id, type: user.type },
          "config.secret"
        );
        res.status(200).send({
          user,
          token,
        });
      } else {
        res.status(401).send({
          error: "Email or Password wrong.",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      error: error.stack,
    });
  }
};

exports.forgot = async (req, res) => {
  try {
    if (req.body.email === "") {
      res.status(422).send("email required");
    }
    const user = await models.User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user === null) {
      console.error("email not in database");
      res.status(403).send("email not in db");
    } else {
      const token = crypto.randomBytes(20).toString("hex");
      user.update({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000,
      });

      await sendMail(
        "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
          `http://localhost:3000/reset/${token}\n\n` +
          "If you did not request this, please ignore this email and your password will remain unchanged.\n",
        "Link To Reset Password",
        req.body.email,
        []
      );
      res.status(200).send("success");
    }
  } catch (error) {
    res.status(500).send({
      error: error.stack,
    });
  }
};

exports.isValid = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: {
        resetPasswordToken: req.query.token,
        resetPasswordExpires: {
          [Op.gt]: Date.now(),
        },
      },
    });
    if (user == null) {
      console.error("password reset link is invalid or has expired");
      res.status(403).send("password reset link is invalid or has expired");
    } else {
      res.status(200).send({
        username: user.name,
        message: "password reset link a-ok",
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.stack,
    });
  }
};

exports.reset = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: {
        resetPasswordToken: req.body.token,
        resetPasswordExpires: {
          [Op.gt]: Date.now(),
        },
      },
    });
    if (user == null) {
      console.error("password reset link is invalid or has expired");
      res.status(403).send("password reset link is invalid or has expired");
    } else if (user != null) {
      console.log("user exists in db");
      const hashPswd = bcrypt.hashSync(req.body.password, 10);
      user
        .update({
          password: hashPswd,
          resetPasswordToken: null,
          resetPasswordExpires: null,
        })
        .then(() => {
          console.log("password updated");
          res.status(200).send({ message: "password updated" });
        });
    } else {
      console.error("no user exists in db to update");
      res.status(401).json("no user exists in db to update");
    }
  } catch (error) {
    res.status(500).send({
      error: error.stack,
    });
  }
};

exports.getUnapprovedUsers = async (req, res) => {
  try {
    if (req.user.type === "admin") {
      let users = await models.User.findAll({
        where: {
          type: "employee",
          is_approved: null,
        },
      });
      res.status(200).send(users);
    } else res.status(200).send([]);
  } catch (ex) {
    res.status(500).send({
      error: ex.stack,
    });
  }
};

exports.approvalAction = async (req, res) => {
  try {
    if (req.user.type === "admin") {
      let { id, action } = req.body;
      if (action === "approved") {
        await models.User.update(
          {
            is_approved: true,
          },
          {
            where: {
              id,
            },
          }
        );
        res.status(200).send({ message: "Successfully Approved." });
      } else if (action === "rejected") {
        await models.User.destroy({
          where: {
            id,
          },
        });
        res.status(200).send({ message: "Successfully Rejected." });
      }
    } else res.status(403).send("No Access");
  } catch (ex) {
    res.status(500).send({
      error: ex.stack,
    });
  }
};
