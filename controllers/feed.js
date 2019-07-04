const expressValidator = require("express-validator");

const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "1",
        title: "First Post",
        content: "This is the first post!",
        imageUrl: "images/node-meme.jpg",
        creator: {
          name: "Andy"
        },
        createdAt: new Date()
      }
    ]
  });
};

exports.createPost = (req, res, next) => {
  const errors = expressValidator.validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(
      "Validation failed, data that was entered is incorrect"
    );
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: "images/node-meme.jpg",
    creator: {
      name: "Andy"
    }
  });
  post
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Post created successfully!",
        post: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
