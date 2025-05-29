const express = require("express");
const multer = require("multer");
const { handleSTT } = require("../controllers/sttController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    const safeName = `${Date.now()}-${file.originalname.replace(
      /[^a-zA-Z0-9.-]/g,
      ""
    )}`;
    cb(null, safeName);
  },
});

const upload = multer({ storage: storage });

router.post("/stt", upload.single("audio"), handleSTT);

module.exports = router;
