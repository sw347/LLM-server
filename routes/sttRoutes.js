const express = require("express");
const multer = require("multer");
const path = require("path");
const { handleSTT } = require("../controllers/sttController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

router.post("/stt", upload.single("audio"), handleSTT);

module.exports = router;
