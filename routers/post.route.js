const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.post("/create", blogController.create);
router.get("/list", blogController.list);

module.exports = router;
