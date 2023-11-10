const express = require("express");
const videoController = require("../controllers/video.controller");
const isauth = require("../middlewares/is-auth");

// const multerVideo = require('../utils/video.multer.service');
// const upload = multerVideo("videos");
const router = express.Router();

router.get("/show/:vid", videoController.GetVideo);

router.get("/details/:vid", isauth, videoController.getvideobyid);

module.exports = router;
