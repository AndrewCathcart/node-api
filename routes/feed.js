const express = require("express");
const expressValidator = require("express-validator");

const feedController = require("../controllers/feed");

const router = express.Router();

// GET /feed/posts
router.get("/posts", feedController.getPosts);

// POST /feed/post
router.post(
  "/post",
  [
    expressValidator
      .body("title")
      .trim()
      .isLength({ min: 5 }),
    expressValidator
      .body("content")
      .trim()
      .isLength({ min: 5 })
  ],
  feedController.createPost
);

module.exports = router;
