const express = require("express");
const expressValidator = require("express-validator");

const User = require("../models/user");
const authController = require("../controllers/auth");

const router = express.Router();

router.put(
  "/signup",
  [
    expressValidator
      .body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject("Email already exists.");
          }
        });
      })
      .normalizeEmail(),
    expressValidator
      .body("password")
      .trim()
      .isLength({ min: 5 }),
    expressValidator
      .body("name")
      .trim()
      .not()
      .isEmpty()
  ],
  authController.signup
);

module.exports = router;
