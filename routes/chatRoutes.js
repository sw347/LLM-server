const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("LLM WebSocket 서버 실행중");
});

module.exports = router;
