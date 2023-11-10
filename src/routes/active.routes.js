const express = require("express");
const isauth = require("../middlewares/is-auth");
const isStudent = require("../middlewares/is-student");
const multerService = require("../utils/compress.multer.service");
const upload = multerService("compressed");
const activeController = require("../controllers/activities.controller");

const router = express.Router();

router.post(
  "/active/:activeid",
  isauth,
  isStudent,
  upload.single("filecompress"),
  activeController.userAddActive
);
router.get("/:actid", isauth, isStudent, activeController.showActiveData);

module.exports = router;
