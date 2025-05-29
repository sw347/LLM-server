const fs = require("fs");
const { execFile } = require("child_process");

exports.executeWhisper = (filePath) => {
  return new Promise((resolve, reject) => {
    execFile(
      "python",
      ["whisper_stt.py", filePath],
      { encoding: "utf8" },
      (error, stdout, stderr) => {
        setTimeout(() => {
          try {
            fs.unlinkSync(filePath);
            fs.unlinkSync(filePath + ".wav");
          } catch (err) {
            console.warn("파일 삭제 실패:", err.message);
          }
        }, 500);

        if (error) {
          return reject(error);
        }

        resolve(stdout.trim());
      }
    );
  });
};
