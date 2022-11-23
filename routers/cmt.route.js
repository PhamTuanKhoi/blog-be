const express = require("express");
// const commentController = require("../controllers/commentController");
const commentController = require("../controllers/commentController");
const router = express.Router();

router.post("/create", commentController.create);

module.exports = router;
