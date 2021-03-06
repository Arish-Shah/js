const express = require("express");
const { body } = require("express-validator");

const { signup, login } = require("../controllers/auth");

const User = require("../models/user");

const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) return Promise.reject("E-mail address already exists");
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().notEmpty()
  ],
  signup
);

router.post("/login", login);

module.exports = router;
