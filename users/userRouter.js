const express = require("express");
const logger = require("../middleware/logger");
const userDb = require("./userDb");
const postDb = require("../posts/postDb");

const router = express.Router();

router.post("/", logger(), validateUser(), (req, res) => {
  // do your magic!
  // res.status(200).json({ message: "User Info Valid" });
  userDb.insert(req.body).then((user) => {
    res.status(201).json(user);
  });
});

router.post(
  "/:id/posts",
  logger(),
  validateUserId(),
  validatePost(),
  (req, res) => {
    // do your magic!

    postDb
      .insert({ ...req.body, user_id: req.params.id })
      .then((post) => {
        res.status(200).json({ postCreated: post });
      })
      .catch((err) => {
        console.log(err.stack);
        res.status(500).json({ message: "Error posting comment" });
      });
  }
);

router.get("/", logger(), (req, res) => {
  // do your magic!
  userDb.get().then((users) => {
    res.status(200).json(users);
  });
});

router.get("/:id", logger(), validateUserId(), (req, res) => {
  // // do your magic!
  // res.status(200).json(req.user);
  userDb
    .getById(req.params.id)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => res.status(400).json({ message: "error" }));
});

router.get("/:id/posts", logger(), validateUserId(), (req, res) => {
  // do your magic!
  userDb
    .getUserPosts(req.params.id)
    .then((posts) => {
      res.status(201).json(posts);
    })
    .catch((error) => res.status(400).json({ message: "error" }));
});

router.delete("/:id", logger(), validateUserId(), (req, res) => {
  // do your magic!
  userDb
    .remove(req.params.id)
    .then((user) => {
      res.status(201).json({ message: "User Deleted" });
    })
    .catch((error) => res.status(400).json({ message: "error" }));
});

router.put("/:id", logger(), validateUserId(), (req, res) => {
  // do your magic!
  userDb
    .update(req.params.id, req.body)
    .then((response) => {
      res.status(200).json({ message: `User Updated ${response}` });
    })
    .catch((error) => next());
});

//custom middleware

function validateUserId() {
  // do your magic!
  return (req, res, next) => {
    userDb.getById(req.params.id).then((user) => {
      if (user) {
        req.user = user;

        next();
      } else {
        res.status(400).json({
          message: "invalid user id",
        });
      }
    });
  };
}

function validateUser() {
  // do your magic!
  return (req, res, next) => {
    if (!req.body.name) {
      return res.status(400).json({ message: "missing required name field" });
    } else if (!req.body) {
      return res.status(400).json({ message: "missing user data" });
    } else {
      next();
    }
  };
}

function validatePost() {
  // do your magic!
  return (req, res, next) => {
    if (!req.body.text) {
      return res.status(400).json({ message: "missing required text field" });
    } else if (!req.body) {
      return res.status(400).json({ message: "missing post data" });
    } else {
      next();
    }
  };
}

module.exports = router;
