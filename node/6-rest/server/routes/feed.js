const express = require("express");
const { body } = require("express-validator");

const isAuth = require("../middlewares/is-auth");

const {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost
} = require("../controllers/feed");

const router = express.Router();

router.get("/posts", isAuth, getPosts);

router.post(
  "/post",
  body("title").trim().isLength({ min: 5 }),
  body("content").trim().isLength({ min: 5 }),
  isAuth,
  createPost
);

router.get("/post/:id", getPost);

router.put(
  "/post/:id",
  body("title").trim().isLength({ min: 5 }),
  body("content").trim().isLength({ min: 5 }),
  isAuth,
  updatePost
);

router.delete("/post/:id", isAuth, deletePost);

module.exports = router;
