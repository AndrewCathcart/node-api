const User = require("../models/user");
const JWT_SECRET = require("../api-keys/api-keys").JWT_SECRET;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const expressValidator = require("express-validator");

exports.signup = (req, res, next) => {
  const errors = expressValidator.validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({ message: "User created!", userId: result._id });
    })
    .catch(err => {
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const err = new Error("No account with this email exists.");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error("Incorrect password.");
        error.statusCode = 401;
        throw error;
      }
      // Credentials are valid, generate a JSON Web Token
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res
        .status(200)
        .json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch(err => next(err));
};
