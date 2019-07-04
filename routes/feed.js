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

router.get("/post/:postId", feedController.getPost);

router.put(
  "/post/:postId",
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
  feedController.updatePost
);

module.exports = router;
