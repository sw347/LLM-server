const { executeWhisper } = require("../utils/whisperExecutor");

exports.handleSTT = (req, res) => {
  const audioFile = req.file.path;
  const fixedPath = audioFile.replace(/\\/g, "/");

  if (!req.file) {
    return res.status(400).json({ error: "오디오 파일을 받지 못했습니다." });
  }

  executeWhisper(fixedPath)
    .then((text) => {
      res.json({ text: encodeURI(text) });
    })
    .catch((error) => {
      console.error(`Python 실행 중 에러: ${error}`);
      res.status(500).json({ error: "내부 서버 오류" });
    });
};
